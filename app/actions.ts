"use server";

export async function getArtistBestClip(tag: string) {
    const query = `${tag} -production_materials order:score`;

    try {
        const url = `https://www.sakugabooru.com/post.json?limit=1&page=1&tags=${encodeURIComponent(query)}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return null;
        const clips = await res.json();
        if (clips && clips.length > 0) {
            const clip = clips[0];
            const isVideo = clip.file_ext === 'mp4' || clip.file_ext === 'webm';

            return {
                url: clip.file_url || clip.sample_url,
                isVideo: isVideo,
                width: clip.width,
                height: clip.height
            };
        }
    } catch (error) {
        console.error(`Erreur pour ${tag}:`, error);
    }

    return null;
}