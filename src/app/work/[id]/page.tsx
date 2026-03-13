import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { getDriveVideoEmbedUrl, getDriveImageEmbedUrl } from "@/lib/drive";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id === resolvedParams.id);

  if (!project) return notFound();

  const isVideoPlaceholder = !project.driveVideoUrl || project.driveVideoUrl.includes("placeholder");
  const videoEmbedUrl = isVideoPlaceholder ? "" : getDriveVideoEmbedUrl(project.driveVideoUrl);

  return (
    <main className="min-h-screen pt-32 pb-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/#work" className="inline-flex items-center text-muted hover:text-foreground transition-colors mb-12">
          <ArrowLeft size={20} className="mr-2" />
          Back to Work
        </Link>
        
        <header className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-4">{project.title}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-6">
            <span className="px-4 py-2 rounded-full border border-white/10 text-sm font-medium uppercase tracking-wider text-muted max-w-max">
              {project.category}
            </span>
            <p className="text-lg text-zinc-400 max-w-2xl">{project.description}</p>
          </div>
        </header>

        {/* Video Section */}
        <section className="mb-24">
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5 relative">
            {videoEmbedUrl ? (
              <iframe
                src={videoEmbedUrl}
                className="w-full h-full absolute inset-0"
                allow="autoplay"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 font-mono text-center px-6">
                <span>Main Video Area Placeholder</span>
                <span className="text-sm mt-2">Replace ID in projects.ts to view</span>
              </div>
            )}
          </div>
        </section>

        {/* GIFs Section */}
        {project.driveGifUrls.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl font-semibold mb-8">GIF Breakdowns</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.driveGifUrls.map((gif, idx) => {
                const gifUrl = getDriveImageEmbedUrl(gif);
                return (
                  <div key={idx} className="aspect-video bg-zinc-900 rounded-xl overflow-hidden border border-white/5 relative">
                    {gifUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={gifUrl} alt="GIF Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 font-mono text-sm">GIF Placeholder</div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Styleframes Section */}
        {project.styleframeUrls.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-8">Styleframes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {project.styleframeUrls.map((sf, idx) => {
                const sfUrl = getDriveImageEmbedUrl(sf);
                return (
                  <div key={idx} className="aspect-[4/3] bg-zinc-900 rounded-xl overflow-hidden border border-white/5 relative">
                    {sfUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={sfUrl} alt="Styleframe" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-500 font-mono text-sm">Styleframe Placeholder</div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
