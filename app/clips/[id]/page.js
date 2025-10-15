"use client";
import { useEffect,useState } from "react";
import { fetchClipById } from "@/lib/sakugabooru";
import { useParams } from "next/navigation";

export default function ClipPage({params}) {
    const {id} = useParams();
    const [clip, setClip] = useState(null);

    useEffect(() => {
        async function loadClips() {
            console.log('START: Chargement du clip ID:', id);
            const data = await fetchClipById(id);
            setClip(data);
        }
        loadClips();
    }, [id]);

    return (
        <main className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
            {clip ?(
                <div className="w-full max-w-3xl text-left">
                    <h1 className="text-xl font-bold mb-4">
                        source :{" "}
                        <a
                            href={clip.source}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {clip.source}
                        </a>
                        </h1>

                    <video
                    src={clip.file_url}
                    className="mx-auto h-auto rounded-lg mb-4 mt-4 max-w-full "
                    controls
                    />
                    <p>{clip.tags}</p>
                    <p>{clip.id}</p>
                </div>
            ):(
                <p>Loading...</p>
            )}
        </main>
    
    )
}