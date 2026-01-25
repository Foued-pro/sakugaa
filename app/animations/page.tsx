"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchClips } from '../../lib/sakugabooru.js';
import type { SakugabooruPost } from '../type/sakugabooru';

import Link from "next/link";
import Masonry from 'react-masonry-css';
import { motion } from "framer-motion";
export const dynamic = 'force-dynamic';
export default function AnimationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();


    const pageParam = searchParams.get('page');
    const currentPage = pageParam ? Math.max(1, parseInt(pageParam)) : 1;

    const currentSearch = searchParams.get('search') || '';

    const [clips, setClips] = useState<SakugabooruPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState('');

    const POPULAR_TAGS = ['fate', 'naruto', 'one_piece', 'jujutsu_kaisen', 'chainsaw_man','production_materials'];

    // Configuration des colonnes pour le Masonry (Responsive)
    const breakpointColumnsObj = {
        default: 4,
        1400: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    function updateURL(newSearch?:string, newPage?: number): void {
        const currentParams = new URLSearchParams(searchParams.toString());

        if (newSearch !== undefined) {
            if (newSearch) {
                currentParams.set('search', newSearch);
            }
            else {
                currentParams.delete('search');
            }
        }

        if (newPage !== undefined) {
            if (newPage > 1){
                currentParams.set('page', newPage.toString());
            }
            else {
                currentParams.delete('page');
            }
        }

        const newURL = currentParams.toString() ? `?${currentParams.toString()}` : '';
        router.push(`/animations${newURL}`);
    }

    function handleSearch() {
        const query = searchInput.trim().toLowerCase();
        if (!query) return;
        updateURL(query, 1);
    }

    function selectTag(tag:string) { updateURL(tag, 1); }
    function changePage(newPage: number) {
        updateURL(currentSearch, newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    useEffect(() => {
        async function loadClips() {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchClips(12, currentPage, currentSearch);
                console.log("Premier clip:", data[0]);

                setClips(data);
            }  catch (error) {
                setError(error instanceof Error ? error.message : "Erreur inconnue");
            }finally {
                setLoading(false);
            }
        }
        loadClips();
    }, [currentPage, currentSearch]);

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header Fixe */}
            <div className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-gray-900 px-6 py-4">
                <div className="max-w-[1800px] mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Sakuga Gallery
                        </h1>
                        <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                            ← Retour Accueil
                        </Link>
                    </div>

                    <div className="relative max-w-2xl">
                        <input
                            type="text"
                            placeholder="Rechercher des tags (ex: yutaka_nakamura, debris)..."
                            className="w-full p-3 pl-10 bg-gray-900 border border-gray-800 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none text-sm"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        {/* Tags Rapides */}
                        <div className="mt-3 flex flex-wrap gap-2">
                            <button onClick={() => updateURL('', 1)} className={`text-xs px-3 py-1 rounded-full transition-colors ${!currentSearch ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}>All</button>
                            {POPULAR_TAGS.map(tag => (
                                <button key={tag} onClick={() => selectTag(tag)} className={`text-xs px-3 py-1 rounded-full transition-colors ${currentSearch === tag ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                                    {tag.replace('_', ' ')}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-4 py-6 max-w-[1800px] mx-auto">
                {loading ? (
                    /* Squelette de chargement */
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="aspect-video bg-gray-900 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    /* GRILLE MASONRY */
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex w-auto -ml-4"
                        columnClassName="pl-4 bg-clip-padding"
                    >
                        {clips.map((clip, index) => {
                            if (!clip.file_url) return null;

                            const isVideo = ['mp4', 'webm', 'mov', 'mkv'].includes(clip.file_ext);

                            return (
                                <motion.div
                                    key={clip.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="mb-4 group"
                                >
                                    <Link href={`/clips/${clip.id}`} className="block relative overflow-hidden rounded-xl bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-900/20">

                                        {/* Zone Média */}
                                        <div className="relative w-full">
                                            {isVideo ? (
                                                <video
                                                    src={clip.file_url}
                                                    className="w-full h-auto object-cover block"
                                                    onMouseEnter={(e) => {
                                                        // On joue la vidéo
                                                        const playPromise = e.currentTarget.play();
                                                        if (playPromise !== undefined) {
                                                            playPromise.catch(() => {});
                                                        }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.pause();
                                                        e.currentTarget.currentTime = 0;
                                                    }}
                                                    poster={clip.preview_url || undefined}
                                                    muted
                                                    loop
                                                    playsInline
                                                    preload="metadata"
                                                />
                                            ) : (
                                                <img
                                                    src={clip.preview_url}
                                                    alt={clip.tags?.split(' ').slice(0, 3).join(', ') || 'Animation clip'}
                                                    loading={"lazy"}
                                                    className="w-full h-auto object-cover block"
                                                />
                                            )}

                                            {/* Badges sur l'image */}
                                            {isVideo ? (
                                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white border border-white/10 shadow-sm pointer-events-none">
                                                    VIDEO
                                                </div>
                                            ):(
                                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold text-white border border-white/10 shadow-sm pointer-events-none">
                                                IMAGE
                                                </div>
                                                )
                                            }
                                        </div>
                                        
                                        <div className="p-3 bg-gray-900 group-hover:bg-gray-800 transition-colors">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-semibold text-gray-300 truncate max-w-[70%]">
                                                    {clip.author || 'Artiste inconnu'}
                                                </span>
                                                <span className="text-[10px] font-mono text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded">
                                                    ★ {clip.score}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-gray-500 truncate">
                                                {clip.tags?.split(' ').slice(0, 3).join(' • ')}
                                            </p>
                                        </div>

                                    </Link>
                                </motion.div>
                            );
                        })}
                    </Masonry>
                )}

                {/* Pagination */}
                <div className="flex justify-center mt-12 gap-4">
                    <button
                        onClick={() => changePage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-5 py-2.5 bg-gray-800 text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        ← Précédent
                    </button>
                    <span className="flex items-center text-sm font-mono text-gray-500">
                        Page {currentPage}
                    </span>
                    <button
                        onClick={() => changePage(currentPage + 1)}
                        className="px-5 py-2.5 bg-blue-600 text-sm font-medium text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/30"
                    >
                        Suivant →
                    </button>
                </div>
            </div>
        </div>
    );
}