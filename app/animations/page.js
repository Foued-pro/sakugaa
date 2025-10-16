"use client";
import { useState, useEffect } from "react";
import { fetchClips } from '@/lib/sakugabooru';
import Link from "next/link";

export default function AnimationPage() {
    const [clips, setClips] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        async function loadClips() {
            setLoading(true);  
            const data = await fetchClips(10, page, 'animated');
            setClips(data);
            setLoading(false);  
        }
        loadClips();
    }, [page]);

    function nextPage() {
        setPage(page + 1);
        window.scrollTo(0, 0);
    }
    
    function prevPage() {
        if (page > 1) {
            setPage(page - 1);
            window.scrollTo(0, 0);
        }
    }
    
    return (
        <main className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-8">
                All Animations
            </h1>
            
            {loading ? (
                <p className="text-2xl">Loading...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {clips.map(clip => (
                            <Link href={`/clips/${clip.id}`} key={clip.id}>
                                <video
                                    src={clip.file_url}
                                    className="w-full aspect-video rounded-lg transition hover:scale-105 cursor-pointer"
                                    onMouseEnter={(e) => e.currentTarget.play()}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.pause();
                                        e.currentTarget.currentTime = 0;
                                    }}
                                    loading="lazy"
                                    poster={clip.thumbnail}
                                    preload="metadata" //charge seulement dimensions + durée
                                    muted
                                    loop
                                />
                            </Link>
                        ))}
                    </div>
                    
                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-8 mb-8">
                        <button 
                            className={`
                                p-4 rounded-lg transition
                                ${page === 1 
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                                    : 'bg-gray-800 hover:scale-105 cursor-pointer'
                                }
                            `}
                            onClick={prevPage}
                            disabled={page === 1} 
                        >
                            ← Précédent
                        </button>
                        
                        <span className="text-xl font-bold">
                            Page {page}
                        </span>
                        
                        <button 
                            className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition cursor-pointer"
                            onClick={nextPage}
                        >
                            Suivant →
                        </button>
                    </div>
                </>
            )}
        </main>
    );
}