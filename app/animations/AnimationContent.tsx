"use client";

import { useState, useEffect, useRef, memo, useCallback } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchClips } from '@/lib/sakugabooru';
import type { SakugabooruPost } from '../type/sakugabooru';
import { useInView } from '../hook/useInView'; // Ton hook actuel est très bien
import Link from "next/link";
import Masonry from 'react-masonry-css';
import { motion } from "framer-motion";
import { Search, Sparkles, Filter, ArrowRight, ArrowLeft, Play } from "lucide-react";

// -----------------------------------------------------------------------------
// 1. CONSTANTES D'ANIMATION (SORTIES DU COMPOSANT)
// -----------------------------------------------------------------------------
// CRITIQUE : En les sortant, on évite de créer 7 millions d'objets
const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};
const CARD_TRANSITION = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1] as const
};
// -----------------------------------------------------------------------------
// 2. VIDEO PLAYER OPTIMISÉ (CLEANUP AGRESSIF)
// -----------------------------------------------------------------------------
const VideoPlayer = memo(({ clip }: { clip: SakugabooruPost }) => {
    // On utilise ton hook useInView (0.5 threshold c'est bien)
    const { ref: containerRef, isInView } = useInView<HTMLDivElement>(0.5);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [hasLoaded, setHasLoaded] = useState(false);

    // Lazy Load : on ne charge que si on a scrollé dessus
    useEffect(() => {
        if (isInView && !hasLoaded) {
            setHasLoaded(true);
        }
    }, [isInView, hasLoaded]);

    // GARBAGE COLLECTION FORCÉ
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

    // Play/Pause intelligent
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isInView) {
            video.play().catch(() => {});
        } else {
            video.pause();
        }
    }, [isInView]);

    return (
        <div ref={containerRef} className="relative w-full h-full bg-black/5">
            {hasLoaded ? (
                <video
                    ref={videoRef}
                    src={clip.file_url}
                    className="w-full h-auto object-cover block"
                    muted
                    loop
                    playsInline
                    preload="none"
                />
            ) : (
                <div className="relative w-full h-auto">
                    <img
                        src={clip.preview_url}
                        alt="preview"
                        className="w-full h-auto object-cover block"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <Play className="w-8 h-8 text-white/50" fill="currentColor" />
                    </div>
                </div>
            )}
        </div>
    );
});
VideoPlayer.displayName = "VideoPlayer";

// -----------------------------------------------------------------------------
// 3. CLIP CARD (MEMOIZÉ)
// -----------------------------------------------------------------------------
// CRITIQUE : React.memo empêche de re-rendre la carte si les props ne changent pas
const ClipCard = memo(({ clip, index }: { clip: SakugabooruPost; index: number }) => {
    if (!clip.file_url) return null;

    const isVideo = ['mp4', 'webm', 'mov', 'mkv'].includes(clip.file_ext);
    const artistName = clip.tags?.split(' ').find(t => t.includes('animator')) || clip.author || 'Unknown';

    return (
        <motion.div
            variants={CARD_VARIANTS}
            initial="hidden"
            animate="visible"
            transition={CARD_TRANSITION}
        >
            <Link href={`/clips/${clip.id}`} className="block">
                <div className="relative w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-[#1a1a1a] shadow-sm group-hover:shadow-2xl group-hover:shadow-[#c4b5fd]/20 transition-all duration-500 group-hover:-translate-y-1 transform-gpu">
                    {isVideo ? (
                        <VideoPlayer clip={clip} />
                    ) : (
                        <img
                            src={clip.preview_url}
                            alt={clip.tags}
                            loading="lazy"
                            className="w-full h-auto object-cover block"
                        />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                </div>

                <div className="mt-3 px-1">
                    <div className="flex justify-between items-start gap-2">
                        <h3 className="font-bold text-sm text-[#1a1a1a] dark:text-white capitalize truncate pr-2 group-hover:text-[#c4b5fd] transition-colors">
                            {artistName.replace(/_/g, ' ')}
                        </h3>
                        {clip.score > 0 && (
                            <span className="flex items-center gap-1 text-[10px] font-bold bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full shrink-0">
                                ★ {clip.score}
                            </span>
                        )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-1 capitalize">
                        {clip.tags?.split(' ').slice(0, 3).join(', ').replace(/_/g, ' ')}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
});
ClipCard.displayName = "ClipCard";

// -----------------------------------------------------------------------------
// 4. MAIN COMPONENT
// -----------------------------------------------------------------------------
export default function AnimationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageParam = searchParams.get('page');
    const currentPage = pageParam ? Math.max(1, parseInt(pageParam)) : 1;
    const currentSearch = searchParams.get('search') || '';

    const [clips, setClips] = useState<SakugabooruPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState(currentSearch);

    const POPULAR_TAGS = ['fate', 'jujutsu_kaisen', 'chainsaw_man', 'impact_frames', 'debris', 'smear'];

    const breakpointColumnsObj = {
        default: 4,
        1536: 4,
        1280: 3,
        1024: 3,
        768: 2,
        500: 1
    };

    // UseCallback pour stabiliser les fonctions
    const updateURL = useCallback((newSearch?: string, newPage?: number) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        if (newSearch !== undefined) {
            newSearch ? currentParams.set('search', newSearch) : currentParams.delete('search');
        }
        if (newPage !== undefined) {
            newPage > 1 ? currentParams.set('page', newPage.toString()) : currentParams.delete('page');
        }
        router.push(`/animations?${currentParams.toString()}`);
    }, [searchParams, router]);

    const handleSearch = useCallback(() => {
        if (!searchInput.trim() && !currentSearch) return;
        updateURL(searchInput.trim(), 1);
    }, [searchInput, currentSearch, updateURL]);

    // Reset clips immédiat pour libérer la mémoire avant le fetch
    useEffect(() => {
        setClips([]);
    }, [currentSearch, currentPage]);

    useEffect(() => {
        let isMounted = true;

        async function loadClips() {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchClips(15, currentPage, currentSearch);
                if (isMounted) setClips(data);
            } catch (error) {
                if (isMounted) setError(error instanceof Error ? error.message : "Erreur inconnue");
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        loadClips();

        return () => { isMounted = false; };
    }, [currentPage, currentSearch]);

    useEffect(() => {
        setSearchInput(currentSearch);
    }, [currentSearch]);

    return (
        <div className="min-h-screen bg-[#fafaf9] dark:bg-black text-[#1a1a1a] dark:text-white transition-colors duration-300">
            {/* HEADER (Recherche) */}
            <div className="pt-24 pb-12 px-6 border-b border-gray-200 dark:border-white/5">
                <div className="max-w-[1600px] mx-auto">
                    <div className="mb-8">
                        <span className="text-[#c4b5fd] font-bold text-xs uppercase tracking-widest">Archive</span>
                        <h1 className="text-4xl md:text-5xl font-bold mt-2 tracking-tight">Explore Clips</h1>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-6 items-start xl:items-center justify-between">
                        <div className="relative w-full max-w-2xl group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#c4b5fd] transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by artist, anime, or tag..."
                                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-[#c4b5fd]/50 focus:border-[#c4b5fd] transition-all outline-none shadow-sm font-medium"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <div className="absolute inset-y-0 right-2 flex items-center">
                                <button onClick={handleSearch} className="p-2 bg-gray-100 dark:bg-white/10 rounded-xl hover:bg-[#c4b5fd] hover:text-white transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 items-center">
                            <span className="text-sm font-medium text-gray-400 mr-2 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" /> Popular:
                            </span>
                            <button onClick={() => updateURL('', 1)} className={`text-xs px-4 py-2 rounded-full border transition-all font-medium ${!currentSearch ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] dark:bg-white dark:text-black' : 'bg-transparent text-gray-500 border-gray-200 dark:border-white/10 hover:border-[#c4b5fd]'}`}>All</button>
                            {POPULAR_TAGS.map(tag => (
                                <button key={tag} onClick={() => updateURL(tag, 1)} className={`text-xs px-4 py-2 rounded-full border transition-all font-medium ${currentSearch === tag ? 'bg-[#1a1a1a] text-white border-[#1a1a1a] dark:bg-white dark:text-black' : 'bg-transparent text-gray-500 border-gray-200 dark:border-white/10 hover:border-[#c4b5fd] hover:text-[#c4b5fd]'}`}>{tag.replace('_', ' ')}</button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENU GRILLE */}
            <div className="px-6 py-12 max-w-[1600px] mx-auto min-h-[60vh]">
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
                        {[...Array(8)].map((_, i) => <div key={i} className="aspect-video bg-gray-200 dark:bg-[#1a1a1a] rounded-2xl" />)}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="p-4 rounded-full bg-red-50 dark:bg-red-900/20 mb-4"><Filter className="w-8 h-8 text-red-500" /></div>
                        <h2 className="text-xl font-bold mb-2">Failed to load clips</h2>
                        <p className="text-gray-500 mb-6">{error}</p>
                        <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#1a1a1a] dark:bg-white text-white dark:text-black rounded-full font-medium hover:opacity-90 transition-opacity">Retry</button>
                    </div>
                ) : (
                    <>
                        <Masonry breakpointCols={breakpointColumnsObj} className="flex w-auto -ml-6" columnClassName="pl-6 bg-clip-padding">
                            {clips.map((clip, index) => (
                                <ClipCard key={clip.id} clip={clip} index={index} />
                            ))}
                        </Masonry>

                        <div className="flex justify-center items-center mt-16 gap-6">
                            <button onClick={() => updateURL(currentSearch, currentPage - 1)} disabled={currentPage === 1} className="group p-4 rounded-full border border-gray-200 dark:border-white/10 hover:border-[#c4b5fd] hover:text-[#c4b5fd] disabled:opacity-30 disabled:hover:border-gray-200 transition-all"><ArrowLeft className="w-5 h-5" /></button>
                            <span className="text-sm font-bold tracking-widest text-gray-400">PAGE {currentPage}</span>
                            <button onClick={() => updateURL(currentSearch, currentPage + 1)} className="group p-4 rounded-full bg-[#1a1a1a] dark:bg-white text-white dark:text-black hover:scale-110 transition-transform shadow-lg"><ArrowRight className="w-5 h-5" /></button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}