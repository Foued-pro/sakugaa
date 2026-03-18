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
    const heroRes = await fetch(
        'https://www.sakugabooru.com/post.json?limit=10&page=1&tags=order:score',
        { next: { revalidate: 60 } }
    );

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        .toISOString().split('T')[0];

    const trendingRes = await fetch(
        `https://www.sakugabooru.com/post.json?limit=20&page=1&tags=order:score+date:>=${weekAgo}+production_materials`,
        { next: { revalidate: 300 } }
    );

    let trendingClips = trendingRes.ok ? await trendingRes.json() : [];

    trendingClips = trendingClips
        .filter((clip: any) => ['mp4', 'webm'].includes(clip.file_ext))
        .slice(0, 6);

    const heroClips = heroRes.ok ? await heroRes.json() : [];

    if (trendingClips.length < 3) {
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
          .toISOString().split('T')[0];

      const fallbackRes = await fetch(
          `https://www.sakugabooru.com/post.json?limit=6&page=1&tags=order:score+date:>=${monthAgo}`,
          { next: { revalidate: 300 } }
      );

      trendingClips = fallbackRes.ok ? await fallbackRes.json() : trendingClips;
    }

    return { heroClips, trendingClips };
  } catch (error) {
    console.error("Erreur fetch clips:", error);
    return { heroClips: [], trendingClips: [] };
  }
}

async function getAnimatorsWithMedia() {
  const results = await Promise.all(
      animators.map(async (animator) => {
        try {
          const query = `${animator.tag} -production_materials order:score`;
          const res = await fetch(
              `https://www.sakugabooru.com/post.json?limit=1&page=1&tags=${encodeURIComponent(query)}`,
              { next: { revalidate: 300 } }
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