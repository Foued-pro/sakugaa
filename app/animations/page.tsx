import AnimationContent from './AnimationContent';
import { Suspense } from 'react';
import { LoadingSkeleton } from './loading-skeleton';
import { readFile } from 'fs/promises';
import path from 'path';

export default async function AnimationsPage() {
    let allTags: string[] = [];
    let popularTags: string[] = [];
    try {
        const filePath = path.join(process.cwd(), 'public', 'tags.json');
        const raw = await readFile(filePath, 'utf-8');
        allTags = JSON.parse(raw) as string[];
        popularTags = allTags.slice(0, 5);
    } catch (err) {
        console.error('Failed to load tags.json:', err);
    }

    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <AnimationContent allTags={allTags} />
        </Suspense>
    );
}