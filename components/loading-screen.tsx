"use client";

import { motion } from "framer-motion";

// Constantes hors du composant
const BLOB_ANIMATION = {
    scale: [1, 1.2, 1],
    opacity: [0.5, 0.8, 0.5],
};

const BLOB_TRANSITION = {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
};

export function LoadingScreen() {
    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#FAFAF9] z-[9999] flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Blobs flous en arrière-plan (comme ta hero) */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div
                    animate={BLOB_ANIMATION}
                    transition={BLOB_TRANSITION}
                    className="absolute top-1/3 left-1/3 w-64 h-64 bg-[#ede9fe] rounded-full blur-[100px]"
                />
                <motion.div
                    animate={BLOB_ANIMATION}
                    transition={{ ...BLOB_TRANSITION, delay: 0.5 }}
                    className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-[#fce7f3] rounded-full blur-[100px]"
                />
            </div>

            {/* Logo central */}
            <div className="relative z-10 flex flex-col items-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="text-5xl font-bold tracking-tight text-[#1a1a1a]"
                >
                    Sakug<span className="font-serif italic text-[#c4b5fd]">aa</span>
                </motion.h1>

                {/* Barre de chargement animée */}
                <div className="mt-8 w-48 h-[2px] bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="h-full w-1/2 bg-gradient-to-r from-transparent via-[#c4b5fd] to-transparent"
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 text-xs uppercase tracking-[0.2em] text-gray-400 font-medium"
                >
                    Loading
                </motion.p>
            </div>
        </motion.div>
    );
}