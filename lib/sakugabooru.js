

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

export async function fetchClipById(id) {

    try {
        const url = `/api/clips?tags=id:${id}&limit=1`;
        console.log('🔍 Fetching clip:', url);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        console.log('📦 Data reçue:', data);
        if (data.length === 0) {
            console.error('❌ Clip introuvable');
            return null;
        }
        console.log('✅ Clip trouvé:', data[0]);
        return data[0];
    } catch (error) {
        console.error('❌ Erreur lors du fetch du clip par ID:', error);
        return null;
    }
}
