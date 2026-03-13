"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Project } from "@/data/projects";
import { useRef } from "react";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      {/* Title & Category above the image to act like a film title card */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 px-2">
        <h3 className="text-3xl md:text-5xl font-bold tracking-tighter text-foreground group-hover:text-accent transition-colors duration-500">
          {project.title}
        </h3>
        <p className="text-xs md:text-sm font-medium text-zinc-500 uppercase tracking-[0.2em] mt-2 md:mt-0">
          {project.category}
        </p>
      </div>

      <Link href={`/work/${project.id}`} className="block relative w-full aspect-video md:aspect-[21/9] rounded-none md:rounded-xl overflow-hidden bg-zinc-900 border border-white/5">
        
        {/* Parallax Container for the media */}
        <motion.div style={{ y }} className="absolute inset-[-5%] z-0 w-[110%] h-[110%]">
          {project.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={project.thumbnail} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-500">
              <span className="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-800">{project.title}</span>
            </div>
          )}
        </motion.div>
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10" />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 z-20 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center backdrop-blur-md">
          <span className="px-10 py-4 bg-foreground text-background rounded-full text-sm font-bold uppercase tracking-widest transform scale-90 group-hover:scale-100 transition-all duration-500 hover:bg-accent">
            View Project
          </span>
          <p className="mt-8 text-white/70 max-w-md text-center text-sm px-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100 font-light">
            {project.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
