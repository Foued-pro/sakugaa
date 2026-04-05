const SKELETON_CARDS = 6;
const SKELETON_TAGS = 5;

export function LoadingSkeleton() {
    return (
        <div className="min-h-screen bg-white">
            <div className="relative pt-32 pb-16 px-6 md:px-12 border-b border-gray-100">
                <div className="max-w-[1600px] mx-auto">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8 mb-10">
                        <div className="w-full lg:w-auto">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 mb-4">
                                <div className="w-3 h-3 bg-gray-300 rounded-full animate-pulse" />
                                <div className="h-3 w-24 bg-gray-300 rounded animate-pulse" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-12 w-64 bg-gray-200 rounded-lg animate-pulse" />
                                <div className="h-12 w-48 bg-gray-100 rounded-lg animate-pulse" />
                            </div>
                        </div>
                        <div className="w-full lg:w-auto lg:min-w-[500px]">
                            <div className="h-16 bg-gray-50 rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 items-center">
                        <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
                        {[...Array(SKELETON_TAGS)].map((_, i) => (
                            <div key={i} className="h-10 w-32 bg-gray-100 border border-gray-200 rounded-full animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
            <div className="px-6 md:px-12 py-12 max-w-[1600px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[...Array(SKELETON_CARDS)].map((_, i) => (
                        <div key={i} className="bg-white border border-gray-100 rounded-3xl p-3 animate-pulse">
                            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-4" />
                            <div className="px-2 space-y-2">
                                <div className="h-5 bg-gray-200 rounded w-3/4" />
                                <div className="h-4 bg-gray-100 rounded w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}