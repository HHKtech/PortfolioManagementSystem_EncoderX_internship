import type { PublicProfile } from "@/types";
import AnimatedSection from "./AnimatedSection";

interface AboutProps {
  profile: PublicProfile;
}

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="py-24 bg-gradient-to-br from-pink-50/50 via-white to-blue-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4" style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(59,130,246,0.1))", color: "#ec4899" }}>
              About Me
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">
              Who I <span className="gradient-text">Am</span>
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Summary */}
          <AnimatedSection delay={100}>
            <div className="relative">
              <div
                className="absolute -top-4 -left-4 w-24 h-24 rounded-full opacity-20 blur-xl"
                style={{ background: "#ec4899" }}
              />
              <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-pink-100">
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                    style={{ background: "linear-gradient(135deg, #ec4899, #f472b6)" }}
                  >
                    👩‍💻
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Professional Summary</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {profile.summary}
                </p>

                {/* Soft skills pills */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Problem Solving", "Leadership", "Communication", "Teamwork", "Time Management", "Adaptability", "System Design"].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-xs font-medium rounded-full"
                      style={{ background: "rgba(236,72,153,0.08)", color: "#db2777", border: "1px solid rgba(236,72,153,0.15)" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Education */}
          {profile.degree && (
            <AnimatedSection delay={200}>
              <div className="relative">
                <div
                  className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-20 blur-xl"
                  style={{ background: "#3b82f6" }}
                />
                <div className="relative bg-white rounded-3xl p-8 shadow-sm border border-blue-100">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                      style={{ background: "linear-gradient(135deg, #3b82f6, #60a5fa)" }}
                    >
                      🎓
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Education</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900">{profile.degree}</h4>
                      <p className="text-blue-600 font-medium mt-1">{profile.institution}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {profile.educationStatus && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: "rgba(59,130,246,0.08)", color: "#2563eb", border: "1px solid rgba(59,130,246,0.15)" }}>
                          {profile.educationStatus}
                        </span>
                      )}
                      {profile.educationPeriod && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: "rgba(59,130,246,0.08)", color: "#2563eb", border: "1px solid rgba(59,130,246,0.15)" }}>
                          📅 {profile.educationPeriod}
                        </span>
                      )}
                      {profile.currentSemester && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full" style={{ background: "rgba(236,72,153,0.08)", color: "#db2777", border: "1px solid rgba(236,72,153,0.15)" }}>
                          📚 {profile.currentSemester}
                        </span>
                      )}
                    </div>

                    <div
                      className="mt-4 p-4 rounded-2xl"
                      style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.05), rgba(236,72,153,0.05))" }}
                    >
                      <p className="text-sm text-gray-500 leading-relaxed">
                        Currently pursuing a Bachelor's degree in Software Engineering, with a focus on modern full-stack development, AI applications, and scalable system design.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
}
