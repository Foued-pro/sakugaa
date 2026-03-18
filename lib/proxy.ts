/**
 * Convertit une URL sakugabooru en URL proxy locale.
 * https://www.sakugabooru.com/data/preview/xxx.jpg → /api/proxy/preview/xxx.jpg
 * https://www.sakugabooru.com/data/sample/xxx.jpg → /api/proxy/sample/xxx.jpg
 *
 * Les fichiers vidéo (file_url) ne sont PAS proxifiés — ils sont trop lourds
 * et se chargent au clic/hover, pas au page load.
 */
export function proxyUrl(url: string | undefined | null): string {
    if (!url) return '';

    // Force HTTPS
    const secure = url.replace('http:', 'https:');

    // Ne proxy que les chemins /data/preview/ et /data/sample/
    const match = secure.match(
        /https?:\/\/(?:www\.)?sakugabooru\.com\/data\/((?:preview|sample)\/.+)$/
    );

    if (match) {
        return `/api/proxy/${match[1]}`;
    }

    // Pour tout le reste (vidéos, URLs inconnues), retourne l'URL HTTPS telle quelle
    return secure;
}

/**
 * Retourne l'URL du poster pour un clip vidéo.
 * Utilise preview_url en passant par le proxy.
 */
export function getPosterUrl(clip: { preview_url?: string; sample_url?: string }): string {
    return proxyUrl(clip.preview_url || clip.sample_url);
}

/**
 * Retourne l'URL sécurisée d'une image (sample ou preview).
 * Passe par le proxy pour bénéficier du cache CDN.
 */
export function getImageUrl(clip: { sample_url?: string; preview_url?: string; file_url?: string }, isVideo: boolean): string {
    if (isVideo) {
        // Pour les vidéos, retourne le file_url direct (pas de proxy pour les .mp4)
        return clip.file_url?.replace('http:', 'https:') || '';
    }
    // Pour les images, proxy le sample ou le file_url
    return proxyUrl(clip.sample_url || clip.file_url);
}