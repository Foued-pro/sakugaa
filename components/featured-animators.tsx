"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Sparkles, Video } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getArtistBestClip } from "@/app/actions";
import { motion } from "framer-motion"; // On importe la magie

const animators = [
    { id: "yutaka-nakamura", tag: "yutaka_nakamura", name: "Yutaka Nakamura", style: "Impact Frames, Cubes", count: 1320 },
    { id: "hiroyuki-imaishi", tag: "hiroyuki_imaishi", name: "Hiroyuki Imaishi", style: "Dynamic, Drill", count: 890 },
    { id: "megumi-ishitani", tag: "megumi_ishitani", name: "Megumi Ishitani", style: "Composition, Lighting", count: 45 },
    { id: "arifumi-imai", tag: "arifumi_imai", name: "Arifumi Imai", style: "3D Camera, Acrobatic", count: 210 }
];

const ArtistCard = ({ animator, index }: { animator: any, index: number }) => {
    const [media, setMedia] = useState<{ url: string, isVideo: boolean } | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const loadMedia = async () => {
            try { const data = await getArtistBestClip(animator.tag); if (data) setMedia(data); }
            catch (e) { console.error("Erreur media", animator.name); }
        };
        loadMedia();
    }, [animator.tag, animator.name]);

    return (
        <ScrollReveal delay={index * 0.1}>
            <Link href={`/artists/${animator.id}`} className="block w-full">
                <motion.div
                    className="group flex flex-col md:flex-row h-auto md:h-[280px] w-full overflow-hidden rounded-3xl bg-white border border-gray-100"

                    // 1. ANIMATION PHYSIQUE (Lévitation + Ombre)
                    whileHover={{
                        y: -8,
                        boxShadow: "0 25px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}

                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* GAUCHE : Média (Zoom Fluide) */}
                    <div className="w-full md:w-1/2 h-[220px] md:h-full relative overflow-hidden bg-gray-100">
                        {media ? (
                            <motion.div
                                className="w-full h-full"
                                // 2. ZOOM CINÉMATIQUE
                                animate={{ scale: isHovered ? 1.08 : 1 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                {media.isVideo ? (
                                    <video src={media.url} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                                ) : (
                                    <img src={media.url} alt={animator.name} className="w-full h-full object-cover" />
                                )}
                            </motion.div>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Sparkles className="w-6 h-6 text-gray-300 animate-pulse" />
                            </div>
                        )}

                        {/* Petit Overlay dégradé pour le style */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                    </div>

                    {/* DROITE : Infos (Intéractions) */}
                    <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center relative bg-white">
                        <div className="mb-auto">
                            {/* Badge Animé */}
                            <motion.span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 border border-gray-100"
                                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                            >
                                <Video className="w-3 h-3 text-[#c4b5fd]" />
                                Animator Spotlight
                            </motion.span>

                            <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-2 group-hover:text-[#c4b5fd] transition-colors duration-300">
                                {animator.name}
                            </h3>
                            <p className="text-gray-500 font-medium text-sm md:text-base">
                                Known for: <span className="text-[#1a1a1a]">{animator.style}</span>
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100">
                            <span className="text-sm font-semibold text-gray-400 group-hover:text-gray-600 transition-colors">
                                {animator.count} clips archived
                            </span>

                            {/* 3. BOUTON MAGNÉTIQUE */}
                            <motion.div
                                className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white"
                                animate={{
                                    rotate: isHovered ? 0 : -45,
                                    scale: isHovered ? 1.1 : 1,
                                    backgroundColor: isHovered ? "#c4b5fd" : "#1a1a1a"
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </ScrollReveal>
    );
};

export function FeaturedAnimators() {
    return (
        <section className="py-24 relative bg-dot-pattern">
            <div className="max-w-[1500px] mx-auto px-6 md:px-12">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[#c4b5fd] font-bold text-xs uppercase tracking-widest">Featured Artists</span>
                        <h2 className="text-4xl font-bold mt-2 text-[#1a1a1a]">Meet the masters</h2>
                    </div>

                    {/* BOUTON "BROWSE ALL" STYLISÉ */}
                    <Link href="/artists">
                        <motion.div
                            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-gray-600 cursor-pointer"
                            whileHover={{
                                y: -2,
                                scale: 1.02,
                                borderColor: "#d1d5db",
                                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
                            }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        >
                            Browse all artists
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
                        </motion.div>
                    </Link>
                </div>

                {/* ... (La grille reste identique) ... */}
                {/* Rappel du code pour éviter les erreurs de copier-coller */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
                    {/* ... map animators ... */}
                    {animators.map((animator, i) => (
                        <ArtistCard key={animator.id} animator={animator} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}