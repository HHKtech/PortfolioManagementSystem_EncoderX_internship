import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { interests } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth";
import { interestSchema } from "@/lib/validation";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userInterests = await db
      .select()
      .from(interests)
      .where(eq(interests.userId, session.userId));

    return NextResponse.json({ success: true, data: userInterests });
  } catch (err) {
    console.error("Get interests error:", err);
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
    const parsed = interestSchema.safeParse(body);

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

    const [interest] = await db
      .insert(interests)
      .values({ ...parsed.data, userId: session.userId })
      .returning();

    return NextResponse.json(
      { success: true, data: interest },
      { status: 201 }
    );
  } catch (err) {
    console.error("Create interest error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
