import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { profiles, projects, skills, leadershipExperiences, interests } from "@/db/schema";
import { eq } from "drizzle-orm";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/dashboard/login");

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, session.userId));

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, session.userId));

  const userSkills = await db
    .select()
    .from(skills)
    .where(eq(skills.userId, session.userId));

  const userLeadership = await db
    .select()
    .from(leadershipExperiences)
    .where(eq(leadershipExperiences.userId, session.userId));

  const userInterests = await db
    .select()
    .from(interests)
    .where(eq(interests.userId, session.userId));

  const stats = [
    {
      label: "Projects",
      value: userProjects.length,
      icon: "🚀",
      href: "/dashboard/projects",
      gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    },
    {
      label: "Skills",
      value: userSkills.length,
      icon: "🛠️",
      href: "/dashboard/skills",
      gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    },
    {
      label: "Leadership",
      value: userLeadership.length,
      icon: "🏆",
      href: "/dashboard/leadership",
      gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    },
    {
      label: "Interests",
      value: userInterests.length,
      icon: "✨",
      href: "/dashboard/interests",
      gradient: "linear-gradient(135deg, #10b981, #34d399)",
    },
  ];

  const quickLinks = [
    { label: "Edit Profile", href: "/dashboard/profile", desc: "Update your bio and education" },
    { label: "Manage Projects", href: "/dashboard/projects", desc: "Add, edit, or remove projects" },
    { label: "Update Skills", href: "/dashboard/skills", desc: "Manage your skill set" },
    { label: "View Portfolio", href: `/portfolio/${session.username}`, desc: "See your public portfolio", external: true },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar username={session.username} />
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              Welcome back,{" "}
              <span className="gradient-text">
                {profile?.name?.split(" ")[0] ?? session.username}
              </span>
              ! 👋
            </h1>
            <p className="text-gray-500 mt-1">
              Here&apos;s an overview of your portfolio.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 shadow-sm"
                  style={{ background: stat.gradient }}
                >
                  {stat.icon}
                </div>
                <div className="text-2xl font-black text-gray-900 mb-0.5">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
              </Link>
            ))}
          </div>

          {/* Portfolio info */}
          {profile && (
            <div
              className="rounded-2xl p-6 mb-8 border"
              style={{
                background: "linear-gradient(135deg, rgba(236,72,153,0.04), rgba(59,130,246,0.04))",
                borderColor: "rgba(236,72,153,0.15)",
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Your public portfolio URL</p>
                  <div className="flex items-center gap-2">
                    <code
                      className="text-sm font-mono px-3 py-1.5 rounded-lg"
                      style={{ background: "rgba(236,72,153,0.1)", color: "#db2777" }}
                    >
                      /portfolio/{session.username}
                    </code>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/portfolio/${session.username}`}
                    target="_blank"
                    className="btn-primary text-sm px-5 py-2.5"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Quick links */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="font-bold text-gray-900 mb-5">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-pink-200 hover:bg-pink-50/30 transition-all group"
                >
                  <div>
                    <p className="font-semibold text-gray-900 text-sm group-hover:text-pink-600 transition-colors">
                      {link.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{link.desc}</p>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-300 group-hover:text-pink-400 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
