import type { PublicLeadership } from "@/types";
import AnimatedSection from "./AnimatedSection";

interface LeadershipProps {
  experiences: PublicLeadership[];
}

export default function Leadership({ experiences }: LeadershipProps) {
  if (experiences.length === 0) return null;

  return (
    <section id="leadership" className="py-24 bg-white">
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
              Leadership
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Beyond <span className="gradient-text">Code</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto space-y-6">
          {experiences.map((exp, idx) => (
            <AnimatedSection key={exp.id} delay={idx * 100}>
              <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-sm overflow-hidden card-hover">
                {/* Decorative gradient stripe */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-3xl"
                  style={{ background: "linear-gradient(180deg, #ec4899, #3b82f6)" }}
                />

                <div className="ml-4">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-2xl">🏆</span>
                        <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                        {exp.isCurrent && (
                          <span
                            className="px-2.5 py-0.5 text-xs font-semibold rounded-full"
                            style={{
                              background: "rgba(16,185,129,0.1)",
                              color: "#059669",
                            }}
                          >
                            Current
                          </span>
                        )}
                      </div>
                      <p
                        className="font-semibold text-base"
                        style={{ color: "#ec4899" }}
                      >
                        {exp.organization}
                      </p>
                    </div>
                    {exp.period && (
                      <span
                        className="px-3 py-1 text-sm font-medium rounded-full"
                        style={{
                          background: "rgba(59,130,246,0.08)",
                          color: "#2563eb",
                          border: "1px solid rgba(59,130,246,0.15)",
                        }}
                      >
                        📅 {exp.period}
                      </span>
                    )}
                  </div>

                  {exp.description && (
                    <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
