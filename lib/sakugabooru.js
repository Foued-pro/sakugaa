

export async function fetchClips(limit = 6,page=2,tags='animated') {
    try {
        const url = `/api/clips?limit=${limit}&page=${page}&tags=${tags}`;
        console.log('🔍 FETCH URL:', url);
        const response = await fetch(url);
        console.log('📡 RESPONSE status:', response.status);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
                console.log('✅ DATA reçue:', data.length, 'clips');
        return data;
    }
        catch (error) {
            console.error('Erreur lors du fetch des clips:', error);
            return [];
    }
}  