"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex flex-col justify-end pb-24 px-6 md:px-12 overflow-hidden">
      
      {/* Ambient glowing orb background */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-accent/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse duration-[8000ms]" />
      
      <motion.div 
        style={{ y: y1, opacity }}
        className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12 relative z-10"
      >
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[12vw] sm:text-[8vw] lg:text-[6vw] font-bold tracking-tighter leading-[0.9] text-foreground lowercase">
              cinematic<br />
              <span className="text-muted italic font-light ml-[10%]">storytelling</span><br />
              motion<br />
              <span className="text-accent italic font-light ml-[20%]">design.</span>
            </h1>
          </motion.div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-2"
          >
            <p className="text-lg md:text-xl text-muted leading-relaxed font-light">
              Crafting scroll-stopping visuals for brands and startups.
            </p>
            <p className="text-xs md:text-sm text-zinc-500 uppercase tracking-widest font-medium mt-2">
              "If you cannot be obsessed with what you're doing forget about greatness."
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link 
              href="#work"
              className="group flex items-center justify-center gap-3 px-8 py-5 bg-foreground text-background hover:bg-zinc-200 rounded-full text-sm font-semibold tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore the Work
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:rotate-[-45deg]" />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            className="w-full h-1/2 bg-accent absolute top-0 left-0"
            animate={{ top: ["-50%", "150%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
