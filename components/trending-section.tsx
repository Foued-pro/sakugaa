"use client";
import { useEffect, useRef } from "react";
import { useSoundEffect } from "@/lib/sounds";
import { getPosterUrl, getImageUrl } from "@/lib/proxy";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const previewColors = ["bg-[#ede9fe]", "bg-[#fce7f3]", "bg-[#ede9fe]", "bg-[#fce7f3]", "bg-[#ede9fe]", "bg-[#fce7f3]"];

function TrendingCard({ clip, index }: { clip: any; index: number }) {
    const { playClick } = useSoundEffect();
    const cardRef = useRef<HTMLDivElement>(null);
    const isVideo = clip.file_url?.match(/\.(mp4|webm|mov)$/);
    const secureFileUrl = clip.file_url?.replace('http:', 'https:');
    const bg = previewColors[index % previewColors.length];

    const title = clip.tags?.split(' ').slice(0, 3).join(' ') || "Animation Clip";
    const artist = clip.tags?.split(' ').find((t: string) => t.includes('animator')) || "Unknown Artist";

    // Mobile : autoplay au scroll
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
                if (entry.isIntersecting) {
                    video.play().catch(() => {});
                } else {
                    video.pause();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(card);
        return () => observer.disconnect();
    }, []);

    return (
        <Link href={`/clips/${clip.id}`} className="block h-full">
            <div
                ref={cardRef}
                className="group h-full bg-white border border-gray-100 rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
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
                <div className={`aspect-video rounded-2xl overflow-hidden relative shrink-0 ${bg}`}>
                    {/* Score badge top left */}
                    {clip.score > 0 && (
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1 text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                            {clip.score}
                        </div>
                    )}

                    <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-white/50 shadow-lg">
                            <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    {isVideo ? (
                        <video
                            src={secureFileUrl}
                            poster={getPosterUrl(clip)}
                            className="absolute inset-0 w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />
                    ) : (
                        <img
                            src={getImageUrl(clip, false)}
                            alt={title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    )}
                </div>

                <div className="px-2 py-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-[#1a1a1a] text-lg line-clamp-1 group-hover:text-[#c4b5fd] transition-colors capitalize">
                                {title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1 capitalize">
                                {artist.replace(/_/g, ' ')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
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
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
                    <div>
                        <span className="text-[#c4b5fd] font-bold text-xs uppercase tracking-widest">Trending Now</span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#1a1a1a]">This week&apos;s top clips</h2>
                    </div>
                    <Link
                        href="/animations"
                        className="group flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-gray-600 hover:text-[#1a1a1a] hover:border-gray-300 hover:bg-white transition-all"
                    >
                        View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {clips.map((clip, i) => (
                        <TrendingCard key={clip.id} clip={clip} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}