"use client"
import { useEffect, useState } from "react"
import { fetchArtist } from "@/lib/sakugabooru";

export default function ArtistPage(){
    const [listArtist, setListArtist] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function LoadArtist(){
            try {
                setLoading(true);
                const data = await fetchArtist(20, 1);
                setListArtist(data || []); 
            } catch (error) {
                console.error("Erreur:", error);
                setListArtist([]);
            } finally {
                setLoading(false);
            }
        }
        LoadArtist();
    }, []);

    if (loading) {
        return <p className="text-2xl text-center mt-20">Chargement...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="mt-20 mb-10 text-3xl font-bold text-center">
                Liste des artistes ({listArtist.length})
            </h1>
            {listArtist.length === 0 ? (
                <p className="text-center text-gray-500">Aucun artiste trouvé</p>
            ) : (
                <div className="max-w-4xl mx-auto">
                    {listArtist.map((artist) => (
                        <div 
                            key={artist.id} 
                            className="border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md mb-5 hover:scale-105 transition-transform bg-white"
                        >
                            {/* Nom et ID en tête */}
                            <div className="flex justify-between items-start mb-3">
                                <h2 className="text-xl font-bold text-gray-800">{artist.name}</h2>
                                <span className="text-gray-400 text-sm">#{artist.id}</span>
                            </div>
                            
                            {/* Informations principales */}
                            <div className="space-y-2">
                                <p className="text-gray-600">
                                    <span className="font-medium">Alias:</span> {artist.alias || 'Aucun'}
                                </p>
                                
                                {artist.group && (
                                    <p className="text-gray-600">
                                        <span className="font-medium">Groupe:</span> {artist.group}
                                    </p>
                                )}
                            </div>

                            {/* Liens - en bas avec séparation */}
                            {artist.urls && artist.urls.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <p className="text-sm font-medium text-gray-700 mb-2">Liens:</p>
                                    <div className="flex flex-col gap-1">
                                        {artist.urls.map((url, index) => (
                                            <a 
                                                key={index}
                                                href={url} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-700 text-sm truncate"
                                                title={url}
                                            >
                                                🔗 {url}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}