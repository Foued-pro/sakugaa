"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background pt-16 pb-8">
            <div className="mx-auto max-w-7xl px-6">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand & Description */}
                    <div className="col-span-1 lg:col-span-2">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Sakugaa</h2>
                        <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
                            A platform dedicated to the art of Japanese animation.
                            Discover, share, and celebrate the best moments of sakuga.
                        </p>
                    </div>

                    {/* Navigation Rapide */}
                    <div>
                        <h3 className="font-semibold text-foreground">Navigation</h3>
                        <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                            <li><a href="#clips" className="hover:text-[#c4b5fd] transition-colors">Clips</a></li>
                            <li><a href="#trending" className="hover:text-[#c4b5fd] transition-colors">Trending</a></li>
                            <li><a href="#artists" className="hover:text-[#c4b5fd] transition-colors">Artistes</a></li>
                        </ul>
                    </div>

                    {/* Contact / Portfolio */}
                    <div>
                        <h3 className="font-semibold text-foreground">Connect</h3>
                        <div className="mt-4 flex gap-4">
                            <a
                                href="https://www.linkedin.com/in/ton-profil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-[#c4b5fd] hover:bg-[#c4b5fd]/10"
                            >
                                <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-[#c4b5fd]" />
                            </a>
                            <a
                                href="https://github.com/ton-profil"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-[#c4b5fd] hover:bg-[#c4b5fd]/10"
                            >
                                <Github className="h-5 w-5 text-muted-foreground group-hover:text-[#c4b5fd]" />
                            </a>
                            <a
                                href="mailto:contact@fouedattar.com"
                                className="group flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-[#c4b5fd] hover:bg-[#c4b5fd]/10"
                            >
                                <Mail className="h-5 w-5 text-muted-foreground group-hover:text-[#c4b5fd]" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 border-t border-border pt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Sakugaa. All rights reserved.
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Designed & Developed by
                        <a
                            href="https://www.linkedin.com/in/ton-profil"
                            target="_blank"
                            className="font-medium text-foreground hover:text-[#c4b5fd] transition-colors"
                        >
                            Foued Attar
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}