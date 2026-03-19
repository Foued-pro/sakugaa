import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
// @ts-ignore
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
    weight: ["400", "500", "700"],
    display: "swap",
});

const instrumentSerif = Instrument_Serif({
    subsets: ["latin"],
    variable: "--font-instrument",
    weight: "400",
    style: ["normal", "italic"],
    display: "swap",
});

export const metadata: Metadata = {
    title: {
        default: "Sakugaa — Discover the finest animation moments",
        template: "%s | Sakugaa",
    },
    description: "Explore thousands of curated anime sakuga clips, discover talented animators, and celebrate the art of animation. A modern interface for Sakugabooru.",
    keywords: ["sakuga", "anime", "animation", "sakugabooru", "animators", "clips", "japanese animation"],
    metadataBase: new URL("https://sakugaa.com"),
    openGraph: {
        title: "Sakugaa —  Discover the finest animation moments",
        description: "Explore thousands of curated anime sakuga clips and celebrate the art of animation.",
        url: "https://sakugaa.com",
        siteName: "Sakugaa",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "Sakugaa",
        description: "The modern sakuga platform",
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/favicon.svg',
    },
};
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
        <body className={`${dmSans.variable} ${instrumentSerif.variable} font-sans antialiased bg-background text-foreground bg-dot-pattern` }>
        <Navbar />
        {children}
        <Footer />
        </body>
        </html>
    );
}