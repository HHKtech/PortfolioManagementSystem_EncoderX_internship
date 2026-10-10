import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { interests } from "@/db/schema";
import { eq } from "drizzle-orm";
import Sidebar from "@/components/dashboard/Sidebar";
import InterestManager from "@/components/dashboard/InterestManager";

export default async function InterestsPage() {
  const session = await getSession();
  if (!session) redirect("/dashboard/login");

  const userInterests = await db
    .select()
    .from(interests)
    .where(eq(interests.userId, session.userId));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar username={session.username} />
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <div className="max-w-3xl mx-auto">
          <InterestManager initialInterests={userInterests} />
        </div>
      </main>
    </div>
  );
}
