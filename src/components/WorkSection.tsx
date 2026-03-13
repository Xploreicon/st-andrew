import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function WorkSection() {
  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-background relative z-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-foreground lowercase">
            selected<br />
            <span className="text-muted italic font-light ml-8 md:ml-12">works.</span>
          </h2>
          <p className="text-sm tracking-widest uppercase text-muted font-medium mt-6 md:mt-0">
            01 — Portfolio 
          </p>
        </div>
        
        <div className="flex flex-col gap-24 md:gap-40">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
