import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import Sidebar from "@/components/dashboard/Sidebar";
import ProjectList from "@/components/dashboard/ProjectList";

export default async function ProjectsPage() {
  const session = await getSession();
  if (!session) redirect("/dashboard/login");

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, session.userId))
    .orderBy(projects.displayOrder);

  const parsedProjects = userProjects.map((p) => ({
    ...p,
    technologies: (() => {
      try { return JSON.parse(p.technologies) as string[]; } catch { return []; }
    })(),
  }));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar username={session.username} />
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <div className="max-w-4xl mx-auto">
          <ProjectList initialProjects={parsedProjects} />
        </div>
      </main>
    </div>
  );
}
