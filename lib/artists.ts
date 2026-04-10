import artistsData from '@/data/all_artists.json';

const artistNames = new Set(
    (artistsData as { name: string }[]).map(a => a.name.toLowerCase().replace(/ /g, '_'))
);

export function extractAnimator(tags: string): string {
    if (!tags) return '';
    const found = tags.split(' ').find(t => artistNames.has(t.toLowerCase()));
    return found ? found.replace(/_/g, ' ') : '';
}