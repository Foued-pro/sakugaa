"use client";

import { useState, useEffect, useRef, memo, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchClips } from '@/lib/sakugabooru';
import type { SakugabooruPost } from '../type/sakugabooru';
import { useInView } from '../hook/useInView';
import Link from "next/link";
import Masonry from 'react-masonry-css';
import { motion } from "framer-motion";
import { Search, Sparkles, Filter, ArrowRight, ArrowLeft, Star, X } from "lucide-react";
import { proxyUrl, getPosterUrl, getImageUrl } from "@/lib/proxy";

const MASONRY_BREAKPOINTS = {
    default: 3,
    1536: 3,
    1024: 2,
    640: 1
};

const POPULAR_TAGS = [
    'yutaka_nakamura',
    'production_materials',
    'jujutsu_kaisen',
    'impact_frames',
    'debris'
];

const CARD_VARIANTS = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const CARD_TRANSITION = {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1] as const
};

const VideoPlayer = memo(({ clip }: { clip: SakugabooruPost }) => {
    const { ref: containerRef, isInView } = useInView<HTMLDivElement>(0.2);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const secureFileUrl = clip.file_url?.replace('http:', 'https:');

    // Detect touch device
    useEffect(() => {
        setIsTouchDevice(window.matchMedia('(hover: none)').matches);
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;
        return () => {
            if (videoElement) {
                videoElement.pause();
                videoElement.removeAttribute('src');
                videoElement.load();
            }
        };
    }, []);

    // Desktop: hover to play
    useEffect(() => {
        if (isTouchDevice) return;
        const video = videoRef.current;
        if (!video || !isInView) return;

        if (isHovered) {
            video.play().catch(() => {});
        } else {
            video.pause();
            video.currentTime = 0;
        }
    }, [isHovered, isInView, isTouchDevice]);

    // Mobile: autoplay when visible in viewport
    useEffect(() => {
        if (!isTouchDevice || !isInView) return;
        const video = videoRef.current;
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

        observer.observe(video);
        return () => observer.disconnect();
    }, [isTouchDevice, isInView]);

    const posterUrl = getPosterUrl(clip);

    return (
        <div
            ref={containerRef}
            className="group/video relative w-full h-full bg-gray-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Poster image visible immédiatement, avant que la vidéo charge */}
            <img
                src={posterUrl}
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            {isInView && (
                <video
                    ref={videoRef}
                    src={secureFileUrl}
                    poster={posterUrl}
                    className="absolute inset-0 w-full h-full object-cover z-[1]"
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
            )}

            <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover/video:opacity-100 transition-all duration-300 pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center transform translate-y-4 group-hover/video:translate-y-0 transition-all duration-300 border border-white/50 shadow-lg">
                    <ArrowRight className="w-5 h-5 text-white" />
                </div>
            </div>
        </div>
    );
});
VideoPlayer.displayName = "VideoPlayer";

const ClipCard = memo(({ clip }: { clip: SakugabooruPost }) => {
    if (!clip.file_url) return null;
    const isVideo = ['mp4', 'webm', 'mov', 'mkv'].includes(clip.file_ext);
    const artistName = clip.tags?.split(' ').find(t => t.includes('animator')) || clip.author || 'Unknown';
    const title = clip.tags?.split(' ').slice(0, 3).join(' ').replace(/_/g, ' ') || "Animation Clip";

    const rawImageUrl = clip.sample_url || clip.preview_url || (!isVideo ? clip.file_url : null);
    const secureImageUrl = rawImageUrl ? proxyUrl(rawImageUrl) : '';

    return (
        <motion.div
            variants={CARD_VARIANTS}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "100px" }}
            transition={CARD_TRANSITION}
            className="mb-8"
        >
            <Link href={`/clips/${clip.id}`} className="block h-full">
                <div className="group bg-white border border-gray-100 rounded-3xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
                    <div className="aspect-video rounded-2xl overflow-hidden relative shrink-0 bg-gray-100">
                        {isVideo ? (
                            <VideoPlayer clip={clip} />
                        ) : (
                            <div className="relative w-full h-full group/image">
                                <img
                                    src={secureImageUrl || ''}
                                    alt={title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                />
                                <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 border border-white/50 shadow-lg">
                                        <ArrowRight className="w-5 h-5 text-white" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="px-2 pt-4 pb-1 flex flex-col">
                        <div className="flex justify-between items-start gap-3">
                            <div className="min-w-0 flex-1">
                                <h3 className="font-bold text-[#1a1a1a] text-lg leading-tight truncate group-hover:text-[#c4b5fd] transition-colors capitalize">
                                    {title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1 truncate capitalize font-medium">
                                    {artistName.replace(/_/g, ' ')}
                                </p>
                            </div>
                            {clip.score > 0 && (
                                <div className="flex items-center gap-1 text-xs font-bold text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100 shrink-0 mt-0.5">
                                    <Star className="w-3 h-3 text-amber-400 fill-amber-400"/>
                                    {clip.score}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
});
ClipCard.displayName = "ClipCard";

export default function AnimationContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const pageParam = searchParams.get('page');
    const currentPage = useMemo(() => pageParam ? Math.max(1, parseInt(pageParam)) : 1, [pageParam]);
    const currentSearch = useMemo(() => searchParams.get('search') || '', [searchParams]);

    const [clips, setClips] = useState<SakugabooruPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchInput, setSearchInput] = useState(currentSearch);

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

    useEffect(() => {
        setClips([]);
    }, [currentSearch]);

    useEffect(() => {
        const abortController = new AbortController();

        async function loadClips() {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchClips(15, currentPage, currentSearch, { signal: abortController.signal });

                if (!abortController.signal.aborted) {
                    if (Array.isArray(data)) {
                        setClips(data);
                    } else {
                        setClips([]);
                    }
                }
            } catch (error: unknown) {
                if (error instanceof Error && error.name === 'AbortError') return;

                if (!abortController.signal.aborted) {
                    console.error("Fetch error:", error);
                    setError(error instanceof Error ? error.message : "Erreur inconnue");
                }
            } finally {
                if (!abortController.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadClips();

        return () => abortController.abort();
    }, [currentPage, currentSearch]);

    useEffect(() => {
        setSearchInput(currentSearch);
    }, [currentSearch]);

    return (
        <div className="min-h-screen bg-white text-[#1a1a1a]">
            <div className="relative pt-32 pb-16 px-6 md:px-12 border-b border-gray-100 bg-white/80 backdrop-blur-xl transition-all duration-300">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-10">
                        <div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-widest text-gray-500 mb-4"
                            >
                                <Sparkles className="w-3 h-3 text-[#c4b5fd]" />
                                <span>Sakuga Archive</span>
                            </motion.div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#1a1a1a] leading-[0.9]">
                                Explore <br/>
                                <span className="text-gray-300">Collection.</span>
                            </h1>
                        </div>

                        <div className="w-full lg:w-auto lg:min-w-[500px]">
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#1a1a1a] transition-colors" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search artists, anime, tags..."
                                    className="w-full pl-14 pr-14 py-5 bg-gray-50 border-none rounded-full text-lg font-medium text-[#1a1a1a] placeholder-gray-400 focus:ring-0 focus:bg-gray-100 transition-all shadow-sm group-hover:shadow-md"
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                {searchInput && (
                                    <button onClick={() => {setSearchInput(''); updateURL('', 1)}} className="absolute inset-y-0 right-4 flex items-center p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                                <button onClick={handleSearch} className="absolute inset-y-2 right-2 p-3 bg-[#1a1a1a] text-white rounded-full hover:scale-105 transition-transform shadow-lg hidden sm:flex">
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 items-center">
                        <span className="text-sm font-bold text-gray-400 mr-2">Trending:</span>
                        {POPULAR_TAGS.map(tag => (
                            <button
                                key={tag}
                                onClick={() => updateURL(tag, 1)}
                                className={`text-sm px-5 py-2 rounded-full transition-all duration-300 font-medium border ${currentSearch === tag
                                    ? 'bg-[#1a1a1a] text-white border-[#1a1a1a]'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-[#1a1a1a]'}`}
                            >
                                {tag.replace(/_/g, ' ')}
                            </button>
                        ))}
                        {currentSearch && (
                            <button onClick={() => updateURL('', 1)} className="text-sm px-5 py-2 rounded-full bg-red-50 text-red-500 font-bold hover:bg-red-100 transition-colors ml-auto">
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="px-6 md:px-12 py-12 max-w-[1600px] mx-auto min-h-[60vh]">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white border border-gray-100 rounded-3xl p-3 h-full animate-pulse">
                                <div className="aspect-video bg-gray-200 rounded-2xl mb-4" />
                                <div className="px-2 space-y-2">
                                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-32 text-center">
                        <div className="p-6 rounded-full bg-red-50 mb-6"><Filter className="w-10 h-10 text-red-500" /></div>
                        <h2 className="text-3xl font-bold mb-3 tracking-tight text-[#1a1a1a]">No results found</h2>
                        <p className="text-gray-500 mb-8 text-lg max-w-md">{error}</p>
                        <button onClick={() => {setSearchInput(''); updateURL('', 1)}} className="px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <>
                        <Masonry
                            breakpointCols={MASONRY_BREAKPOINTS}
                            className="flex w-auto -ml-8"
                            columnClassName="pl-8 bg-clip-padding"
                        >
                            {clips.map((clip) => (
                                <ClipCard key={clip.id} clip={clip} />
                            ))}
                        </Masonry>

                        <div className="flex justify-between items-center mt-20 pt-10 border-t border-gray-100">
                            <button
                                onClick={() => updateURL(currentSearch, currentPage - 1)}
                                disabled={currentPage === 1}
                                className="group flex items-center gap-2 md:gap-4 px-4 md:px-8 py-3 md:py-4 rounded-full border border-gray-200 hover:border-[#1a1a1a] disabled:opacity-30 disabled:hover:border-gray-200 transition-all"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                <span className="font-bold text-sm md:text-lg hidden sm:inline">Previous</span>
                            </button>
                            <span className="font-mono text-gray-300 text-base md:text-xl tracking-widest">
                                {currentPage}
                            </span>
                            <button
                                onClick={() => updateURL(currentSearch, currentPage + 1)}
                                className="group flex items-center gap-2 md:gap-4 px-4 md:px-8 py-3 md:py-4 rounded-full bg-[#1a1a1a] text-white hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
                            >
                                <span className="font-bold text-sm md:text-lg hidden sm:inline">Next</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}