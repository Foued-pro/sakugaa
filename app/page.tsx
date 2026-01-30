const runtime = 'edge';
import { HomeClient } from "@/components/home-client";

async function getClips() {
  try {
    const res = await fetch(
        'https://www.sakugabooru.com/post.json?limit=20&page=1&tags=production_materials',
        { next: { revalidate: 60 } }
    );
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Erreur fetch clips:", error);
    return [];
  }
}

export default async function Home() {
  const clips = await getClips();
  return <HomeClient initialClips={clips} />;
}