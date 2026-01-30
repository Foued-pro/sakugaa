// components/home-client.tsx
import {HeroSection} from "@/components/hero-section";
import {TrendingSection} from "@/components/trending-section";
import {FeaturedAnimators} from "@/components/featured-animators";

interface HomeClientProps {
    initialClips: any[];
    animators: any[];
}

export function HomeClient({ initialClips, animators }: HomeClientProps) {
    // ...
    return (
        <main>
            <HeroSection clips={initialClips} />
            <TrendingSection clips={initialClips} />
            <FeaturedAnimators animators={animators} />
        </main>
    );
}