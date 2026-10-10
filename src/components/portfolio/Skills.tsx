import type { PublicSkill } from "@/types";
import AnimatedSection from "./AnimatedSection";

interface SkillsProps {
  skills: PublicSkill[];
}

const CATEGORY_CONFIG: Record<string, { emoji: string; gradient: string; bg: string; color: string; border: string }> = {
  Languages: {
    emoji: "💻",
    gradient: "linear-gradient(135deg, #ec4899, #f472b6)",
    bg: "rgba(236,72,153,0.08)",
    color: "#db2777",
    border: "rgba(236,72,153,0.2)",
  },
  Frontend: {
    emoji: "🎨",
    gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)",
    bg: "rgba(59,130,246,0.08)",
    color: "#2563eb",
    border: "rgba(59,130,246,0.2)",
  },
  Backend: {
    emoji: "⚙️",
    gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    bg: "rgba(139,92,246,0.08)",
    color: "#7c3aed",
    border: "rgba(139,92,246,0.2)",
  },
  Databases: {
    emoji: "🗄️",
    gradient: "linear-gradient(135deg, #14b8a6, #2dd4bf)",
    bg: "rgba(20,184,166,0.08)",
    color: "#0d9488",
    border: "rgba(20,184,166,0.2)",
  },
  AI: {
    emoji: "🤖",
    gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
    bg: "rgba(245,158,11,0.08)",
    color: "#d97706",
    border: "rgba(245,158,11,0.2)",
  },
  Tools: {
    emoji: "🛠️",
    gradient: "linear-gradient(135deg, #10b981, #34d399)",
    bg: "rgba(16,185,129,0.08)",
    color: "#059669",
    border: "rgba(16,185,129,0.2)",
  },
};

const CATEGORY_ORDER = ["Languages", "Frontend", "Backend", "Databases", "AI", "Tools"];

export default function Skills({ skills }: SkillsProps) {
  const grouped = CATEGORY_ORDER.reduce<Record<string, PublicSkill[]>>(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat);
      return acc;
    },
    {}
  );

  // Also grab any categories not in order
  const extraCategories = [...new Set(skills.map((s) => s.category))].filter(
    (c) => !CATEGORY_ORDER.includes(c)
  );
  extraCategories.forEach((cat) => {
    grouped[cat] = skills.filter((s) => s.category === cat);
  });

  const allCategories = [...CATEGORY_ORDER, ...extraCategories].filter(
    (cat) => grouped[cat] && grouped[cat].length > 0
  );

  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(59,130,246,0.1))",
                color: "#ec4899",
              }}
            >
              Technical Skills
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              My <span className="gradient-text">Expertise</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              A diverse set of technologies I work with to build modern, scalable applications.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCategories.map((category, idx) => {
            const config = CATEGORY_CONFIG[category] || {
              emoji: "⭐",
              gradient: "linear-gradient(135deg, #ec4899, #3b82f6)",
              bg: "rgba(236,72,153,0.08)",
              color: "#ec4899",
              border: "rgba(236,72,153,0.2)",
            };
            const catSkills = grouped[category];

            return (
              <AnimatedSection key={category} delay={idx * 80}>
                <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 card-hover h-full">
                  {/* Category header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-sm"
                      style={{ background: config.gradient }}
                    >
                      {config.emoji}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{category}</h3>
                      <p className="text-xs text-gray-400">{catSkills.length} skills</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {catSkills.map((skill) => (
                      <span
                        key={skill.id}
                        className="skill-badge"
                        style={{
                          background: config.bg,
                          color: config.color,
                          border: `1px solid ${config.border}`,
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
