import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Eye, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "About",
    description: "Sakugaa is a modern interface for Sakugabooru — built to celebrate the art of Japanese animation.",
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <span className="text-[#c4b5fd] font-bold text-xs uppercase tracking-widest">About</span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1a1a1a] mt-4 leading-[0.95]">
                        The art of animation
                        <span className="font-serif italic text-[#c4b5fd] block mt-2">deserves better.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-500 mt-8 max-w-2xl leading-relaxed">
                        Sakugabooru is the reference for discovering the best moments of anime animation —
                        作画 (sakuga). The database is excellent, the design much less so. Sakugaa is an
                        attempt to give it the interface it deserves.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                            <div className="w-12 h-12 rounded-full bg-[#ede9fe] flex items-center justify-center mb-4">
                                <Eye className="w-5 h-5 text-[#c4b5fd]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Curated Clips</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Thousands of clips from the Sakugabooru archive, displayed with the visual
                                quality they deserve.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                            <div className="w-12 h-12 rounded-full bg-[#fce7f3] flex items-center justify-center mb-4">
                                <Heart className="w-5 h-5 text-pink-400" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Celebrate Artists</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Discover the animators behind iconic scenes — from Yutaka Nakamura to
                                Megumi Ishitani.
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                            <div className="w-12 h-12 rounded-full bg-[#ede9fe] flex items-center justify-center mb-4">
                                <Users className="w-5 h-5 text-[#c4b5fd]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">Open Platform</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Built on the Sakugabooru API. Community-driven data, modern interface,
                                free for everyone.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 pt-16 border-t border-gray-100">
                        <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">Built by</h2>
                        <p className="text-gray-500 leading-relaxed max-w-xl">
                            Sakugaa is a project by <span className="font-semibold text-[#1a1a1a]">Foued Attar</span> —
                            developer, anime enthusiast, and sakuga appreciator. Built with Next.js and
                            deployed on Cloudflare Pages.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <Link
                                href="/"
                                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#1a1a1a] text-white text-sm font-medium hover:bg-black transition-all"
                            >
                                Explore Clips <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <a
                                href="https://github.com/Foued-pro/sakugaa"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sm font-medium text-gray-600 hover:border-gray-400 hover:text-[#1a1a1a] transition-all"
                            >
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}