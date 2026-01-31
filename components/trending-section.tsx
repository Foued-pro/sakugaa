"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { useSoundEffect } from "@/lib/sounds";
import { ScrollReveal } from "@/components/scroll-reveal";

interface TrendingSectionProps {
    clips: any[];
}

const previewColors = ["bg-[#ede9fe]", "bg-[#fce7f3]", "bg-[#ede9fe]", "bg-[#fce7f3]", "bg-[#ede9fe]", "bg-[#fce7f3]"];

const TrendingCard = ({ clip, index }: { clip: any, index: number }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const { playClick } = useSoundEffect();
    const isVideo = clip.file_url?.match(/\.(mp4|webm|mov)$/);
    const bg = previewColors[index % previewColors.length];

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isHovered) {
            video.play().catch(() => {});
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [isHovered]);
    useEffect(() => {
        const video = videoRef.current;
        return () => {
            if (video) {
                video.pause();
                video.removeAttribute('src');
                video.load();
            }
        };
    }, []);

    const title = clip.tags?.split(' ').slice(0, 3).join(' ') || "Animation Clip";
    const artist = clip.tags?.split(' ').find((t: string) => t.includes('animator')) || "Unknown Artist";
    const score = clip.score || 0;

    return (
        <Link href={`/clips/${clip.id}`} className="block h-full">
            <div
                className="group h-full bg-white border border-gray-100 rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => playClick()}
            >
                <div className={`aspect-video rounded-2xl overflow-hidden relative shrink-0 ${bg}`}>
                    <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-white/50 shadow-lg">
                            <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    {isVideo ? (
                        <video ref={videoRef} src={clip.file_url} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" muted loop playsInline preload="none"
                               poster={clip.preview_url} />
                    ) : (
                        <img src={clip.sample_url || clip.file_url} alt={title} className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
                    )}
                </div>

                <div className="px-2 py-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-[#1a1a1a] text-lg line-clamp-1 group-hover:text-[#c4b5fd] transition-colors capitalize">{title}</h3>
                            <p className="text-sm text-gray-500 mt-1 line-clamp-1 capitalize">{artist}</p>
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full whitespace-nowrap border border-gray-100">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400"/> {score}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export function TrendingSection({ clips = [] }: TrendingSectionProps) {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-[1500px] mx-auto px-6 md:px-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[#c4b5fd] font-bold text-xs uppercase tracking-widest">Trending Now</span>
                        <h2 className="text-4xl font-bold mt-2 text-[#1a1a1a]">This week&apos;s top clips</h2>
                    </div>
                    <Link href="/animations" className="group flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-gray-600 hover:text-[#1a1a1a] hover:border-gray-300 hover:bg-white transition-all">
                        View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {clips.map((clip, i) => (
                        <ScrollReveal key={clip.id} direction="up" delay={i * 0.1}>
                            <TrendingCard clip={clip} index={i} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}