export function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-[#fafaf9] dark:bg-black">
            {/* Header Skeleton */}
            <div className="pt-24 pb-8 px-6 max-w-[1600px] mx-auto">
                <div className="h-10 w-48 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-6" />
                <div className="h-14 w-full max-w-2xl bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse mb-4" />
                <div className="flex gap-2">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-8 w-20 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
                    ))}
                </div>
            </div>

            {/* Grid Skeleton */}
            <div className="px-6 pb-20 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-[16/9] bg-gray-200 dark:bg-gray-900 rounded-2xl animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
}