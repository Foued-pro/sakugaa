export const runtime = 'edge';

import { HomeClient } from "@/components/home-client";

const animators = [
  { id: "yutaka-nakamura", tag: "yutaka_nakamura", name: "Yutaka Nakamura", style: "Impact Frames, Cubes", count: 1320 },
  { id: "hiroyuki-imaishi", tag: "hiroyuki_imaishi", name: "Hiroyuki Imaishi", style: "Dynamic, Drill", count: 890 },
  { id: "megumi-ishitani", tag: "megumi_ishitani", name: "Megumi Ishitani", style: "Composition, Lighting", count: 45 },
  { id: "arifumi-imai", tag: "arifumi_imai", name: "Arifumi Imai", style: "3D Camera, Acrobatic", count: 210 }
];

async function getClips() {
  try {
    // Pour le Hero marquee
    const heroRes = await fetch(
        'https://www.sakugabooru.com/post.json?limit=10&page=1&tags=production_materials',
        { next: { revalidate: 60 } }
    );

    // Pour Trending (les mieux notés)
    const trendingRes = await fetch(
        'https://www.sakugabooru.com/post.json?limit=6&page=1&tags=order:score',
        { next: { revalidate: 60 } }
    );

    const heroClips = heroRes.ok ? await heroRes.json() : [];
    const trendingClips = trendingRes.ok ? await trendingRes.json() : [];

    return { heroClips, trendingClips };
  } catch (error) {
    console.error("Erreur fetch clips:", error);
    return { heroClips: [], trendingClips: [] };
  }
}

async function getAnimatorsWithMedia() {
  // Fetch tous les artistes en parallèle
  const results = await Promise.all(
      animators.map(async (animator) => {
        try {
          const query = `${animator.tag} -production_materials order:score`;
          const res = await fetch(
              `https://www.sakugabooru.com/post.json?limit=1&page=1&tags=${encodeURIComponent(query)}`,
              { next: { revalidate: 300 } } // Cache 5 min pour les artistes
          );

          if (!res.ok) return { ...animator, media: null };

          const clips = await res.json();

          if (clips && clips.length > 0) {
            const clip = clips[0];
            return {
              ...animator,
              media: {
                url: clip.file_url || clip.sample_url,
                isVideo: clip.file_ext === 'mp4' || clip.file_ext === 'webm'
              }
            };
          }
        } catch (e) {
          console.error(`Erreur pour ${animator.name}:`, e);
        }
        return { ...animator, media: null };
      })
  );

  return results;
}

export default async function Home() {
  const [{ heroClips, trendingClips }, animatorsWithMedia] = await Promise.all([
    getClips(),
    getAnimatorsWithMedia()
  ]);

  return <HomeClient heroClips={heroClips} trendingClips={trendingClips} animators={animatorsWithMedia} />;
}