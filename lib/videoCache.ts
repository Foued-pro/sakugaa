export const videoCache = new Map<number, string>();
const preloadQueue: (() => Promise<void>)[] = [];
let activePreloads = 0;

function runQueue() {
    if (preloadQueue.length === 0 || activePreloads >= 2) return;
    const task = preloadQueue.shift()!;
    activePreloads++;
    task().finally(() => {
        activePreloads--;
        setTimeout(runQueue, 100);
    });
    runQueue();
}
export function enqueuePreload(clipId: number, url: string) {
    if (videoCache.has(clipId)) return;
    videoCache.set(clipId, '');
    preloadQueue.push(async () => {
        try {
            const res = await fetch(url, {
                headers: { 'Range': 'bytes=0-524287' },
                mode: 'cors'
            });
            await res.blob();
            videoCache.set(clipId, url);
        } catch {
            videoCache.delete(clipId);
        }
    });
    runQueue();
}

export function clearCache() {
    videoCache.clear();
    preloadQueue.length = 0;
}