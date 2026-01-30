import { Suspense } from 'react';
import AnimationContent from './AnimationContent';
import { LoadingSkeleton } from './loading-skeleton';

export default function AnimationPage() {
    return (
        <Suspense fallback={<LoadingSkeleton />}>
            <AnimationContent />
        </Suspense>
    );
}