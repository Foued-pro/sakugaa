"use client";
import { fetchClips } from "@/lib/sakugabooru";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadClips() {
      setLoading(true);
      const data = await fetchClips(6);
      setClips(data);
      setLoading(false);
    }
    loadClips();
  }, []);

  return (
      <main className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white">
        <div className="relative">
          {/* HERO SECTION - Simplifiée */}
          <section className="max-w-6xl mx-auto px-4 pt-20 pb-16">
            <div className="text-center space-y-6">
              <div className="mb-8">
              <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm">
                🎬 Discover animation clips
              </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black">
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                Sakugaa
              </span>
              </h1>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Curated collection of the best animation moments
              </p>

              <div className="pt-6">
                <Link
                    href="/animations"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
                >
                  <span>Browse Clips</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* TRENDING CLIPS - Plus propre */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">🔥</span>
                  <h2 className="text-3xl font-bold">Trending Now</h2>
                </div>
                <p className="text-gray-400">Popular clips this week</p>
              </div>

              <Link
                  href="/animations"
                  className="mt-4 sm:mt-0 text-blue-400 hover:text-blue-300 transition flex items-center gap-1"
              >
                View all
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                      <div key={i} className="aspect-video bg-gray-800 rounded-lg animate-pulse" />
                  ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {clips.map((clip, index) => {
                    if (!clip.file_url) return null;

                    const isVideo = clip.file_url.endsWith('.mp4') ||
                        clip.file_url.endsWith('.webm') ||
                        clip.file_url.endsWith('.mov');

                    return (
                        <Link
                            href={`/clips/${clip.id}`}
                            key={clip.id}
                            className="group block overflow-hidden rounded-xl bg-gray-800 hover:bg-gray-700 transition duration-300"
                        >
                          <div className="aspect-video overflow-hidden relative">
                            {isVideo ? (
                                <>
                                  <video
                                      src={clip.file_url}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                      onMouseEnter={(e) => {
                                        e.currentTarget.play().catch(() => {});
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.pause();
                                        e.currentTarget.currentTime = 0;
                                      }}
                                      muted
                                      playsInline
                                      preload="metadata"
                                  />
                                  <div className="absolute bottom-2 right-2 bg-black/70 rounded-full p-1.5">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                </>
                            ) : (
                                <img
                                    src={clip.sample_url || clip.file_url}
                                    alt={clip.tags || 'clip'}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            )}
                          </div>

                          <div className="p-4">
                            <h3 className="font-medium line-clamp-1">
                              {clip.tags?.split(' ').slice(0, 3).join(' ') || 'Animation Clip'}
                            </h3>
                            <div className="flex items-center justify-between mt-2 text-sm text-gray-400">
                              <span>{clip.tags?.split(' ').length || 0} tags</span>
                              <span className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                                {(Math.random() * 5).toFixed(1)}
                        </span>
                            </div>
                          </div>
                        </Link>
                    );
                  })}
                </div>
            )}
          </section>

          {/* FEATURED ANIMATORS - Plus simple */}
          <section className="max-w-7xl mx-auto px-4 py-16">
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">👨‍🎨</span>
                <h2 className="text-3xl font-bold">Featured Animators</h2>
              </div>
              <p className="text-gray-400">Top creators in the industry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Yoh Yoshinari",
                  role: "Character Designer",
                  emoji: "🎨",
                  color: "bg-blue-500/20 border-blue-500/30"
                },
                {
                  name: "Hiroyuki Imaishi",
                  role: "Director",
                  emoji: "🎥",
                  color: "bg-purple-500/20 border-purple-500/30"
                },
                {
                  name: "Katsuya Kondo",
                  role: "Animation Director",
                  emoji: "✏️",
                  color: "bg-green-500/20 border-green-500/30"
                }
              ].map((animator, index) => (
                  <div
                      key={index}
                      className={`p-6 rounded-xl border ${animator.color} hover:bg-gray-800/50 transition`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`text-2xl p-3 rounded-lg ${animator.color} border`}>
                        {animator.emoji}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{animator.name}</h3>
                        <p className="text-gray-300">{animator.role}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 text-sm">
                      Known for exceptional work in character design and fluid animation sequences.
                    </p>

                    <button className="w-full py-2.5 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-700 transition text-sm font-medium">
                      View Works
                    </button>
                  </div>
              ))}
            </div>
          </section>

          {/* CTA SECTION - Simplifiée */}
          <section className="max-w-4xl mx-auto px-4 py-16">
            <div className="bg-gray-800/50 rounded-2xl p-8 text-center border border-gray-700">
              <h2 className="text-3xl font-bold mb-4">Explore More</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Browse thousands of clips, discover new animators, and save your favorites.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                    href="/gallery"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
                >
                  Browse Gallery
                </Link>
                <Link
                    href="/about"
                    className="px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg font-medium transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
  );
}