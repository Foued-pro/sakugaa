import { motion } from "framer-motion";
import { Upload, Sparkles, Mail } from "lucide-react";
import { Button } from "@/components/ui/button"
import Link from "next/link";

export function CommunityCTA() {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-[1500px] mx-auto px-6 md:px-12">

                {/* Grande Carte Blanche */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative rounded-[3rem] bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden px-6 py-16 md:px-20 md:py-24 text-center md:text-left"
                >
                    {/* Dégradés d'arrière-plan */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-[#ede9fe]/60 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[500px] h-[500px] bg-[#fce7f3]/60 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-12">

                        {/* Texte */}
                        <div className="max-w-2xl">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-bold text-[#c4b5fd] mb-6"
                            >
                                <Sparkles className="w-4 h-4" />
                                <span>Contribute to the archive</span>
                            </motion.div>

                            <h2 className="text-4xl md:text-6xl font-bold text-[#1a1a1a] tracking-tight leading-[1.1] mb-6">
                                Help us build the <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c4b5fd] to-purple-600">
                            ultimate collection.
                        </span>
                            </h2>

                            <p className="text-lg text-gray-500 leading-relaxed max-w-lg font-medium">
                                Sakugaa is a community-driven project. If you know a legendary cut that is missing from our database, submit it now.
                            </p>
                        </div>

                        {/* BOUTONS D'ACTION (Maintenant cliquables) */}
                        <div className="flex flex-col sm:flex-row gap-4 shrink-0">

                            {/* Bouton 1 : Submit (Lien vers /submit) */}
                            <Link href="/submit">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cursor-pointer" // Force le curseur main
                                >
                                    <Button className="h-16 px-10 rounded-full bg-[#1a1a1a] text-white text-lg font-bold hover:bg-black flex items-center gap-2 shadow-lg shadow-black/10 pointer-events-none">
                                        {/* pointer-events-none sur le bouton pour laisser le Link gérer le clic */}
                                        <Upload className="w-5 h-5" />
                                        Submit a Clip
                                    </Button>
                                </motion.div>
                            </Link>

                            {/* Bouton 2 : Request (Lien vers /contact ou mailto) */}
                            <Link href="mailto:contact@sakugaa.com">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="cursor-pointer"
                                >
                                    <Button variant="outline" className="h-16 px-10 rounded-full border-gray-200 text-gray-600 bg-white hover:bg-gray-50 text-lg font-medium pointer-events-none">
                                        <Mail className="w-5 h-5 mr-2" />
                                        Request Artist
                                    </Button>
                                </motion.div>
                            </Link>

                        </div>
                    </div>

                    {/* Décoration Visuelle */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] pointer-events-none" />

                </motion.div>
            </div>
        </section>
    );
}