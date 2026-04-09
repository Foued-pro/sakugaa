export const videoCache = new Map<number, string>();
const preloadQueue: (() => Promise<void>)[] = [];
let activePreloads = 0;

function runQueue() {
    while (preloadQueue.length > 0 && activePreloads < 1) {
        const task = preloadQueue.shift()!;
        activePreloads++;
        task().finally(() => { activePreloads--; runQueue(); });
    }
}

export function enqueuePreload(clipId: number, url: string) {
    if (videoCache.has(clipId)) return;
    videoCache.set(clipId, '');
    preloadQueue.push(async () => {
        try {
            await fetch(url, { cache: 'force-cache' });
            videoCache.set(clipId, url);
        } catch {
            videoCache.delete(clipId);
        }
    });
    runQueue();
}
export function clearCache() {
    for (const url of videoCache.values()) {
        if (url) URL.revokeObjectURL(url);
    }
    videoCache.clear();
    preloadQueue.length = 0;
}