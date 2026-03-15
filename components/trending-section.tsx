"use client";
import { useEffect, useRef } from "react";
import { useSoundEffect } from "@/lib/sounds";
import { ArrowRight, Star, Crown } from "lucide-react";
import Link from "next/link";

// Fallback poster (preview_url = toujours un .jpg)
function getPoster(clip: any) {
    return clip.preview_url?.replace('http:', 'https:');
}

// --- FEATURED CARD (#1, autoplay comme featured-animators) ---
function FeaturedCard({ clip }: { clip: any }) {
    const { playClick } = useSoundEffect();
    const containerRef = useRef<HTMLDivElement>(null);
    const isVideo = clip.file_url?.match(/\.(mp4|webm|mov)$/);
    const secureFileUrl = clip.file_url?.replace('http:', 'https:');

    const title = clip.tags?.split(' ').slice(0, 3).join(' ') || "Animation Clip";
    const artist = clip.tags?.split(' ').find((t: string) => t.includes('animator')) || "Unknown Artist";

    return (
        <Link href={`/clips/${clip.id}`} className="block">
            <div
                ref={containerRef}
                className="group relative bg-white border border-gray-100 rounded-3xl p-3 shadow-sm hover:shadow-2xl transition-all duration-300"
                onClick={() => playClick()}
            >
                {/* Badge #1 */}
                <div className="absolute top-6 left-6 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400 text-white text-xs font-bold shadow-lg">
                    <Crown className="w-3.5 h-3.5" />
                    #1 This Week
                </div>

                <div className="aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden relative bg-[#ede9fe]">
                    {/* Arrow hover */}
                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-white/50 shadow-lg">
                            <ArrowRight className="w-6 h-6 text-white" />
                        </div>
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />

                    {isVideo ? (
                        <video
                            src={secureFileUrl}
                            poster={getPoster(clip)}
                            // @ts-expect-error: referrerPolicy non standard
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover z-[1]"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    ) : (
                        <img
                            src={clip.sample_url || clip.file_url}
                            alt={title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    )}

                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 z-20 p-4 md:p-6">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <h3 className="font-bold text-white text-lg md:text-2xl leading-tight capitalize line-clamp-1 drop-shadow-lg">
                                    {title}
                                </h3>
                                <p className="text-white/70 text-sm mt-1 capitalize">
                                    {artist.replace(/_/g, ' ')}
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm font-bold text-white bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 shrink-0">
                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                {clip.score || 0}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

// --- SMALL CARD (#2-6, même pattern que le hero marquee) ---
const previewColors = ["bg-[#fce7f3]", "bg-[#ede9fe]", "bg-[#fce7f3]", "bg-[#ede9fe]", "bg-[#fce7f3]"];

function SmallCard({ clip, rank }: { clip: any; rank: number }) {
    const { playClick } = useSoundEffect();
    const isVideo = clip.file_url?.match(/\.(mp4|webm|mov)$/);
    const secureFileUrl = clip.file_url?.replace('http:', 'https:');
    const bg = previewColors[(rank - 2) % previewColors.length];

    const title = clip.tags?.split(' ').slice(0, 3).join(' ') || "Animation Clip";
    const artist = clip.tags?.split(' ').find((t: string) => t.includes('animator')) || "Unknown Artist";

    return (
        <Link href={`/clips/${clip.id}`} className="block h-full">
            <div
                className="group relative h-full bg-white border border-gray-100 rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
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
                {/* Rank badge */}
                <div className="absolute top-5 left-5 z-30">
                    <span className="text-xs font-bold text-gray-400 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gray-100 shadow-sm">
                        #{rank}
                    </span>
                </div>

                <div className={`aspect-video rounded-2xl overflow-hidden relative shrink-0 ${bg}`}>
                    <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-white/50 shadow-lg">
                            <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    {isVideo ? (
                        <video
                            src={secureFileUrl}
                            poster={getPoster(clip)}
                            // @ts-expect-error: referrerPolicy non standard
                            referrerPolicy="no-referrer"
                            className="absolute inset-0 w-full h-full object-cover z-[1]"
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        />
                    ) : (
                        <img
                            src={clip.sample_url || clip.file_url}
                            alt={title}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                    )}
                </div>

                <div className="px-2 py-3 flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0 flex-1">
                            <h3 className="font-bold text-[#1a1a1a] text-base leading-tight truncate group-hover:text-[#c4b5fd] transition-colors capitalize">
                                {title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5 truncate capitalize">
                                {artist.replace(/_/g, ' ')}
                            </p>
                        </div>
                        {clip.score > 0 && (
                            <div className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-50 px-2 py-1 rounded-full border border-gray-100 shrink-0">
                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                {clip.score}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

// --- SECTION ---
interface TrendingSectionProps {
    clips: any[];
}

export function TrendingSection({ clips = [] }: TrendingSectionProps) {
    if (clips.length === 0) return null;

    const [featured, ...rest] = clips;

    return (
        <section id="trending" className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-[1500px] mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
                    <div>
                        <span className="text-[#c4b5fd] font-bold text-xs uppercase tracking-widest">
                            Trending Now
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#1a1a1a]">
                            This week&apos;s top clips
                        </h2>
                    </div>
                    <Link
                        href="/animations"
                        className="group flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 bg-gray-50 text-sm font-medium text-gray-600 hover:text-[#1a1a1a] hover:border-gray-300 hover:bg-white transition-all"
                    >
                        View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {/* Featured #1 */}
                <FeaturedCard clip={featured} />

                {/* Grid #2-6 */}
                {rest.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-5">
                        {rest.slice(0, 5).map((clip, i) => (
                            <SmallCard key={clip.id} clip={clip} rank={i + 2} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}