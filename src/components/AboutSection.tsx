"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function AboutSection() {
  const tags = ["Motion Design", "Cinematic Storytelling", "Video Editing", "AI + Creative"];

  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-background relative overflow-hidden">
      
      {/* Decorative large ampersand in background */}
      <div className="absolute -right-20 top-20 text-[40vw] font-serif italic text-white/[0.02] pointer-events-none select-none leading-none">
        &
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Intro / Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground leading-[1.1] mb-8">
              Pushing <span className="text-muted italic font-light">boundaries,</span><br/>
              one frame at a time.
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8"
          >
            <p className="text-xl md:text-3xl text-zinc-300 leading-relaxed font-light">
              I'm Andrew — a cinematic storyteller and video editor with roots in motion design.
            </p>
            <p className="text-lg md:text-xl text-muted leading-relaxed font-light">
              For the past six years, I've crafted scroll-stopping visuals for myself and the brands I work with. Lately, I've been exploring AI as a creative playground, experimenting and having fun pushing ideas further.
            </p>

            <div className="flex flex-wrap gap-3 mt-4">
              {tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                  className="px-6 py-3 border border-white/10 rounded-full text-xs font-semibold tracking-widest uppercase text-zinc-400 hover:text-accent hover:border-accent hover:bg-accent/5 transition-colors cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* YouTube Section Integration */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-40"
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-[1px] bg-accent" />
              <h3 className="text-2xl md:text-4xl font-light tracking-wide text-foreground uppercase">
                Director's <span className="font-bold italic">Cut.</span>
              </h3>
            </div>
            <a 
              href="https://youtube.com/@standrew0x" 
              target="_blank" 
              rel="noreferrer"
              className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-muted hover:text-foreground transition-colors"
            >
              Subscribe
              <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-foreground transition-colors group-hover:bg-white group-hover:text-black">
                <Play className="w-3 h-3 ml-0.5 fill-current" />
              </span>
            </a>
          </div>
          
          <div className="w-full aspect-video md:aspect-[21/9] rounded-none md:rounded-2xl overflow-hidden bg-black border border-white/5 relative group cursor-pointer shadow-2xl shadow-black/50">
            <iframe 
               src="https://www.youtube.com/embed/TvuVZQ-WNT4?autoplay=0&controls=1&modestbranding=1&rel=0"
               className="w-full h-full absolute inset-0 mix-blend-luminosity group-hover:mix-blend-normal transition-all duration-[1000ms] ease-out scale-105 group-hover:scale-100"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
               title="YouTube Breakdown"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
