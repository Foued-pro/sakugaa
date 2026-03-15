"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, stiffness: 80, damping: 20 },
    },
};

const socialProviders = [
    {
        name: "Google",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
        ),
    },
    {
        name: "Discord",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#5865F2">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" />
            </svg>
        ),
    },
    {
        name: "GitHub",
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
    },
];

export default function AuthPage() {
    const [mode, setMode] = useState("login");
    const isLogin = mode === "login";

    return (
        <div className="min-h-[100dvh] bg-[#FAFAF9] flex flex-col relative overflow-hidden">
            {/* Background blobs — plus petits sur mobile pour la perf */}
            <motion.div
                animate={{ scale: [1, 1.15, 1], x: [0, 25, 0], y: [0, -15, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[5%] -left-[20%] md:left-[5%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#ede9fe] rounded-full blur-[100px] md:blur-[140px] opacity-40 pointer-events-none"
            />
            <motion.div
                animate={{ scale: [1.1, 1, 1.1], x: [0, -20, 0], y: [0, 25, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[5%] -right-[20%] md:right-[5%] w-[280px] md:w-[450px] h-[280px] md:h-[450px] bg-[#fce7f3] rounded-full blur-[100px] md:blur-[140px] opacity-40 pointer-events-none"
            />

            {/* Dot grid — desktop only */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none hidden md:block"
                style={{
                    backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
                    backgroundSize: "32px 32px",
                }}
            />

            {/*
        Mobile  → bottom-sheet : card collé en bas, fond visible en haut
        Desktop → centré classique
      */}
            <div className="flex-1 flex flex-col md:items-center md:justify-center px-0 md:px-4">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full md:max-w-[420px] mt-auto md:mt-0"
                >
                    <div className="relative bg-white/80 md:bg-white/70 backdrop-blur-2xl rounded-t-[28px] md:rounded-3xl border-t border-x md:border border-white/80 md:shadow-[0_8px_64px_rgba(196,181,253,0.12)] px-5 sm:px-6 pt-7 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:p-10">

                        {/* Drag indicator mobile */}
                        <div className="w-10 h-1 rounded-full bg-gray-300/60 mx-auto mb-5 md:hidden" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={mode}
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                            >
                                {/* Branding */}
                                <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-5 md:mb-8">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                                        className="w-2.5 h-2.5 bg-[#c4b5fd] rounded-sm"
                                    />
                                    <span className="text-xl font-bold text-[#1a1a1a] tracking-tight">
                    Sakug<span className="font-serif italic text-[#c4b5fd]">aa</span>
                  </span>
                                </motion.div>

                                {/* Heading */}
                                <motion.div variants={itemVariants} className="text-center mb-5 md:mb-8">
                                    <h1 className="text-[22px] md:text-2xl font-bold text-[#1a1a1a] tracking-tight mb-1">
                                        {isLogin ? "Welcome back" : "Create an account"}
                                    </h1>
                                    <p className="text-[13px] md:text-sm text-[#999]">
                                        {isLogin ? "Sign in to your account" : "Join the sakuga community"}
                                    </p>
                                </motion.div>

                                {/* Social — touch targets 48px mobile */}
                                <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2.5 md:gap-3 mb-5 md:mb-6">
                                    {socialProviders.map((provider) => (
                                        <button
                                            key={provider.name}
                                            className="h-12 md:h-11 rounded-xl border border-gray-200/80 bg-white/60 hover:bg-white hover:border-gray-300 active:scale-[0.96] md:active:scale-100 transition-all duration-200 flex items-center justify-center md:hover:-translate-y-0.5 md:hover:shadow-sm"
                                            title={`Continue with ${provider.name}`}
                                        >
                                            {provider.icon}
                                        </button>
                                    ))}
                                </motion.div>

                                {/* Divider */}
                                <motion.div variants={itemVariants} className="flex items-center gap-3 md:gap-4 mb-5 md:mb-6">
                                    <div className="flex-1 h-px bg-gray-200/80" />
                                    <span className="text-[10px] md:text-[11px] uppercase tracking-[0.12em] md:tracking-[0.15em] text-[#bbb] font-medium whitespace-nowrap">
                    or with email
                  </span>
                                    <div className="flex-1 h-px bg-gray-200/80" />
                                </motion.div>

                                {/* Fields — h-12 + text-[16px] sur mobile = pas de zoom iOS */}
                                <div className="space-y-2.5 md:space-y-3">
                                    {!isLogin && (
                                        <motion.div variants={itemVariants}>
                                            <label className="block text-[11px] uppercase tracking-[0.1em] text-[#999] font-medium mb-1.5 ml-1">
                                                Username
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="sakuga_fan"
                                                autoCapitalize="none"
                                                autoCorrect="off"
                                                spellCheck="false"
                                                className="w-full h-12 md:h-11 px-4 rounded-xl border border-gray-200/80 bg-white/60 text-[16px] md:text-sm text-[#1a1a1a] placeholder:text-[#ccc] focus:outline-none focus:border-[#c4b5fd] focus:ring-2 focus:ring-[#c4b5fd]/10 transition-all duration-200"
                                            />
                                        </motion.div>
                                    )}

                                    <motion.div variants={itemVariants}>
                                        <label className="block text-[11px] uppercase tracking-[0.1em] text-[#999] font-medium mb-1.5 ml-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="you@example.com"
                                            autoCapitalize="none"
                                            autoCorrect="off"
                                            spellCheck="false"
                                            className="w-full h-12 md:h-11 px-4 rounded-xl border border-gray-200/80 bg-white/60 text-[16px] md:text-sm text-[#1a1a1a] placeholder:text-[#ccc] focus:outline-none focus:border-[#c4b5fd] focus:ring-2 focus:ring-[#c4b5fd]/10 transition-all duration-200"
                                        />
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <label className="block text-[11px] uppercase tracking-[0.1em] text-[#999] font-medium ml-1">
                                                Password
                                            </label>
                                            {isLogin && (
                                                <button className="text-[11px] text-[#c4b5fd] hover:text-[#a78bfa] font-medium transition-colors active:opacity-70">
                                                    Forgot?
                                                </button>
                                            )}
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            className="w-full h-12 md:h-11 px-4 rounded-xl border border-gray-200/80 bg-white/60 text-[16px] md:text-sm text-[#1a1a1a] placeholder:text-[#ccc] focus:outline-none focus:border-[#c4b5fd] focus:ring-2 focus:ring-[#c4b5fd]/10 transition-all duration-200"
                                        />
                                    </motion.div>

                                    {!isLogin && (
                                        <motion.div variants={itemVariants}>
                                            <label className="block text-[11px] uppercase tracking-[0.1em] text-[#999] font-medium mb-1.5 ml-1">
                                                Confirm password
                                            </label>
                                            <input
                                                type="password"
                                                placeholder="••••••••"
                                                className="w-full h-12 md:h-11 px-4 rounded-xl border border-gray-200/80 bg-white/60 text-[16px] md:text-sm text-[#1a1a1a] placeholder:text-[#ccc] focus:outline-none focus:border-[#c4b5fd] focus:ring-2 focus:ring-[#c4b5fd]/10 transition-all duration-200"
                                            />
                                        </motion.div>
                                    )}
                                </div>

                                {/* Submit — gros touch target */}
                                <motion.div variants={itemVariants} className="mt-5 md:mt-6">
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        className="w-full h-[52px] md:h-12 rounded-xl bg-[#1a1a1a] text-white text-[15px] md:text-sm font-semibold tracking-wide shadow-lg active:bg-black md:hover:bg-black transition-colors duration-200 relative overflow-hidden group"
                                    >
                    <span className="relative z-10">
                      {isLogin ? "Sign in" : "Create account"}
                    </span>
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    </motion.button>
                                </motion.div>

                                {/* Toggle */}
                                <motion.p variants={itemVariants} className="text-center text-[13px] md:text-sm text-[#999] mt-5 md:mt-6">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                    <button
                                        onClick={() => setMode(isLogin ? "register" : "login")}
                                        className="text-[#1a1a1a] font-semibold hover:text-[#c4b5fd] transition-colors duration-200"
                                    >
                                        {isLogin ? "Sign up" : "Sign in"}
                                    </button>
                                </motion.p>

                                {/* Terms — mobile only (inside card) */}
                                <motion.p variants={itemVariants} className="text-center text-[11px] text-[#ccc] mt-4 md:hidden">
                                    By continuing, you agree to our{" "}
                                    <a href="#" className="underline">Terms</a> &{" "}
                                    <a href="#" className="underline">Privacy</a>
                                </motion.p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Terms — desktop only (below card) */}
                    <p className="hidden md:block text-center text-[11px] text-[#ccc] mt-6">
                        By continuing, you agree to our{" "}
                        <a href="#" className="underline hover:text-[#999] transition-colors">Terms</a> &{" "}
                        <a href="#" className="underline hover:text-[#999] transition-colors">Privacy</a>
                    </p>
                </motion.div>
            </div>
        </div>
    );
}