import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { users, profiles, projects, skills, leadershipExperiences, interests } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params;

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Portfolio not found" },
        { status: 404 }
      );
    }

    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, user.id));

    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, user.id))
      .orderBy(projects.displayOrder);

    const userSkills = await db
      .select()
      .from(skills)
      .where(eq(skills.userId, user.id));

    const userLeadership = await db
      .select()
      .from(leadershipExperiences)
      .where(eq(leadershipExperiences.userId, user.id));

    const userInterests = await db
      .select()
      .from(interests)
      .where(eq(interests.userId, user.id));

    const parsedProjects = userProjects.map((p) => ({
      ...p,
      technologies: (() => {
        try {
          return JSON.parse(p.technologies) as string[];
        } catch {
          return [];
        }
      })(),
    }));

    return NextResponse.json({
      success: true,
      data: {
        username: user.username,
        profile: profile
          ? {
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
            }
          : null,
        projects: parsedProjects,
        skills: userSkills,
        leadershipExperiences: userLeadership,
        interests: userInterests,
      },
    });
  } catch (err) {
    console.error("Portfolio fetch error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
