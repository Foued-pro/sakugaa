export function WhatIsSakuga() {
    return (
        <section className="py-24 bg-[#fafafa] border-t border-gray-100">
            <div className="max-w-[1500px] mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* LEFT */}
                    <div>
    <span className="text-xs font-bold uppercase tracking-widest text-[#c4b5fd]">
        What is sakuga?
    </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mt-4 leading-tight">
                            The seconds where
                            <br />
                            <span className="font-serif italic font-medium text-[#c4b5fd]">
            animation becomes the point.
        </span>
                        </h2>
                        <p className="text-gray-500 mt-6 leading-relaxed">
                            Sakuga (作画) refers to exceptional animation sequences in anime — the moments where visual quality peaks, often tied to a specific animator whose style becomes unmistakable at first glance.
                        </p>
                        <p className="text-gray-500 mt-4 leading-relaxed">
                            Yutaka Nakamura for his impact frames, Hiroyuki Imaishi for his relentless energy, Megumi Ishitani for her compositions — every sakuga cut carries a signature.
                        </p>
                        <p className="text-gray-500 mt-4 leading-relaxed">
                            Sakugabooru has archived these moments for years. Sakugaa gives them the interface they deserve.
                        </p>
                    </div>

                    {/* RIGHT — trois points clés */}
                    <div className="flex flex-col gap-6">
                        {[
                            {
                                number: '01',
                                title: 'Des clips triés par score',
                                desc: "Chaque clip est noté par la communauté Sakugabooru. Les meilleurs moments remontent naturellement."
                            },
                            {
                                number: '02',
                                title: 'Des animateurs identifiés',
                                desc: "Derrière chaque cut exceptionnel, il y a une personne. Sakugaa met en avant le travail des animateurs."
                            },
                            {
                                number: '03',
                                title: 'Un accès direct, sans friction',
                                desc: "Recherche par tag, par artiste, par série. Les vidéos se lancent au hover, sans clic supplémentaire."
                            },
                        ].map(({ number, title, desc }) => (
                            <div key={number} className="flex gap-6 p-6 bg-white rounded-2xl border border-gray-100">
                                <span className="text-xs font-bold text-gray-300 font-mono mt-1 shrink-0">{number}</span>
                                <div>
                                    <h3 className="font-bold text-[#1a1a1a] mb-1">{title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}