import type { PublicProject } from "@/types";
import ProjectCard from "./ProjectCard";
import AnimatedSection from "./AnimatedSection";

interface ProjectsProps {
  projects: PublicProject[];
}

export default function Projects({ projects }: ProjectsProps) {
  if (projects.length === 0) {
    return (
      <section id="projects" className="py-24 bg-gradient-to-br from-pink-50/30 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-500">No projects yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-gradient-to-br from-pink-50/30 via-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(59,130,246,0.1))",
                color: "#ec4899",
              }}
            >
              Portfolio Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              What I&apos;ve <span className="gradient-text">Built</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              A showcase of projects that demonstrate my skills in full-stack development, AI integration, and system design.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <AnimatedSection key={project.id} delay={idx * 80}>
              <ProjectCard project={project} index={idx} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
