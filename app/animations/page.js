"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation'; // ✅ Next.js hooks
import { fetchClips } from '@/lib/sakugabooru';
import Link from "next/link";

export default function AnimationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // ✅ Lire depuis l'URL
    const currentPage = parseInt(searchParams.get('page') || '1');
    const currentSearch = searchParams.get('search') || '';
    
    const [clips, setClips] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchInput, setSearchInput] = useState('');
    
    const POPULAR_TAGS = [
        'fate', 'naruto', 'one_piece', 'demon_slayer',
        'effects', 'fighting', 'yutapon_cubes', 'explosion'
    ];

    // ✅ Fonction pour mettre à jour l'URL
    function updateURL(search, page) {
        const params = new URLSearchParams();
        if (search) params.set('search', search);
        if (page > 1) params.set('page', page.toString());
        
        const newURL = params.toString() ? `?${params.toString()}` : '';
        router.push(`/animations${newURL}`);
    }

    // ✅ Recherche depuis l'input
    function handleSearch() {
        const query = searchInput.trim().toLowerCase();
        if (!query) return;
        
        updateURL(query, 1); // Page 1 + nouveau search
        setSearchInput('');
    }

    // ✅ Clic sur un tag de la sidebar
    function selectTag(tag) {
        updateURL(tag, 1); // Page 1 + nouveau tag
    }

    // ✅ Effacer la recherche
    function clearSearch() {
        updateURL('', 1); // Retour à "All"
    }

    // ✅ Changer de page
    function changePage(newPage) {
        updateURL(currentSearch, newPage);
        window.scrollTo(0, 0);
    }

    // ✅ Charger les clips (se déclenche quand l'URL change)
    useEffect(() => {
        async function loadClips() {
            try {
                setLoading(true);  
                setError(null);
                const data = await fetchClips(12, currentPage, currentSearch);
                setClips(data);
                setLoading(false);
            } catch (error) {
                console.error("Erreur", error);
                setError(true);
                setClips([]);
                setLoading(false);
            }
        }
        loadClips();
    }, [currentPage, currentSearch]); // ✅ Dépend de l'URL

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold mb-8">All Animations</h1>
            
            {/* BARRE DE RECHERCHE */}
            <div className="mb-8">
                <div className="flex gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Rechercher un tag (ex: jujutsu_kaisen, mob_psycho)..."
                        className="flex-1 p-4 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 outline-none"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-700 px-8 rounded-lg transition"
                        onClick={handleSearch}
                    >
                        🔍 Rechercher
                    </button>
                </div>

                {/* Badge recherche active */}
                {currentSearch && (
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400">Recherche active:</span>
                        <span className="bg-blue-600 px-4 py-2 rounded-full flex items-center gap-2">
                            {currentSearch}
                            <button
                                className="hover:text-red-400 transition"
                                onClick={clearSearch}
                            >
                                ❌
                            </button>
                        </span>
                    </div>
                )}
            </div>

            {/* SIDEBAR + CONTENU */}
            <div className="flex gap-8">
                {/* SIDEBAR */}
                <aside className="w-64 bg-gray-800 p-6 rounded-lg h-fit sticky top-8">
                    <h2 className="text-xl font-bold mb-4">Popular Tags</h2>
                    
                    <button
                        className={`
                            block w-full text-left p-3 rounded mb-2 transition
                            ${currentSearch === '' 
                                ? 'bg-blue-600 font-bold' 
                                : 'hover:bg-gray-700'
                            }
                        `}
                        onClick={() => clearSearch()}
                    >
                        All Animations
                    </button>
                    
                    {POPULAR_TAGS.map(tag => (
                        <button
                            key={tag}
                            className={`
                                block w-full text-left p-3 rounded mb-2 transition cursor-pointer
                                ${currentSearch === tag 
                                    ? 'bg-blue-600 font-bold' 
                                    : 'hover:bg-gray-700'
                                }
                            `}
                            onClick={() => selectTag(tag)}
                        >
                            {tag}
                            
                        </button>
                    ))}
                </aside>

                {/* CONTENU */}
                <main className="flex-1">
                    {loading ? (
                        <p className="text-2xl">Loading...</p>
                    ) : error ? (
                        <div className="text-center">
                            <p className="text-2xl text-red-500 mb-4">Error loading animations.</p>
                            <button 
                                className="bg-red-600 hover:bg-red-700 p-4 rounded-lg transition"
                                onClick={() => window.location.reload()}
                            >
                                Retry
                            </button>
                        </div>
                    ) : clips.length === 0 ? (
                        <p className="text-2xl">No animations found.</p>
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
                                            preload="metadata"
                                            muted
                                            loop
                                        />
                                    </Link>
                                ))}
                            </div>
                            
                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-4 mt-8">
                                <button 
                                    className={`
                                        p-4 rounded-lg transition
                                        ${currentPage === 1 
                                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                                            : 'bg-gray-800 hover:scale-105'
                                        }
                                    `}
                                    onClick={() => changePage(currentPage - 1)}
                                    disabled={currentPage === 1} 
                                >
                                    ← Précédent
                                </button>
                                
                                <span className="text-xl font-bold">Page {currentPage}</span>
                                
                                <button 
                                    className="bg-gray-800 p-4 rounded-lg hover:scale-105 transition"
                                    onClick={() => changePage(currentPage + 1)}
                                >
                                    Suivant →
                                </button>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}