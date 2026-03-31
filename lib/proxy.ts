/**
 * Convertit une URL sakugabooru en URL proxy locale.
 * https://www.sakugabooru.com/data/preview/xxx.jpg  → /api/proxy/preview/xxx.jpg
 * https://www.sakugabooru.com/data/sample/xxx.jpg   → /api/proxy/sample/xxx.jpg
 * https://www.sakugabooru.com/data/posts/xxx.mp4    → /api/proxy/posts/xxx.mp4
 */
export function proxyUrl(url: string | undefined | null): string {
    if (!url) return '';

    const secure = url.replace('http:', 'https:');

    const match = secure.match(
        /https?:\/\/(?:www\.)?sakugabooru\.com\/data\/(.+)$/
    );
    if (match) {
        return `/api/proxy/${match[1]}`;
    }

    return secure;
}

/**
 * Retourne l'URL du poster pour un clip vidéo.
 */
export function getPosterUrl(clip: { preview_url?: string; sample_url?: string }): string {
    return proxyUrl(clip.preview_url || clip.sample_url);
}

/**
 * Retourne l'URL sécurisée d'une image ou vidéo.
 * Tout passe par le proxy.
 */
export function getImageUrl(
    clip: { sample_url?: string; preview_url?: string; file_url?: string },
    isVideo: boolean
): string {
    if (isVideo) {
        return proxyUrl(clip.file_url);
    }
    return proxyUrl(clip.sample_url || clip.file_url);
}