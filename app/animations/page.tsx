import AnimationContent from '../animations/AnimationContent';
import { readFile } from 'fs/promises';
import path from 'path';

export default async function AnimationsPage() {
    let allTags: string[] = [];
    try {
        const filePath = path.join(process.cwd(), 'public', 'tags.json');
        const raw = await readFile(filePath, 'utf-8');
        allTags = JSON.parse(raw);
    } catch {
        // autocomplete désactivé silencieusement
    }

    return <AnimationContent allTags={allTags} />;
}