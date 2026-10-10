import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import Sidebar from "@/components/dashboard/Sidebar";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/dashboard/login");

  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, session.userId));

  const initialData = {
    name: profile?.name ?? "",
    title: profile?.title ?? "",
    summary: profile?.summary ?? "",
    degree: profile?.degree ?? "",
    institution: profile?.institution ?? "",
    educationStatus: profile?.educationStatus ?? "",
    educationPeriod: profile?.educationPeriod ?? "",
    currentSemester: profile?.currentSemester ?? "",
    githubUrl: profile?.githubUrl ?? "",
    linkedinUrl: profile?.linkedinUrl ?? "",
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar username={session.username} />
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">Profile</h1>
            <p className="text-gray-500 mt-1">
              Update your professional information and education details.
            </p>
          </div>
          <ProfileForm initialData={initialData} />
        </div>
      </main>
    </div>
  );
}
