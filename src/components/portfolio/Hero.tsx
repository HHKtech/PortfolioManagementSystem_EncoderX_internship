"use client";
import { useEffect, useState } from "react";
import type { PublicProfile } from "@/types";

interface HeroProps {
  profile: PublicProfile;
  username: string;
}

export default function Hero({ profile, username }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-white"
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, #ec4899, #f472b6)",
            animation: "float 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
          style={{
            background: "radial-gradient(circle, #3b82f6, #60a5fa)",
            animation: "float 10s ease-in-out infinite reverse",
          }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #ec4899, #3b82f6)",
            animation: "float 12s ease-in-out infinite 2s",
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ec4899 1px, transparent 1px), linear-gradient(90deg, #ec4899 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div
            className={`transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {/* Greeting badge */}
            <div
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-sm font-medium border"
              style={{
                borderColor: "rgba(236,72,153,0.3)",
                background: "rgba(253,242,248,0.8)",
                color: "#db2777",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "#ec4899",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              Hello, I&apos;m
            </div>

            {/* Name */}
            <h1 className="text-5xl md:text-7xl font-black mb-4 leading-tight">
              <span className="gradient-text">{profile.name}</span>
            </h1>

            {/* Title */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="h-1 w-12 rounded-full"
                style={{ background: "linear-gradient(90deg, #ec4899, #3b82f6)" }}
              />
              <p className="text-xl md:text-2xl font-semibold text-gray-600">
                {profile.title}
              </p>
            </div>

            {/* Summary */}
            <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-xl">
              {profile.summary}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn-primary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Explore My Work
              </a>
              <a href="#about" className="btn-secondary">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                About Me
              </a>
              {profile.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-gray-200 text-gray-600 font-medium text-sm hover:border-gray-400 transition-all hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              )}
            </div>

            {/* Username pill */}
            <div className="mt-8 inline-flex items-center gap-2 text-sm text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              portfolio/{username}
            </div>
          </div>

          {/* Right: Visual element */}
          <div
            className={`relative flex items-center justify-center transition-all duration-1000 delay-300 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            {/* Central orb */}
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Outer ring */}
              <div
                className="absolute inset-0 rounded-full border-2 opacity-30"
                style={{
                  borderColor: "#ec4899",
                  animation: "spin 20s linear infinite",
                  borderStyle: "dashed",
                }}
              />
              {/* Middle ring */}
              <div
                className="absolute inset-6 rounded-full border-2 opacity-20"
                style={{
                  borderColor: "#3b82f6",
                  animation: "spin 15s linear infinite reverse",
                }}
              />
              {/* Inner gradient circle */}
              <div
                className="absolute inset-12 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(59,130,246,0.15))",
                  border: "1px solid rgba(236,72,153,0.2)",
                  animation: "pulse-glow 3s ease-in-out infinite",
                }}
              >
                {/* Initials */}
                <div
                  className="text-5xl md:text-6xl font-black"
                  style={{
                    background: "linear-gradient(135deg, #ec4899, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  HY
                </div>
              </div>

              {/* Floating tech chips */}
              {[
                {
                  label: "Next.js",
                  top: "5%",
                  left: "70%",
                  color: "#1f2937",
                  bg: "#f3f4f6",
                  delay: "0s",
                },
                {
                  label: "React",
                  top: "75%",
                  left: "75%",
                  color: "#0891b2",
                  bg: "#e0f2fe",
                  delay: "1s",
                },
                {
                  label: "Spring Boot",
                  top: "80%",
                  left: "5%",
                  color: "#15803d",
                  bg: "#dcfce7",
                  delay: "2s",
                },
                {
                  label: "TypeScript",
                  top: "10%",
                  left: "0%",
                  color: "#1d4ed8",
                  bg: "#dbeafe",
                  delay: "0.5s",
                },
                {
                  label: "AI/ML",
                  top: "45%",
                  left: "85%",
                  color: "#9333ea",
                  bg: "#f3e8ff",
                  delay: "1.5s",
                },
              ].map((chip) => (
                <div
                  key={chip.label}
                  className="absolute px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm whitespace-nowrap"
                  style={{
                    top: chip.top,
                    left: chip.left,
                    color: chip.color,
                    background: chip.bg,
                    border: `1px solid ${chip.color}22`,
                    animation: `float 4s ease-in-out infinite ${chip.delay}`,
                  }}
                >
                  {chip.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-xs">
          <span>Scroll to explore</span>
          <div
            className="w-5 h-8 border-2 border-gray-300 rounded-full flex justify-center pt-1.5"
          >
            <div
              className="w-1.5 h-1.5 bg-gray-400 rounded-full"
              style={{ animation: "bounce 1.5s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}
