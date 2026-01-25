import { Suspense } from 'react';
import AnimationContent from './AnimationContent';

// Skeleton de chargement
function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-black text-white">
            <div className="sticky top-0 z-40 bg-black/95 border-b border-gray-900 px-6 py-4">
                <div className="max-w-[1800px] mx-auto">
                    <div className="h-8 w-48 bg-gray-800 rounded animate-pulse mb-4" />
                    <div className="h-12 w-full max-w-2xl bg-gray-900 rounded-xl animate-pulse" />
                </div>
            </div>
            <div className="px-4 py-6 max-w-[1800px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-video bg-gray-900 rounded-xl animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function AnimationPage() {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <AnimationContent />
        </Suspense>
    );
}