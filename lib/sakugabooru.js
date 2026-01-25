/**
 * Récupère une liste de clips depuis notre API Proxy (Next.js).
 * @param {number} limit - Nombre d'éléments par page (défaut 6)
 * @param {number} page - Numéro de la page actuelle
 * @param {string} tags - Filtres de recherche (ex: 'yutaka_nakamura')
 */



export async function fetchClips(limit = 6,page=2, tags='') {
    try {
        // On passe les paramètres en Query String (?) pour que l'API puisse filtrer
        const url = `/api/clips?limit=${limit}&page=${page}&tags=${tags}`;

        // 'response' est ici un objet brut (les en-têtes sont arrivés, mais le corps peut être en cours de téléchargement)
        const response = await fetch(url);

        console.log("Response:", response);
        // Gestion d'erreur HTTP
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status} sur l'URL ${url}`);
        }

        const data = await response.json();
        return data;
    }
        catch (error) {
            console.error('Erreur critique lors du fetch des clips:', error);
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