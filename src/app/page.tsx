import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, #f472b6, #ec4899)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, #60a5fa, #3b82f6)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "linear-gradient(135deg, #ec4899, #60a5fa)" }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium border border-pink-200 bg-pink-50 text-pink-600">
          <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
          EncoderX Remote Internship · Batch 02 · Week 03
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span className="gradient-text">Portfolio</span>
          <br />
          <span className="text-gray-900">Management</span>
          <br />
          <span className="text-gray-400 text-4xl md:text-5xl font-light">
            System
          </span>
        </h1>

        <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto leading-relaxed">
          A full-stack portfolio system where developers manage their portfolio
          through a protected creator dashboard and visitors view it via a unique
          username-based URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/portfolio/hafsa-yousuf" className="btn-primary text-base px-8 py-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            View Portfolio
          </Link>
          <Link href="/dashboard" className="btn-secondary text-base px-8 py-4">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Creator Dashboard
          </Link>
        </div>

        {/* Feature pills */}
        <div className="mt-16 flex flex-wrap gap-3 justify-center">
          {[
            "Dynamic Routing",
            "REST API",
            "PostgreSQL",
            "Authentication",
            "CRUD Operations",
            "Responsive UI",
            "TypeScript",
          ].map((f) => (
            <span
              key={f}
              className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600 border border-gray-200"
            >
              {f}
            </span>
          ))}
        </div>

      </div>
    </main>
  );
}
