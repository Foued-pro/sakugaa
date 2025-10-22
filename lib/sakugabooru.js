


export async function fetchClips(limit = 6,page=2, tags='') {
    try {
        const url = `/api/clips?limit=${limit}&page=${page}&tags=${tags}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
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
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        if (data.length === 0) {
            console.error('Clip introuvable');
            return null;
        }
        console.log('✅ Clip trouvé:', data[0]);
        return data[0];
    } catch (error) {
        console.error(' Erreur lors du fetch du clip par ID:', error);
        return null;
    }
}

export async function fetchArtist(limit = 6,page=1){
    try{

        const url=`/api/artists?limit=${limit}&page=${page}`
        const response = await fetch(url);
        const data = await response.json();
        return data
    }catch{
        console.error("erreur lors de la requetes fetchArtist")
        return [];
    }
}