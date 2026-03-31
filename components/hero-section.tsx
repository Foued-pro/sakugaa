"use client";

import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";
import { MorphingBlob } from "@/components/morphing-shapes";
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
        transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 50, damping: 20 }
    },
};

function MarqueeVideo({ clip }: { clip: any }) {
    const cardRef = useRef<HTMLDivElement>(null);

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
            { threshold: 0.3 }
        );

        observer.observe(card);
        return () => observer.disconnect();
    }, []);

    const isVideo = clip.file_url?.match(/\.(mp4|webm|mov)$/);

    return (
        <div
            ref={cardRef}
            className="group relative w-[300px] md:w-[600px] aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-100"
        >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 z-10 transition-colors duration-200 ease-out pointer-events-none" />
            <div className="absolute bottom-5 right-5 z-20 pointer-events-none">
                <div className="w-14 h-14 rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-center
                        opacity-0 translate-y-2 scale-75
                        group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                        transition-all duration-200 ease-out">
                    <ArrowRight className="w-6 h-6 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-200" />
                </div>
            </div>
            {isVideo ? (
                <video
                    src={proxyUrl(clip.file_url)}
                    poster={getPosterUrl(clip)}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                    muted loop playsInline
                    preload="none"
                />
            ) : (
                <img
                    src={proxyUrl(clip.sample_url || clip.file_url)}
                    alt={clip.tags}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
            )}
        </div>
    );
}

export function HeroSection({ clips = [] }: HeroSectionProps) {
    const marqueeClips = prepareMarquee(clips);

    return (
        <section className="relative overflow-hidden pt-20 pb-10 md:pt-32 md:pb-16">

            {/* Fond Blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <MorphingBlob color="#ede9fe" size={600} className="absolute -top-[20%] -left-[10%] opacity-50 blur-[80px]" />
                <MorphingBlob color="#fce7f3" size={500} className="absolute top-[20%] -right-[10%] opacity-50 blur-[80px]" duration={10} />
            </div>

            {/* CONTENU TEXTE */}
            <motion.div
                className="relative mx-auto max-w-7xl px-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="text-center max-w-4xl mx-auto mb-12">

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-foreground mb-6">
                        Discover the finest
                        <span className="font-serif italic text-[#c4b5fd] block mt-2 relative">
                           animation moments
                           <motion.svg className="absolute w-full h-3 -bottom-1 left-0 text-[#c4b5fd]/30 -z-10" viewBox="0 0 100 10" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1 }}>
                             <path d="M0 5 Q 50 10 100 5" fill="transparent" stroke="currentColor" strokeWidth="2" />
                           </motion.svg>
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                        Explore thousands of curated anime clips, celebrate talented animators,
                        and join a community that appreciates the art of sakuga.
                    </motion.p>

                    <motion.div variants={itemVariants}>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link href="/animations" className="group h-12 px-8 rounded-full bg-[#1a1a1a] text-white font-medium flex items-center gap-2 hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 duration-200">
                                Start Exploring <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link href="/about" className="h-12 px-8 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm text-[#1a1a1a] font-medium flex items-center gap-2 hover:bg-white transition-all hover:-translate-y-1 duration-200">
                                <Play className="w-4 h-4" /> About
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* --- MARQUEE INFINI --- */}
            <div className="relative w-full overflow-hidden mt-16 py-6 bg-white/50 backdrop-blur-sm border-y border-gray-100/50 group/marquee">

                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="animate-marquee gap-8 px-4 group-hover/marquee:[animation-play-state:paused]">
                    {marqueeClips.map((clip, index) => {
                        const key = `${clip.id}-${index}`;

                        return (
                            <Link key={key} href={`/clips/${clip.id}`} className="block relative shrink-0">
                                <motion.div
                                    whileHover={{
                                        y: -8,
                                        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
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
                        );
                    })}
                </div>
            </div>
        </section>
    );
}