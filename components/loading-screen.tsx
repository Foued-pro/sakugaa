"use client";

import { motion } from "framer-motion";

export function LoadingScreen() {
    return (
        <motion.div
            // exit={{ opacity: 0 }} permet au loader de disparaître en douceur
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-[#FAFAF9] z-[9999] flex flex-col items-center justify-center"
        >
            <div className="relative">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: 180 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 bg-[#ede9fe] rounded-2xl"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], rotate: -180 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="absolute top-0 left-0 w-16 h-16 border-2 border-[#c4b5fd] rounded-2xl"
                />
            </div>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 text-sm uppercase tracking-widest text-gray-400 font-medium"
            >
                Loading Sakugaa
            </motion.p>
        </motion.div>
    );
}