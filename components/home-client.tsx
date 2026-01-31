"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/loading-screen";
import {HeroSection} from "@/components/hero-section";
import {TrendingSection} from "@/components/trending-section";
import {FeaturedAnimators} from "@/components/featured-animators";

interface HomeClientProps {
    heroClips: any[];
    trendingClips: any[];
    animators: any[];
}
export function HomeClient({ heroClips, trendingClips, animators }: HomeClientProps) {
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        // Affiche le loading pendant minimum 1.5 secondes pour le style
        const timer = setTimeout(() => {
            setShowLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <AnimatePresence>
                {showLoading && <LoadingScreen />}
            </AnimatePresence>

            <main className={showLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
                <HeroSection clips={heroClips} />
                <TrendingSection clips={trendingClips} />
                <FeaturedAnimators animators={animators} />
            </main>
        </>
    );
}