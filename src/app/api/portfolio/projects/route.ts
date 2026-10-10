import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { projectSchema } from "@/lib/validation";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userProjects = await db
      .select()
      .from(projects)
      .where(eq(projects.userId, session.userId))
      .orderBy(projects.displayOrder);

    const parsed = userProjects.map((p) => ({
      ...p,
      technologies: (() => {
        try {
          return JSON.parse(p.technologies) as string[];
        } catch {
          return [];
        }
      })(),
    }));

    return NextResponse.json({ success: true, data: parsed });
  } catch (err) {
    console.error("Get projects error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { technologies, ...rest } = parsed.data;

    const [project] = await db
      .insert(projects)
      .values({
        ...rest,
        technologies: JSON.stringify(technologies || []),
        userId: session.userId,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        data: {
          ...project,
          technologies: technologies || [],
        },
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Create project error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
