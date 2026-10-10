import type { PublicInterest } from "@/types";
import AnimatedSection from "./AnimatedSection";

interface InterestsProps {
  interests: PublicInterest[];
}

const INTEREST_ICONS: Record<string, string> = {
  "Artificial Intelligence": "🤖",
  "Full-Stack Development": "🔗",
  "Scalable Distributed Systems": "🌐",
  "Agentic AI Workflows": "🧬",
};

const INTEREST_COLORS = [
  { bg: "linear-gradient(135deg, rgba(236,72,153,0.08), rgba(236,72,153,0.04))", border: "rgba(236,72,153,0.2)", color: "#db2777" },
  { bg: "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(59,130,246,0.04))", border: "rgba(59,130,246,0.2)", color: "#2563eb" },
  { bg: "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(139,92,246,0.04))", border: "rgba(139,92,246,0.2)", color: "#7c3aed" },
  { bg: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.04))", border: "rgba(245,158,11,0.2)", color: "#d97706" },
];

export default function Interests({ interests }: InterestsProps) {
  if (interests.length === 0) return null;

  return (
    <section id="interests" className="py-24 bg-gradient-to-br from-blue-50/30 via-white to-pink-50/30">
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
              Interests
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              What <span className="gradient-text">Drives Me</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              Areas I&apos;m passionate about and continuously exploring.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {interests.map((interest, idx) => {
            const colorConfig = INTEREST_COLORS[idx % INTEREST_COLORS.length];
            const icon = INTEREST_ICONS[interest.name] || "✨";

            return (
              <AnimatedSection key={interest.id} delay={idx * 100}>
                <div
                  className="rounded-3xl p-6 text-center card-hover border h-full flex flex-col items-center"
                  style={{
                    background: colorConfig.bg,
                    borderColor: colorConfig.border,
                  }}
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm"
                    style={{ background: "white" }}
                  >
                    {icon}
                  </div>
                  <h3
                    className="font-bold text-base text-center"
                    style={{ color: colorConfig.color }}
                  >
                    {interest.name}
                  </h3>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
