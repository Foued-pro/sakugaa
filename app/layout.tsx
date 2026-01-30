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
    title: "Sakugaa - Animation Excellence",
    description: "Discover the finest animation moments.",
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