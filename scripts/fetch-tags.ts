import * as fs from 'fs';

async function main() {
    const res = await fetch('https://www.sakugabooru.com/tag.json?limit=0&order=count');
    const data = await res.json() as { name: string }[];
    const tags = data.map(t => t.name);
    fs.writeFileSync('public/tags.json', JSON.stringify(tags));
    console.log(`✓ ${tags.length} tags written to public/tags.json`);
}

main();