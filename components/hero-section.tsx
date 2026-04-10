"use client";

import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { proxyUrl, getPosterUrl } from "@/lib/proxy";

const prepareMarquee = (clips: any[]) => {
    const validClips = clips.filter(c => c.file_url || c.sample_url);
    return [...validClips, ...validClips];
};

interface HeroSectionProps {
    clips: any[];
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 60, damping: 20 }
    },
};

function MarqueeVideo({ clip }: { clip: any }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isVideo = clip.file_url?.match(/\.(mp4|webm|mov)$/);

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
                if (entry?.isIntersecting) video.play().catch(() => {});
                else video.pause();
            },
            { threshold: 0.5 }
        );
        observer.observe(card);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className="group relative w-[260px] md:w-[380px] aspect-video rounded-xl overflow-hidden bg-gray-100 border border-gray-100"
        >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 z-10 transition-colors duration-200 pointer-events-none" />
            <div className="absolute bottom-3 right-3 z-20 pointer-events-none">
                <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow-sm">
                    <ArrowRight className="w-3.5 h-3.5 text-[#1a1a1a]" />
                </div>
            </div>
            {isVideo ? (
                <video
                    src={proxyUrl(clip.file_url)}
                    poster={getPosterUrl(clip)}
                    className="w-full h-full object-cover"
                    muted playsInline preload="none"
                />
            ) : (
                <img
                    src={proxyUrl(clip.sample_url || clip.file_url)}
                    alt={clip.tags}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            )}
        </div>
    );
}

export function HeroSection({ clips = [] }: HeroSectionProps) {
    const marqueeClips = prepareMarquee(clips);

    return (
        <section className="relative bg-white overflow-hidden">

            {/* Watermark décoratif */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[22rem] font-bold text-gray-50 leading-none select-none pointer-events-none -z-10 pr-8 hidden xl:block">
                作画
            </div>

            {/* HERO */}
            <motion.div
                className="relative mx-auto max-w-[1500px] px-6 md:px-12 pt-32 pb-20 md:pt-40 md:pb-24"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">

                    {/* LEFT */}
                    <div>
                        <motion.p variants={itemVariants} className="text-xs font-bold uppercase tracking-[0.3em] text-[#c4b5fd] mb-8">
                            作画 — Sakuga Archive
                        </motion.p>

                        <div className="flex gap-6 items-start">
                            <motion.div
                                variants={itemVariants}
                                className="w-px bg-[#c4b5fd] self-stretch mt-2 hidden lg:block shrink-0"
                            />
                            <motion.h1
                                variants={itemVariants}
                                className="text-6xl md:text-7xl xl:text-[5.5rem] font-bold leading-[0.95] tracking-tight text-[#1a1a1a]"
                            >
                                The art of
                                <br />
                                animation
                                <br />
                                <span className="font-serif italic font-medium text-[#c4b5fd]">
                                    deserves better.
                                </span>
                            </motion.h1>
                        </div>

                        <motion.div variants={itemVariants} className="flex items-center gap-10 mt-12 pl-0 lg:pl-7">
                            <div>
                                <div className="text-2xl font-bold text-[#1a1a1a]">100k+</div>
                                <div className="text-[10px] text-gray-400 mt-1 tracking-[0.2em] uppercase">clips</div>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div>
                                <div className="text-2xl font-bold text-[#1a1a1a]">2k+</div>
                                <div className="text-[10px] text-gray-400 mt-1 tracking-[0.2em] uppercase">animateurs</div>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div>
                                <div className="text-2xl font-bold text-[#1a1a1a]">作画</div>
                                <div className="text-[10px] text-gray-400 mt-1 tracking-[0.2em] uppercase">sakuga</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:pb-2 flex flex-col justify-end">
                        <motion.p
                            variants={itemVariants}
                            className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4"
                        >
                            What is this
                        </motion.p>
                        <motion.p
                            variants={itemVariants}
                            className="text-lg text-gray-500 leading-relaxed max-w-md"
                        >
                            Sakugabooru has catalogued exceptional anime animation for years —
                            the cuts where an animator&apos;s hand becomes unmistakable.
                            The data is excellent. The interface was not. This is the fix.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex gap-3 mt-8">
                            <Link
                                href="/animations"
                                className="group h-12 px-7 rounded-full bg-[#1a1a1a] text-white text-sm font-medium flex items-center gap-2 hover:bg-black transition-all"
                            >
                                Explore clips

                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/about"
                                className="h-12 px-7 rounded-full border border-gray-200 text-sm font-medium text-gray-600 flex items-center hover:border-gray-400 hover:text-[#1a1a1a] transition-all"
                            >
                                About
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* MARQUEE */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative w-full overflow-hidden border-t border-gray-100 py-6"
            >
                <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                    }}
                />
                <div className="flex gap-4 px-4 w-max animate-marquee">
                    {marqueeClips.map((clip, index) => (
                        <Link key={`${clip.id}-${index}`} href={`/clips/${clip.id}`} className="block shrink-0">
                            <motion.div
                                whileHover={{ y: -6 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                onMouseEnter={(e) => {
                                    const video = e.currentTarget.querySelector('video');
                                    if (video) video.play().catch(() => {});
                                }}
                                onMouseLeave={(e) => {
                                    const video = e.currentTarget.querySelector('video');
                                    if (video) { video.pause(); video.currentTime = 0; }
                                }}
                            >
                                <MarqueeVideo clip={clip} />
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}