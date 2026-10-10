import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { leadershipExperiences } from "@/db/schema";
import { eq } from "drizzle-orm";
import Sidebar from "@/components/dashboard/Sidebar";
import LeadershipManager from "@/components/dashboard/LeadershipManager";

export default async function LeadershipPage() {
  const session = await getSession();
  if (!session) redirect("/dashboard/login");

  const experiences = await db
    .select()
    .from(leadershipExperiences)
    .where(eq(leadershipExperiences.userId, session.userId));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar username={session.username} />
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <div className="max-w-3xl mx-auto">
          <LeadershipManager initialExperiences={experiences} />
        </div>
      </main>
    </div>
  );
}
