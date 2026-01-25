"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchClipById } from "../../../lib/sakugabooru";
export const runtime = 'edge';

import {
    Calendar,
    User,
    Link as LinkIcon,
    Download,
    Tag,
    AlertCircle,
    Loader2 // J'ajoute l'icône de chargement
} from "lucide-react";

export default function ClipPage() {
    const { id } = useParams();
    const [clip, setClip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // État pour savoir si le téléchargement est en cours
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
            <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </main>
        );
    }

    if (error || !clip) {
        return (
            <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-4">
                <AlertCircle className="w-16 h-16 text-red-500" />
                <p className="text-xl font-semibold text-red-400">{error || "Erreur inconnue"}</p>
            </main>
        );
    }

    const isVideo = clip.file_url?.endsWith('.mp4') ||
        clip.file_url?.endsWith('.webm') ||
        clip.file_url?.endsWith('.mov');

    const tags = getTagsList(clip.tags);

    return (
        <main className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-6 lg:p-8">
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

                <aside className="lg:col-span-1 order-last lg:order-first flex flex-col gap-6">
                    {/* Infos Techniques */}
                    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg">
                        <h1 className="text-xl font-bold mb-4 text-blue-400 border-b border-gray-700 pb-2">
                            Détails du Post
                        </h1>

                        <div className="space-y-4 text-sm text-gray-300">
                            <div className="flex items-center gap-3">
                                <User size={18} className="text-blue-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Artiste / Uploader</p>
                                    <p className="font-medium text-white hover:text-blue-400 cursor-pointer transition-colors">
                                        {clip.author || "Anonyme"}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <Calendar size={18} className="text-green-400" />
                                <div>
                                    <p className="text-xs text-gray-500">Date</p>
                                    <p className="font-medium text-white">{formatDate(clip.created_at)}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-gray-700/50">
                                <div>
                                    <p className="text-xs text-gray-500">Dimensions</p>
                                    <p className="font-mono text-white">{clip.width}x{clip.height}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Fichier</p>
                                    <p className="font-mono text-white uppercase">{clip.file_ext}</p>
                                </div>
                            </div>

                            {/* CORRECTION DE LA SYNTAXE ICI */}
                            <a
                                href={clip.source}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center gap-2 w-full py-2 mt-2 rounded-lg text-xs font-medium border border-gray-600 hover:bg-gray-700 transition-colors ${!clip.source && 'opacity-50 pointer-events-none'}`}
                            >
                                <LinkIcon size={14} /> Voir la source originale
                            </a>
                        </div>
                    </div>

                    {/* Liste des Tags */}
                    <div className="bg-gray-800 p-5 rounded-xl border border-gray-700 shadow-lg flex-grow">
                        <div className="flex items-center gap-2 mb-4 text-gray-300">
                            <Tag size={18} />
                            <h2 className="font-semibold">Tags</h2>
                            <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full text-gray-400">{tags.length}</span>
                        </div>

                        <div className="flex flex-wrap gap-2 content-start">
                            {tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="px-2.5 py-1 bg-gray-900 hover:bg-blue-600 border border-gray-700 hover:border-blue-500 text-gray-300 hover:text-white rounded text-xs transition-all cursor-pointer truncate max-w-full"
                                    title={tag}
                                >
                                    {tag.replace(/_/g, ' ')}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <div className="lg:col-span-3 flex flex-col gap-6">
                    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl border border-gray-700 relative">
                        <div className="w-full bg-black flex justify-center items-center min-h-[300px] lg:min-h-[600px]">
                            {isVideo ? (
                                <video
                                    src={clip.file_url}
                                    controls
                                    autoPlay
                                    loop
                                    muted
                                    className="max-w-full max-h-[85vh] object-contain"
                                />
                            ) : (
                                <img
                                    src={clip.sample_url || clip.file_url}
                                    alt={`Sakuga ID ${clip.id}`}
                                    className="max-w-full max-h-[85vh] object-contain"
                                />
                            )}
                        </div>

                        {/* Barre d'action */}
                        <div className="bg-gray-800 p-4 border-t border-gray-700 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <span className="text-yellow-500 font-bold text-lg">{clip.score}</span>
                                    <span className="text-xs uppercase font-bold tracking-wider">Score</span>
                                </div>
                            </div>

                            {/* Bouton Télécharger avec état de chargement */}
                            <button
                                onClick={handleDownload}
                                disabled={isDownloading}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:opacity-70 rounded-lg text-sm font-medium text-white transition-colors"
                            >
                                {isDownloading ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" /> Téléchargement...
                                    </>
                                ) : (
                                    <>
                                        <Download size={16} /> Télécharger HD
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}