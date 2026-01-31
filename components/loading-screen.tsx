"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#FAFAF9] z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Blobs animés en arrière-plan */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 30, 0],
                        y: [0, -20, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ede9fe] rounded-full blur-[120px] opacity-60"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        x: [0, -20, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#fce7f3] rounded-full blur-[120px] opacity-60"
                />
            </div>

            {/* Contenu central */}
            <div className="relative z-10 flex flex-col items-center">

                {/* Logo animé */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-2 mb-12"
                >
                    {/* Petit carré violet comme dans ta navbar */}
                    <motion.div
                        animate={{ rotate: [0, 90, 180, 270, 360] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="w-3 h-3 bg-[#c4b5fd] rounded-sm"
                    />
                    <span className="text-2xl font-bold text-[#1a1a1a] tracking-tight">
                        Sakug<span className="font-serif italic text-[#c4b5fd]">aa</span>
                    </span>
                </motion.div>

                {/* Animation de chargement - 3 clips qui apparaissent */}
                <div className="flex gap-3 mb-10">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                duration: 0.5,
                                delay: 0.2 + i * 0.15,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="relative"
                        >
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut"
                                }}
                                className="w-20 h-14 rounded-xl bg-white border border-gray-100 shadow-sm overflow-hidden"
                            >
                                {/* Shimmer effect */}
                                <motion.div
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ede9fe]/30 to-transparent"
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Barre de progression */}
                <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#c4b5fd] to-transparent rounded-full"
                    />
                </div>

                {/* Texte de chargement */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium"
                >
                    Loading clips
                </motion.p>
            </div>
        </motion.div>
    );
}