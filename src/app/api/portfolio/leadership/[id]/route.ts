import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { leadershipExperiences } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { leadershipSchema } from "@/lib/validation";

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
    const expId = parseInt(id);

    if (isNaN(expId)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
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

    const [existing] = await db
      .select()
      .from(leadershipExperiences)
      .where(
        and(
          eq(leadershipExperiences.id, expId),
          eq(leadershipExperiences.userId, session.userId)
        )
      );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Experience not found" },
        { status: 404 }
      );
    }

    const [updated] = await db
      .update(leadershipExperiences)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(
        and(
          eq(leadershipExperiences.id, expId),
          eq(leadershipExperiences.userId, session.userId)
        )
      )
      .returning();

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("Update leadership error:", err);
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
    const expId = parseInt(id);

    if (isNaN(expId)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const [existing] = await db
      .select()
      .from(leadershipExperiences)
      .where(
        and(
          eq(leadershipExperiences.id, expId),
          eq(leadershipExperiences.userId, session.userId)
        )
      );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Experience not found" },
        { status: 404 }
      );
    }

    await db
      .delete(leadershipExperiences)
      .where(
        and(
          eq(leadershipExperiences.id, expId),
          eq(leadershipExperiences.userId, session.userId)
        )
      );

    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (err) {
    console.error("Delete leadership error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
