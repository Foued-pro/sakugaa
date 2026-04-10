"use client";
import { useEffect, useRef } from "react";
import { useSoundEffect } from "@/lib/sounds";
import { getPosterUrl, proxyUrl } from "@/lib/proxy";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { extractAnimator } from '@/lib/artists';


const SKIP_TAGS = new Set(['animated', 'genga', 'production_materials', 'effects', 'debris', 'impact_frames', 'smears', 'rotation']);

function cleanTitle(tags: string): string {
    if (!tags) return "Animation Clip";
    const words = tags.split(' ').filter(t => !SKIP_TAGS.has(t)).slice(0, 4);
    return words.join(' ').replace(/_/g, ' ') || "Animation Clip";
}

function TrendingCard({ clip, index }: { clip: any; index: number }) {
    const { playClick } = useSoundEffect();
    const animator = extractAnimator(clip.tags);

    const cardRef = useRef<HTMLDivElement>(null);
    const isVideo = clip.file_url?.match(/\.(mp4|webm|mov)$/);
    const secureFileUrl = proxyUrl(clip.file_url);
    const title = cleanTitle(clip.tags);
    const artist = clip.author || "Unknown";

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;
        const isTouchDevice = window.matchMedia('(hover: none)').matches;
        if (!isTouchDevice) return;
        const video = card.querySelector('video');
        if (!video) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;
                if (entry.isIntersecting) video.play().catch(() => {});
                else video.pause();
            },
            { threshold: 0.5 }
        );
        observer.observe(card);
        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
            <Link href={`/clips/${clip.id}`} className="block h-full">
                <div
                    ref={cardRef}
                    className="group h-full bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col"
                    onClick={() => playClick()}
                    onMouseEnter={(e) => {
                        const video = e.currentTarget.querySelector('video');
                        if (video) video.play().catch(() => {});
                    }}
                    onMouseLeave={(e) => {
                        const video = e.currentTarget.querySelector('video');
                        if (video) { video.pause(); video.currentTime = 0; }
                    }}
                >
                    {/* Thumbnail */}
                    <div className="aspect-video overflow-hidden relative shrink-0 bg-gray-100">
                        {clip.score > 0 && (
                            <div className="absolute top-3 left-3 z-20 flex items-center gap-1 text-xs font-bold text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                {clip.score}
                            </div>
                        )}
                        <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                                <ArrowRight className="w-4 h-4 text-[#1a1a1a]" />
                            </div>
                        </div>
                        {isVideo ? (
                            <video
                                src={secureFileUrl}
                                poster={getPosterUrl(clip)}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                muted playsInline preload="none"
                            />
                        ) : (
                            <img
                                src={proxyUrl(clip.sample_url || clip.file_url)}
                                alt={title}
                                loading="lazy"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        )}
                    </div>

                    {/* Info */}
                    <div className="px-4 py-4 flex flex-col flex-1">
                        <h3 className="font-semibold text-[#1a1a1a] text-base leading-tight line-clamp-1 group-hover:text-[#c4b5fd] transition-colors capitalize">
                            {title}
                        </h3>
                        <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-gray-400 capitalize font-medium">
                                {animator || 'Unknown'}
                            </p>
                            {clip.file_ext && (
                                <span className="text-[10px] font-mono text-gray-300 uppercase">
                                    {clip.file_ext}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

interface TrendingSectionProps {
    clips: any[];
}

export function TrendingSection({ clips = [] }: TrendingSectionProps) {
    if (clips.length === 0) return null;

    return (
        <section id="trending" className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-[1500px] mx-auto px-6 md:px-12">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4b5fd]">
                            Trending Now
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[#1a1a1a] leading-tight tracking-tight">
                            This week's
                            <br />
                            <span className="font-serif italic font-medium text-gray-300">top clips.</span>
                        </h2>
                    </div>
                    <Link
                        href="/animations"
                        className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#1a1a1a] transition-colors"
                    >
                        View all
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {clips.map((clip, i) => (
                        <TrendingCard key={clip.id} clip={clip} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}