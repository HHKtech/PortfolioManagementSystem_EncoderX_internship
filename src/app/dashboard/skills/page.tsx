import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { skills } from "@/db/schema";
import { eq } from "drizzle-orm";
import Sidebar from "@/components/dashboard/Sidebar";
import SkillManager from "@/components/dashboard/SkillManager";

export default async function SkillsPage() {
  const session = await getSession();
  if (!session) redirect("/dashboard/login");

  const userSkills = await db
    .select()
    .from(skills)
    .where(eq(skills.userId, session.userId));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar username={session.username} />
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <div className="max-w-4xl mx-auto">
          <SkillManager initialSkills={userSkills} />
        </div>
      </main>
    </div>
  );
}
