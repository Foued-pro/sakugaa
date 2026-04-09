export const videoCache = new Map<number, string>();
const preloadQueue: (() => Promise<void>)[] = [];
let activePreloads = 0;

function runQueue() {
    while (preloadQueue.length > 0 && activePreloads < 2) {
        const task = preloadQueue.shift()!;
        activePreloads++;
        task().finally(() => { activePreloads--; runQueue(); });
    }
}

export function enqueuePreload(clipId: number, url: string) {
    if (videoCache.has(clipId)) return;
    videoCache.set(clipId, ''); // marque comme "en cours" pour éviter le double enqueue
    preloadQueue.push(async () => {
        try {
            const res = await fetch(url);
            const blob = await res.blob();
            videoCache.set(clipId, URL.createObjectURL(blob));
        } catch {
            videoCache.delete(clipId);
        }
    });
    runQueue();
}