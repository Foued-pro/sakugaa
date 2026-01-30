/**
* Récupère les clips via ton API locale.
* Fonctionne pour la Home (page 1 par défaut) et la Galerie (pagination).
* * @param {number} limit - Nombre de clips (défaut 12)
* @param {number} page - Page actuelle (défaut 1) -> Si tu n'en veux pas, laisse vide, ça vaudra 1.
* @param {string} tags - Filtres (défaut vide)
*/
export async function fetchClips(limit = 12, page = 1, tags = '') {
    const baseUrl = "/api/clips";

    const params = new URLSearchParams({
        limit: limit.toString(),
        page: page.toString(),
        tags: tags,
    });

    try {
        // On appelle ton proxy local
        const response = await fetch(`${baseUrl}?${params.toString()}`, {
            cache: 'no-store'
        });

        if (!response.ok) throw new Error(`Status: ${response.status}`);

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Erreur fetchClips:", error);
        return [];
    }
}

export async function fetchClipById(id) {
    try {
        const url = `/api/clips?tags=id:${id}&limit=1`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status} sur l'URL ${url}`);
        }
        const data = await response.json();
        if (data.length === 0) {
            console.error('Clip introuvable');
            return null;
        }
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
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        return data

    }catch{
        console.error("erreur lors de la requetes fetchArtist")
        return [];
    }
}


export async function searchArtists(query) {
    try {
        // On appelle TA route API locale qui cherche dans le JSON
        // Attention : vérifie bien que tu as créé le fichier app/api/artists/search/route.js
        const url = `/api/artists/search?q=${encodeURIComponent(query)}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        const data = await response.json();
        return data; // Retourne la liste des artistes trouvés
    } catch (error) {
        console.error('Erreur lors de la recherche d\'artiste:', error);
        return [];
    }
}