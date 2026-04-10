"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { motion } from "framer-motion";
import { proxyUrl } from "@/lib/proxy";

interface Animator {
    id: string;
    tag: string;
    name: string;
    style: string;
    count: number;
    media: { url: string; previewUrl?: string; isVideo: boolean } | null;
}

interface FeaturedAnimatorsProps {
    animators: Animator[];
}

const ArtistCard = ({ animator, index }: { animator: Animator, index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ScrollReveal delay={index * 0.1}>
            <Link href={`/artists/${animator.id}`} className="block w-full">
                <motion.div
                    className="group flex flex-col md:flex-row h-auto md:h-[260px] w-full overflow-hidden rounded-2xl bg-white border border-gray-100"
                    whileHover={{ y: -6, borderColor: '#e5e7eb' }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Media */}
                    <div className="w-full md:w-2/5 h-[200px] md:h-full relative overflow-hidden bg-gray-100 shrink-0">
                        {animator.media ? (
                            <motion.div
                                className="w-full h-full"
                                animate={{ scale: isHovered ? 1.06 : 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                {animator.media.isVideo ? (
                                    <video
                                        src={proxyUrl(animator.media.url)}
                                        poster={proxyUrl(animator.media.previewUrl)}
                                        className="w-full h-full object-cover"
                                        autoPlay muted loop playsInline
                                    />
                                ) : (
                                    <img
                                        src={proxyUrl(animator.media.url)}
                                        alt={animator.name}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </motion.div>
                        ) : (
                            <div className="w-full h-full bg-gray-50" />
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4b5fd] mb-3">
                                Animator Spotlight
                            </p>
                            <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] leading-tight group-hover:text-[#c4b5fd] transition-colors duration-300">
                                {animator.name}
                            </h3>
                            <p className="text-sm text-gray-400 mt-2">
                                {animator.style}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-6">
                            <div>
                                <div className="text-xl font-bold text-[#1a1a1a]">{animator.count}</div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-0.5">clips archived</div>
                            </div>
                            <motion.div
                                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                                animate={{
                                    backgroundColor: isHovered ? "#c4b5fd" : "#1a1a1a",
                                    rotate: isHovered ? 0 : -45,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </ScrollReveal>
    );
};

export function FeaturedAnimators({ animators }: FeaturedAnimatorsProps) {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="max-w-[1500px] mx-auto px-6 md:px-12">

                <div className="flex justify-between items-end mb-16">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#c4b5fd]">
                            Featured Artists
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-3 text-[#1a1a1a] leading-tight tracking-tight">
                            The artists
                            <br />
                            <span className="font-serif italic font-medium text-gray-300">behind the craft.</span>
                        </h2>
                    </div>
                    <Link
                        href="/artists"
                        className="group flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#1a1a1a] transition-colors"
                    >
                        Browse all
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {animators.map((animator, i) => (
                        <ArtistCard key={animator.id} animator={animator} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}