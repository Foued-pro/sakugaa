"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Star, Sparkles } from "lucide-react";
import { getPosterUrl, proxyUrl } from "@/lib/proxy";

export const runtime = 'edge';

// Map slug → display info (extensible)
const KNOWN_ARTISTS: Record<string, { name: string; tag: string; style: string }> = {
    "yutaka-nakamura": { name: "Yutaka Nakamura", tag: "yutaka_nakamura", style: "Impact Frames, Cubes" },
    "hiroyuki-imaishi": { name: "Hiroyuki Imaishi", tag: "hiroyuki_imaishi", style: "Dynamic, Drill" },
    "megumi-ishitani": { name: "Megumi Ishitani", tag: "megumi_ishitani", style: "Composition, Lighting" },
    "arifumi-imai": { name: "Arifumi Imai", tag: "arifumi_imai", style: "3D Camera, Acrobatic" },
};

export default function ArtistDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const [clips, setClips] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const slug = (Array.isArray(id) ? id[0] : id) ?? '';
    const known = slug ? KNOWN_ARTISTS[slug] : undefined;
    // If not known, derive name from slug
    const artistName = known?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const artistTag = known?.tag || slug.replace(/-/g, '_');
    const artistStyle = known?.style || '';

    useEffect(() => {
        if (!slug) return;

        async function loadClips() {
            try {
                setLoading(true);
                const res = await fetch(
                    `/api/clips?tags=${encodeURIComponent(artistTag)}&limit=18&page=1`
                );
                if (res.ok) {
                    const data = await res.json();
                    setClips(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        loadClips();
    }, [slug, artistTag]);

    return (
        <main className="min-h-screen bg-white">
            {/* Header */}
            <div className="pt-28 pb-12 px-6 md:px-12 border-b border-gray-100">
                <div className="max-w-[1500px] mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 text-gray-500 hover:text-[#1a1a1a] transition-colors mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-sm font-medium">Back</span>
                    </button>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border border-gray-100">
                                <Sparkles className="w-3 h-3 text-[#c4b5fd]" />
                                Animator
                            </div>
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1a1a1a]">
                                {artistName}
                            </h1>
                            {artistStyle && (
                                <p className="text-gray-500 mt-2 text-lg">
                                    Known for: <span className="text-[#1a1a1a] font-medium">{artistStyle}</span>
                                </p>
                            )}
                        </div>
                        <div className="text-sm text-gray-400 font-medium">
                            {!loading && `${clips.length} clips`}
                        </div>
                    </div>
                </div>
            </div>

            {/* Clips Grid */}
            <div className="px-6 md:px-12 py-12 max-w-[1500px] mx-auto">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-3xl p-3 animate-pulse">
                                <div className="aspect-video bg-gray-200 rounded-2xl mb-4" />
                                <div className="px-2 space-y-2">
                                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : clips.length === 0 ? (
                    <div className="text-center py-32">
                        <p className="text-2xl font-bold text-[#1a1a1a] mb-2">No clips found</p>
                        <p className="text-gray-500">Try checking back later or browse all clips.</p>
                        <Link
                            href="/animations"
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full bg-[#1a1a1a] text-white text-sm font-medium"
                        >
                            Browse Collection <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {clips.map((clip) => {
                            const isVideo = ['mp4', 'webm', 'mov'].includes(clip.file_ext);
                            const title = clip.tags?.split(' ').slice(0, 3).join(' ').replace(/_/g, ' ') || "Clip";

                            return (
                                <Link key={clip.id} href={`/clips/${clip.id}`} className="block">
                                    <div className="group bg-white border border-gray-100 rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all duration-300">
                                        <div className="aspect-video rounded-2xl overflow-hidden relative bg-gray-100">
                                            {clip.score > 0 && (
                                                <div className="absolute top-3 left-3 z-20 flex items-center gap-1 text-xs font-bold text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                                                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                    {clip.score}
                                                </div>
                                            )}
                                            <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-lg">
                                                    <ArrowRight className="w-5 h-5 text-white" />
                                                </div>
                                            </div>
                                            {isVideo ? (
                                                <video
                                                    src={proxyUrl(clip.file_url)}
                                                    poster={getPosterUrl(clip)}
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                    muted
                                                    loop
                                                    playsInline
                                                    preload="metadata"
                                                    onMouseEnter={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
                                                    onMouseLeave={(e) => { const v = e.target as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                                                />
                                            ) : (
                                                <img
                                                    src={proxyUrl(clip.sample_url || clip.file_url)}
                                                    alt={title}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="px-2 py-3">
                                            <h3 className="font-bold text-[#1a1a1a] text-base line-clamp-1 group-hover:text-[#c4b5fd] transition-colors capitalize">
                                                {title}
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
}