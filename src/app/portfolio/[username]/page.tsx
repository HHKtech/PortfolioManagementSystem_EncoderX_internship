import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { PortfolioData } from "@/types";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Leadership from "@/components/portfolio/Leadership";
import Interests from "@/components/portfolio/Interests";
import Footer from "@/components/portfolio/Footer";
import PortfolioNav from "@/components/portfolio/PortfolioNav";
import { db } from "@/db";
import { users, profiles, projects, skills, leadershipExperiences, interests } from "@/db/schema";
import { eq } from "drizzle-orm";

interface PageProps {
  params: Promise<{ username: string }>;
}

async function getPortfolioData(username: string): Promise<PortfolioData | null> {
  const [user] = await db.select().from(users).where(eq(users.username, username));
  if (!user) return null;

  const [profile] = await db.select().from(profiles).where(eq(profiles.userId, user.id));
  if (!profile) return null;

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, user.id))
    .orderBy(projects.displayOrder);

  const userSkills = await db.select().from(skills).where(eq(skills.userId, user.id));

  const userLeadership = await db
    .select()
    .from(leadershipExperiences)
    .where(eq(leadershipExperiences.userId, user.id));

  const userInterests = await db.select().from(interests).where(eq(interests.userId, user.id));

  return {
    username: user.username,
    profile: {
      name: profile.name,
      title: profile.title,
      summary: profile.summary,
      degree: profile.degree,
      institution: profile.institution,
      educationStatus: profile.educationStatus,
      educationPeriod: profile.educationPeriod,
      currentSemester: profile.currentSemester,
      githubUrl: profile.githubUrl,
      linkedinUrl: profile.linkedinUrl,
    },
    projects: userProjects.map((p) => ({
      ...p,
      technologies: (() => {
        try { return JSON.parse(p.technologies) as string[]; } catch { return []; }
      })(),
    })),
    skills: userSkills,
    leadershipExperiences: userLeadership,
    interests: userInterests,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const data = await getPortfolioData(username);
  if (!data) return { title: "Portfolio Not Found" };
  return {
    title: `${data.profile.name} | Portfolio`,
    description: data.profile.summary ?? `Portfolio of ${data.profile.name}`,
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { username } = await params;
  const data = await getPortfolioData(username);

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <PortfolioNav name={data.profile.name} />
      <Hero profile={data.profile} username={data.username} />
      <About profile={data.profile} />
      <Skills skills={data.skills} />
      <Projects projects={data.projects} />
      <Leadership experiences={data.leadershipExperiences} />
      <Interests interests={data.interests} />
      <Footer profile={data.profile} username={data.username} />
    </div>
  );
}
