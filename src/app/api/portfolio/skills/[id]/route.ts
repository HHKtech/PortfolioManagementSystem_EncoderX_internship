import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { skillSchema } from "@/lib/validation";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const skillId = parseInt(id);

    if (isNaN(skillId)) {
      return NextResponse.json(
        { success: false, error: "Invalid skill ID" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = skillSchema.safeParse(body);

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

    const [existing] = await db
      .select()
      .from(skills)
      .where(and(eq(skills.id, skillId), eq(skills.userId, session.userId)));

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 }
      );
    }

    const [updated] = await db
      .update(skills)
      .set(parsed.data)
      .where(and(eq(skills.id, skillId), eq(skills.userId, session.userId)))
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("Update skill error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const skillId = parseInt(id);

    if (isNaN(skillId)) {
      return NextResponse.json(
        { success: false, error: "Invalid skill ID" },
        { status: 400 }
      );
    }

    const [existing] = await db
      .select()
      .from(skills)
      .where(and(eq(skills.id, skillId), eq(skills.userId, session.userId)));

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Skill not found" },
        { status: 404 }
      );
    }

    await db
      .delete(skills)
      .where(and(eq(skills.id, skillId), eq(skills.userId, session.userId)));

    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (err) {
    console.error("Delete skill error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
