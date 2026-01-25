const fs = require('fs');
const path = require('path');

// CONFIGURATION
const API_URL = "https://www.sakugabooru.com/artist.json";
const OUTPUT_FILE = path.join(__dirname, '../data/all_artists.json');
const DELAY_MS = 150; // Pause de 0.15s entre chaque page (Politesse)

// Fonction pour attendre (Promesse)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchAll() {
    console.log("👨‍🏫 PROF: Démarrage de l'indexation complète...");

    let allArtists = [];
    let page = 1;
    let hasMore = true;

    // BOUCLE DE PAGINATION
    while (hasMore) {
        try {
            // On demande la page X
            const response = await fetch(`${API_URL}?limit=100&page=${page}&order=name`);

            if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

            const data = await response.json();

            // Si la liste reçue est vide, c'est qu'on a fini toutes les pages
            if (data.length === 0) {
                hasMore = false;
                console.log("🏁 Fin de la liste atteinte.");
                break;
            }

            // On ajoute les nouveaux à notre grand tableau
            allArtists = [...allArtists, ...data];

            // Log de progression (pour ne pas paniquer devant un écran vide)
            process.stdout.write(`\r✅ Page ${page} traitée. Total: ${allArtists.length} artistes...`);

            page++;
            await sleep(DELAY_MS); // On respire pour ne pas se faire bloquer

        } catch (error) {
            console.error(`\n❌ Erreur page ${page}:`, error.message);
            // En cas d'erreur grave, on arrête pour ne pas corrompre le fichier
            hasMore = false;
        }
    }

    // SAUVEGARDE
    console.log(`\n💾 Écriture du fichier dans /data/all_artists.json...`);

    // On s'assure que le dossier data existe
    const dir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // On écrit le JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allArtists, null, 2));

    console.log("🎉 TERMINÉ ! Ta Base de Données est prête.");
}

fetchAll();