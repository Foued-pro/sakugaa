"use client";

import { HeroSection } from "@/components/hero-section";
import { TrendingSection } from "@/components/trending-section";
import { FeaturedAnimators } from "@/components/featured-animators";
import { WhatIsSakuga } from "@/components/what-is-sakuga";

interface HomeClientProps {
    heroClips: any[];
    trendingClips: any[];
    animators: any[];
}

export function HomeClient({ heroClips, trendingClips, animators }: HomeClientProps) {
    return (
        <main>
            <HeroSection clips={heroClips} />
            <TrendingSection clips={trendingClips} />
            <FeaturedAnimators animators={animators} />
        </main>
    );
}