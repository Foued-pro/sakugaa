/**
 * Script de préchauffage du cache.
 * Fetch les previews des clips affichés sur la home page
 * pour pré-remplir le cache CDN Cloudflare.
 *
 * Usage: node scripts/warm-cache.js
 * Lancer après chaque déploiement ou via un cron.
 */

const SITE_URL = process.env.SITE_URL || 'https://sakugaa.com';

async function warmCache() {
    console.log('🔥 Préchauffage du cache...\n');

    // Fetch les mêmes clips que la home page
    const endpoints = [
        'https://www.sakugabooru.com/post.json?limit=10&page=1&tags=order:score',
        'https://www.sakugabooru.com/post.json?limit=20&page=1&tags=order:score',
    ];

    let allClips = [];

    for (const url of endpoints) {
        try {
            const res = await fetch(url);
            if (res.ok) {
                const clips = await res.json();
                allClips.push(...clips);
            }
        } catch (e) {
            console.error(`Erreur fetch ${url}:`, e.message);
        }
    }

    // Déduplique par ID
    const seen = new Set();
    const uniqueClips = allClips.filter(clip => {
        if (seen.has(clip.id)) return false;
        seen.add(clip.id);
        return true;
    });

    console.log(`📦 ${uniqueClips.length} clips uniques trouvés\n`);

    // Collecte toutes les URLs preview/sample à préchauffer
    const urlsToWarm = [];

    for (const clip of uniqueClips) {
        if (clip.preview_url) {
            const path = clip.preview_url.replace(/https?:\/\/(?:www\.)?sakugabooru\.com\/data\//, '');
            if (path.startsWith('preview/') || path.startsWith('sample/')) {
                urlsToWarm.push(`${SITE_URL}/api/proxy/${path}`);
            }
        }
        if (clip.sample_url) {
            const path = clip.sample_url.replace(/https?:\/\/(?:www\.)?sakugabooru\.com\/data\//, '');
            if (path.startsWith('preview/') || path.startsWith('sample/')) {
                urlsToWarm.push(`${SITE_URL}/api/proxy/${path}`);
            }
        }
    }

    console.log(`🌐 ${urlsToWarm.length} URLs à préchauffer\n`);

    // Fetch en parallèle par batches de 5
    const BATCH_SIZE = 5;
    let success = 0;
    let failed = 0;

    for (let i = 0; i < urlsToWarm.length; i += BATCH_SIZE) {
        const batch = urlsToWarm.slice(i, i + BATCH_SIZE);

        const results = await Promise.allSettled(
            batch.map(url =>
                fetch(url).then(res => {
                    if (res.ok) {
                        success++;
                        console.log(`  ✅ ${url.split('/proxy/')[1]}`);
                    } else {
                        failed++;
                        console.log(`  ❌ ${res.status} - ${url.split('/proxy/')[1]}`);
                    }
                })
            )
        );
    }

    console.log(`\n🏁 Terminé: ${success} cached, ${failed} erreurs`);
}

warmCache().catch(console.error);