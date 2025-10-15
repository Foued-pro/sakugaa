"use client";
import { fetchClips } from "@/lib/sakugabooru";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
const [clips, setClips] = useState([]);
useEffect(() => {
    async function loadClips() {
          console.log('START: Chargement des clips...');

        const data = await fetchClips();
        console.log('📦 RESULT:', data);
        console.log('📊 Nombre de clips:', data.length);
        setClips(data);
    }
    loadClips();
}, []);

console.log("Clips chargés:"+clips);

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">

      {/* Header */}
      <h1 className="text-4xl font-bold mb-8">
        Welcome to Sakugaa 🎬
      </h1>
      
      {/* Trending Section */}
      <section className="mb-12">
        <h2 className="font-bold text-3xl mb-6">
          Trending Clips
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-40">  {/* rien(Mobile) md:(Tablette)  lg:(Pc) */}
          {clips.map(clip=>(
            <Link href={`/clips/${clip.id}`} key={clip.id} className="">
            <video
              key={clip.id}
              src={clip.file_url}
              className="w-full h-auto rounded-lg hover:scale-105 transition"
              />
            </Link>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-40 ml-2">
          <div className="">
            <h1>Animateur numero1</h1>
            <p>Description de animateur numero1</p>
            <button className="">
              Reseaux sociaux
            </button>
          </div>
          <div>
            <h1>Animateur numero2</h1>
            <p>Description de animateur numero2</p>
            <button className="">
              Reseaux sociaux
            </button>
          </div>
          <div>
            <h1>Animateur numero3</h1>
            <p>Description de animateur numero3</p>
            <button className="">
              Reseaux sociaux
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}