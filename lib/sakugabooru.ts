interface FetchOptions {
    signal?: AbortSignal;
}

export async function fetchClips(
    limit = 12,
    page = 1,
    tags = '',
    options: FetchOptions = {}
) {
    const params = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
        tags,
    });

    try {
        const response = await fetch(`/api/clips?${params.toString()}`, {
            signal: options.signal ?? null,
        });

        if (!response.ok) throw new Error(`Status: ${response.status}`);
        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        throw error;
    }
}

export async function fetchClipById(id: string | undefined) {
    if (!id) return null;
    const response = await fetch(`/api/clips?tags=id:${id}&limit=1`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    return data[0];
}

export async function fetchArtist(limit = 6, page = 1) {
    const response = await fetch(`/api/artists?limit=${limit}&page=${page}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

export async function searchArtists(query: string) {
    const response = await fetch(`/api/artists/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}