import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://standrew0x.vercel.app"),
  title: "Andrew — Cinematic Storyteller & Motion Designer",
  description: "Portfolio of Andrew (@standrew0x) — six years of crafting scroll-stopping motion design and cinematic visuals for brands and startups.",
  openGraph: {
    title: "Andrew — Cinematic Storyteller & Motion Designer",
    description: "Portfolio of Andrew (@standrew0x) — six years of crafting scroll-stopping motion design and cinematic visuals for brands and startups.",
    url: "https://standrew0x.vercel.app", // Replace with actual production URL
    siteName: "Andrew's Portfolio",
    images: [
      {
        url: "/og-image.jpg", // TODO: Replace with an actual exported styleframe in public/
        width: 1200,
        height: 630,
        alt: "Andrew Portfolio Open Graph",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Andrew — Cinematic Storyteller",
    description: "Portfolio of Andrew (@standrew0x)",
    creator: "@standrew0x",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased bg-background text-foreground selection:bg-accent selection:text-background`}>
        <div className="film-grain" />
        <CustomCursor />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
