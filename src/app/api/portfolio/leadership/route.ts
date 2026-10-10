import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leadershipExperiences } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { leadershipSchema } from "@/lib/validation";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const experiences = await db
      .select()
      .from(leadershipExperiences)
      .where(eq(leadershipExperiences.userId, session.userId));

    return NextResponse.json({ success: true, data: experiences });
  } catch (err) {
    console.error("Get leadership error:", err);
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
    const parsed = leadershipSchema.safeParse(body);

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

    const [experience] = await db
      .insert(leadershipExperiences)
      .values({ ...parsed.data, userId: session.userId })
      .returning();

    return NextResponse.json(
      { success: true, data: experience },
      { status: 201 }
    );
  } catch (err) {
    console.error("Create leadership error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
