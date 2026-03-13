"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Portfolio", href: "#work", num: "01" },
  { label: "About", href: "#about", num: "02" },
  { label: "YouTube", href: "https://youtube.com/@standrew0x", num: "03" },
  { label: "Contact", href: "#contact", num: "04" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 bg-background/80 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xl md:text-2xl font-bold tracking-tighter text-foreground hover:text-accent transition-colors z-50 relative" 
            onClick={() => setIsOpen(false)}
          >
            andrew.
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link 
                key={link.label}
                href={link.href}
                className="text-sm font-medium uppercase tracking-widest text-zinc-400 hover:text-foreground transition-colors"
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-12 h-12 flex flex-col items-end justify-center gap-[6px] z-50 relative group"
            aria-label="Toggle menu"
          >
            <motion.div 
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 8 : 0 }} 
              className="w-8 h-[2px] bg-foreground group-hover:bg-accent transition-colors" 
            />
            <motion.div 
              animate={{ opacity: isOpen ? 0 : 1 }} 
              className="w-6 h-[2px] bg-foreground group-hover:bg-accent transition-colors" 
            />
            <motion.div 
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -8 : 0, width: isOpen ? 32 : 16 }} 
              className="h-[2px] bg-foreground group-hover:bg-accent transition-all duration-300" 
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl flex flex-col justify-center px-6"
          >
            <nav className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-end gap-6 border-b border-white/5 pb-4"
                >
                  <span className="text-accent font-mono text-sm mb-2">{link.num}</span>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    className="text-5xl font-bold tracking-tighter text-foreground hover:text-accent transition-colors lowercase"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
