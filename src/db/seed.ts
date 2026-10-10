import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function seed() {
  console.log("🌱 Seeding database...");

  // ── Create user ──────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("EncoderX@2024", 10);

  // Delete existing user if present
  const existing = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.username, "hafsa-yousuf"));

  if (existing.length > 0) {
    console.log("Cleaning up existing data...");
    await db
      .delete(schema.users)
      .where(eq(schema.users.username, "hafsa-yousuf"));
  }

  const [user] = await db
    .insert(schema.users)
    .values({ username: "hafsa-yousuf", passwordHash })
    .returning();

  console.log("✅ User created:", user.username);

  // ── Create profile ────────────────────────────────────────────────────────────
  await db.insert(schema.profiles).values({
    userId: user.id,
    name: "Hafsa Yousuf",
    title: "Creative Full Stack Developer",
    summary:
      "Full Stack Software Engineer with expertise in React, Next.js, Spring Boot, and modern databases. Strong background in building scalable applications from database design to UI/UX implementation. Demonstrated leadership experience and passion for AI-driven solutions.",
    degree: "Bachelor of Software Engineering",
    institution: "Sir Syed University of Engineering & Technology (SSUET)",
    educationStatus: "Undergraduate",
    educationPeriod: "2024 – Present",
    currentSemester: "4th Semester completed",
    githubUrl: "https://github.com/example",
    linkedinUrl: "https://linkedin.com/in/example",
  });
  console.log("✅ Profile created");

  // ── Create projects ────────────────────────────────────────────────────────────
  const projectsData = [
    {
      userId: user.id,
      title: "SkillMatriX",
      description:
        "An AI-powered skill-gap analysis platform that helps users identify skills, explore career recommendations, and discover relevant opportunities.",
      detailedDescription:
        "Built using Next.js and React with a Spring Boot backend. Features PDF-based skill extraction, career recommendations, external job API integration, and structured backend APIs. Uses MySQL for data persistence.",
      category: "AI / Full Stack",
      technologies: JSON.stringify([
        "Next.js 15",
        "React 19",
        "Spring Boot 3",
        "MySQL",
        "TypeScript",
      ]),
      imageUrl: "",
      githubUrl: "https://github.com/example",
      liveDemoUrl: "https://example.com",
      displayOrder: 1,
    },
    {
      userId: user.id,
      title: "Bawarchee",
      description:
        "An AI-powered culinary and pantry management platform designed to help users manage household ingredients and generate personalized recipes.",
      detailedDescription:
        "Features multimodal receipt scanning, pantry/inventory management, dynamic household portion scaling, real-time recipe generation, automated inventory deduction, and AI-powered culinary assistance using Gemini 2.5 Flash.",
      category: "AI / Full Stack",
      technologies: JSON.stringify([
        "Next.js 14",
        "TypeScript",
        "Supabase",
        "Tailwind CSS",
        "Gemini 2.5 Flash",
      ]),
      imageUrl: "",
      githubUrl: "https://github.com/example",
      liveDemoUrl: "https://example.com",
      displayOrder: 2,
    },
    {
      userId: user.id,
      title: "NeXora",
      description:
        "A real-time disaster and civic management system designed for incident reporting, emergency coordination, resource allocation, and operational dashboards.",
      detailedDescription:
        "Features real-time incident reporting, interactive dashboards, emergency resource allocation, civic issue management. Built with Spring Boot backend, PostgreSQL database, and responsive React frontend using GSAP and Framer Motion animations.",
      category: "Civic Technology / Full Stack",
      technologies: JSON.stringify([
        "React 19",
        "Vite",
        "Spring Boot 3",
        "PostgreSQL",
        "GSAP",
        "Framer Motion",
      ]),
      imageUrl: "",
      githubUrl: "https://github.com/example",
      liveDemoUrl: "https://example.com",
      displayOrder: 3,
    },
    {
      userId: user.id,
      title: "AI Chatbot & Virtual Assistant",
      description:
        "A context-aware AI chatbot and virtual assistant featuring multiple conversational personalities, voice input/output, and text-to-speech functionality.",
      detailedDescription:
        "Built with Flask and Python, features context-aware conversations, multiple personalities, voice input, and text-to-speech responses. Uses SQLite for session storage.",
      category: "AI",
      technologies: JSON.stringify(["Flask", "SQLite", "Python"]),
      imageUrl: "",
      githubUrl: "https://github.com/example",
      liveDemoUrl: "https://example.com",
      displayOrder: 4,
    },
    {
      userId: user.id,
      title: "Pet Haven",
      description:
        "A desktop-based pet shop management application providing authentication, product management, shopping cart functionality, and sales tracking.",
      detailedDescription:
        "Built with JavaFX following MVC architecture. Features authentication, product catalog, shopping cart, and sales tracking with MySQL database.",
      category: "Desktop Application",
      technologies: JSON.stringify(["JavaFX", "MySQL", "Java", "MVC Architecture"]),
      imageUrl: "",
      githubUrl: "https://github.com/example",
      liveDemoUrl: "",
      displayOrder: 5,
    },
    {
      userId: user.id,
      title: "Star Coaching",
      description:
        "A responsive educational platform focused on modern UI/UX, smooth animations, and automated email communication.",
      detailedDescription:
        "Built with React and Vite, features responsive design, smooth animations, email integration via EmailJS, and modern UI/UX.",
      category: "Web Development",
      technologies: JSON.stringify(["React", "Vite", "EmailJS"]),
      imageUrl: "",
      githubUrl: "https://github.com/example",
      liveDemoUrl: "https://example.com",
      displayOrder: 6,
    },
  ];

  await db.insert(schema.projects).values(projectsData);
  console.log("✅ Projects created");

  // ── Create skills ─────────────────────────────────────────────────────────────
  const skillsData = [
    // Languages
    { userId: user.id, name: "Python", category: "Languages" },
    { userId: user.id, name: "Java", category: "Languages" },
    { userId: user.id, name: "C", category: "Languages" },
    { userId: user.id, name: "JavaScript", category: "Languages" },
    { userId: user.id, name: "TypeScript", category: "Languages" },
    // Frontend
    { userId: user.id, name: "React", category: "Frontend" },
    { userId: user.id, name: "Next.js", category: "Frontend" },
    { userId: user.id, name: "Vite", category: "Frontend" },
    { userId: user.id, name: "Tailwind CSS", category: "Frontend" },
    { userId: user.id, name: "GSAP", category: "Frontend" },
    { userId: user.id, name: "Framer Motion", category: "Frontend" },
    { userId: user.id, name: "JavaFX", category: "Frontend" },
    { userId: user.id, name: "HTML5", category: "Frontend" },
    { userId: user.id, name: "CSS3", category: "Frontend" },
    // Backend
    { userId: user.id, name: "Spring Boot", category: "Backend" },
    { userId: user.id, name: "Flask", category: "Backend" },
    { userId: user.id, name: "Node.js", category: "Backend" },
    { userId: user.id, name: "FastAPI", category: "Backend" },
    { userId: user.id, name: "REST APIs", category: "Backend" },
    // Databases
    { userId: user.id, name: "MySQL", category: "Databases" },
    { userId: user.id, name: "PostgreSQL", category: "Databases" },
    { userId: user.id, name: "SQLite", category: "Databases" },
    { userId: user.id, name: "MongoDB", category: "Databases" },
    // AI
    { userId: user.id, name: "Gemini API", category: "AI" },
    { userId: user.id, name: "AI Application Development", category: "AI" },
    { userId: user.id, name: "Prompt Engineering", category: "AI" },
    // Tools
    { userId: user.id, name: "Git", category: "Tools" },
    { userId: user.id, name: "GitHub", category: "Tools" },
    { userId: user.id, name: "VS Code", category: "Tools" },
    { userId: user.id, name: "Postman", category: "Tools" },
    { userId: user.id, name: "Maven", category: "Tools" },
    { userId: user.id, name: "IntelliJ IDEA", category: "Tools" },
  ];

  await db.insert(schema.skills).values(skillsData);
  console.log("✅ Skills created");

  // ── Create leadership experiences ─────────────────────────────────────────────
  await db.insert(schema.leadershipExperiences).values([
    {
      userId: user.id,
      role: "Class Representative (CR)",
      organization: "Sir Syed University of Engineering & Technology (SSUET)",
      description:
        "Coordinated communication between students and faculty, supported academic communication, managed class concerns, and represented student interests in departmental initiatives.",
      period: "2024 – Present",
      isCurrent: true,
    },
  ]);
  console.log("✅ Leadership experiences created");

  // ── Create interests ───────────────────────────────────────────────────────────
  await db.insert(schema.interests).values([
    { userId: user.id, name: "Artificial Intelligence" },
    { userId: user.id, name: "Full-Stack Development" },
    { userId: user.id, name: "Scalable Distributed Systems" },
    { userId: user.id, name: "Agentic AI Workflows" },
  ]);
  console.log("✅ Interests created");

  console.log("\n🎉 Database seeded successfully!");
  console.log("📧 Username: hafsa-yousuf");
  console.log("🔑 Password: EncoderX@2024");
  console.log("🌐 Public portfolio: /portfolio/hafsa-yousuf");

  await pool.end();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
