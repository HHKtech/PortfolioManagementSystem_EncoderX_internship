import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { interests } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getSession } from "@/lib/auth";

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
    const interestId = parseInt(id);

    if (isNaN(interestId)) {
      return NextResponse.json(
        { success: false, error: "Invalid ID" },
        { status: 400 }
      );
    }

    const [existing] = await db
      .select()
      .from(interests)
      .where(
        and(
          eq(interests.id, interestId),
          eq(interests.userId, session.userId)
        )
      );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Interest not found" },
        { status: 404 }
      );
    }

    await db
      .delete(interests)
      .where(
        and(
          eq(interests.id, interestId),
          eq(interests.userId, session.userId)
        )
      );

    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (err) {
    console.error("Delete interest error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
