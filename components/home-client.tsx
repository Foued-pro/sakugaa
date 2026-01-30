"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion"; // Important pour le fade-out
import { HeroSection } from "@/components/hero-section";
import { TrendingSection } from "@/components/trending-section";
import { FeaturedAnimators } from "@/components/featured-animators";
import { CommunityCTA } from "@/components/community-cta";
import { LoadingScreen } from "@/components/loading-screen";

interface HomeClientProps {
    initialClips: any[];
}

export function HomeClient({ initialClips }: HomeClientProps) {
    const [loading, setLoading] = useState(true);

    // Les clips sont déjà là grâce au serveur !
    const [clips] = useState(initialClips);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800); // 0.8s d'intro
        return () => clearTimeout(timer);
    }, []);

    const heroClips = clips.slice(0, 6);
    const trendingClips = clips.slice(6, 12);

    return (
        <>
            {/* 1. LE LOADER EN SURIMPRESSION (Overlay) */}
            <AnimatePresence mode="wait">
                {loading && <LoadingScreen />}
            </AnimatePresence>

            {/* 2. LE SITE EST DEJA LA (Mais caché derrière au début) */}
            {/* On retire PageTransition ici car il ajoute un délai d'opacité qui tue le LCP */}
            <main className="min-h-screen pt-16">
                <section id="clips">
                    <HeroSection clips={heroClips} />
                </section>

                <section id="trending">
                    <TrendingSection clips={trendingClips} />
                </section>

                <section id="artists">
                    <FeaturedAnimators />
                </section>

                <section id="community">
                    <CommunityCTA />
                </section>
            </main>
        </>
    );
}