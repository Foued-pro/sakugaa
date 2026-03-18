const fs = require('fs');
const path = require('path');

const API_URL = "https://www.sakugabooru.com/artist.json";
const OUTPUT_FILE = path.join(__dirname, '../data/all_artists.json');
const DELAY_MS = 150;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchAll() {
    console.log("Démarrage de l'indexation complète...");

    let allArtists = [];
    let page = 1;
    let hasMore = true;
    while (hasMore) {
        try {
            const response = await fetch(`${API_URL}?limit=100&page=${page}&order=name`);
            if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
            const data = await response.json();
            if (data.length === 0) {
                hasMore = false;
                console.log("Fin de la liste atteinte.");
                break;
            }
            allArtists = [...allArtists, ...data];

            process.stdout.write(`\rPage ${page} traitée. Total: ${allArtists.length} artistes...`);

            page++;
            await sleep(DELAY_MS);

        } catch (error) {
            console.error(`\nErreur page ${page}:`, error.message);
            hasMore = false;
        }
    }
    console.log(`Écriture du fichier dans /data/all_artists.json`);
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allArtists, null, 2));

    console.log("Base de Données prête.");
}

fetchAll();