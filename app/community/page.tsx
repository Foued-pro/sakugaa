import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageSquare, ThumbsUp, Flame, Users } from "lucide-react";

export const metadata: Metadata = {
    title: "Community",
    description: "Join the Sakugaa community — discuss clips, share discoveries, and rate your favorite animation moments.",
};

const planned = [
    { icon: MessageSquare, title: "Discussions", desc: "Share your thoughts on clips, debate the best fights, and discover hidden gems." },
    { icon: ThumbsUp, title: "Reviews & Ratings", desc: "Rate clips and leave reviews. Help the community find the best sakuga." },
    { icon: Flame, title: "Weekly Highlights", desc: "Community-voted best clips of the week, curated by the people who care most." },
    { icon: Users, title: "Animator Spotlights", desc: "Deep dives into animators careers, written by the community." },
];

export default function CommunityPage() {
    return (
        <main className="min-h-screen bg-white">
            <div className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">

                    <span className="text-[#c4b5fd] font-bold text-xs uppercase tracking-widest">Coming Soon</span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-[#1a1a1a] mt-4 leading-[0.95]">
                        The Sakugaa
                        <span className="font-serif italic text-[#c4b5fd] block mt-2">Community.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-500 mt-8 max-w-2xl leading-relaxed">
                        A space for sakuga lovers to discuss animation, rate their favorite clips,
                        and connect with fellow enthusiasts. We are building something special.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                        {planned.map((item) => (
                            <div key={item.title} className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                                <item.icon className="w-6 h-6 text-[#c4b5fd] mb-4" />
                                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">{item.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/"
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#1a1a1a] text-white font-medium hover:bg-black transition-all shadow-lg"
                        >
                            {"Explore Clips "}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}