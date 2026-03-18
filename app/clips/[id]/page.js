"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchClipById } from "../../../lib/sakugabooru";
import {
    Calendar,
    User,
    ExternalLink,
    Download,
    Tag,
    AlertCircle,
    Loader2,
    ArrowLeft,
    Star
} from "lucide-react";

export const runtime = 'edge';

export default function ClipPage() {
    const router = useRouter();
    const { id } = useParams();
    const [clip, setClip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);

    useEffect(() => {
        if (!id) return;
        async function loadClips() {
            try {
                setLoading(true);
                const data = await fetchClipById(id);
                if (!data) throw new Error("Clip introuvable");
                setClip(data);
            } catch (err) {
                console.error(err);
                setError("Impossible de charger le clip.");
            } finally {
                setLoading(false);
            }
        }
        loadClips();
    }, [id]);

    const formatDate = (timestamp) => {
        if (!timestamp) return "Date inconnue";
        return new Date(timestamp * 1000).toLocaleDateString('fr-FR', {
            year: 'numeric', month: 'long', day: 'numeric'
        });
    };

    const getTagsList = (tagString) => {
        return tagString ? tagString.split(" ").filter(t => t.length > 0) : [];
    };

    const handleDownload = () => {
        if (!clip) return;
        setIsDownloading(true);
        const filename = `sakuga-${clip.id}.${clip.file_ext}`;
        const apiUrl = `/api/download?url=${encodeURIComponent(clip.file_url)}&filename=${filename}`;
        window.location.href = apiUrl;
        setTimeout(() => setIsDownloading(false), 2000);
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-200 border-t-[#c4b5fd] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading clip...</p>
                </div>
            </main>
        );
    }

    if (error || !clip) {
        return (
            <main className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
                <AlertCircle className="w-16 h-16 text-red-500" />
                <p className="text-xl font-semibold text-red-600">{error || "Clip not found"}</p>
                <button
                    onClick={() => router.push('/animations')}
                    className="mt-4 px-6 py-3 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-black transition-all"
                >
                    Back to Collection
                </button>
            </main>
        );
    }

    const isVideo = clip.file_url?.endsWith('.mp4') ||
        clip.file_url?.endsWith('.webm') ||
        clip.file_url?.endsWith('.mov');

    const tags = getTagsList(clip.tags);

    return (
        <main className="min-h-screen bg-white">
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6">
                    <button
                        onClick={() => router.back()}
                        className="group flex items-center gap-2 text-gray-600 hover:text-[#1a1a1a] transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Collection</span>
                    </button>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-lg">
                            <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center min-h-[400px] lg:min-h-[600px] p-6">
                                {isVideo ? (
                                    <video
                                        src={clip.file_url?.replace('http:', 'https:')}
                                        controls
                                        autoPlay
                                        loop
                                        className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                                    />
                                ) : (
                                    <img
                                        src={(clip.sample_url || clip.file_url)?.replace('http:', 'https:')}
                                        alt={`Sakuga ID ${clip.id}`}
                                        className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
                                    />
                                )}
                            </div>
                            <div className="bg-white p-6 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                                        <span className="text-2xl font-bold text-[#1a1a1a]">{clip.score}</span>
                                        <span className="text-sm text-gray-500 font-medium">Score</span>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <span className="font-medium text-[#1a1a1a]">{clip.width}×{clip.height}</span>
                                        <span className="mx-2">·</span>
                                        <span className="uppercase font-mono">{clip.file_ext}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-full font-medium hover:bg-black disabled:opacity-50 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    {isDownloading ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" />
                                            Downloading...
                                        </>
                                    ) : (
                                        <>
                                            <Download size={18} />
                                            Download HD
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <Tag size={20} className="text-[#c4b5fd]" />
                                <h2 className="text-xl font-bold text-[#1a1a1a]">Tags</h2>
                                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">
                                    {tags.length}
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-gray-50 hover:bg-[#c4b5fd] hover:text-white border border-gray-200 hover:border-[#c4b5fd] text-gray-700 rounded-full text-sm font-medium transition-all cursor-pointer"
                                        title={tag}
                                    >
                                        {tag.replace(/_/g, ' ')}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm lg:sticky lg:top-40">
                            <h2 className="text-xl font-bold mb-6 text-[#1a1a1a] pb-4 border-b border-gray-100">
                                Clip Details
                            </h2>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#ede9fe] flex items-center justify-center shrink-0">
                                        <User size={18} className="text-[#c4b5fd]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                                            Artist
                                        </p>
                                        <p className="font-semibold text-[#1a1a1a] truncate">
                                            {clip.author || "Unknown"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#ede9fe] flex items-center justify-center shrink-0">
                                        <Calendar size={18} className="text-[#c4b5fd]" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-1">
                                            Published
                                        </p>
                                        <p className="font-semibold text-[#1a1a1a]">
                                            {formatDate(clip.created_at)}
                                        </p>
                                    </div>
                                </div>

                                {clip.source && (
                                    <a
                                        href={clip.source}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center gap-2 w-full py-3 mt-6 rounded-full text-sm font-medium border-2 border-gray-200 hover:border-[#c4b5fd] hover:bg-[#ede9fe] text-gray-700 hover:text-[#1a1a1a] transition-all"
                                    >
                                        <ExternalLink size={16} />
                                        View Original Source
                                    </a>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}