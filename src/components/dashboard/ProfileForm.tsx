"use client";
import { useState } from "react";
import Toast from "@/components/ui/Toast";

interface ProfileData {
  name: string;
  title: string;
  summary: string;
  degree: string;
  institution: string;
  educationStatus: string;
  educationPeriod: string;
  currentSemester: string;
  githubUrl: string;
  linkedinUrl: string;
}

interface ProfileFormProps {
  initialData: ProfileData;
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [data, setData] = useState<ProfileData>(initialData);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  function handleChange(field: keyof ProfileData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: [] }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrors({});

    try {
      const res = await fetch("/api/portfolio/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        if (json.errors) setErrors(json.errors);
        setToast({ msg: json.error || "Failed to save profile", type: "error" });
      } else {
        setToast({ msg: "Profile saved successfully!", type: "success" });
      }
    } catch {
      setToast({ msg: "Network error. Please try again.", type: "error" });
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border text-sm transition-all outline-none focus:ring-2";
  const baseStyle = { borderColor: "#e5e7eb" };
  const focusStyle = "focus:border-pink-300 focus:ring-pink-100";

  const Field = ({
    label,
    field,
    type = "text",
    placeholder,
    textarea = false,
    rows = 3,
  }: {
    label: string;
    field: keyof ProfileData;
    type?: string;
    placeholder?: string;
    textarea?: boolean;
    rows?: number;
  }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
      {textarea ? (
        <textarea
          rows={rows}
          value={data[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} ${focusStyle} resize-none`}
          style={baseStyle}
        />
      ) : (
        <input
          type={type}
          value={data[field]}
          onChange={(e) => handleChange(field, e.target.value)}
          placeholder={placeholder}
          className={`${inputClass} ${focusStyle}`}
          style={baseStyle}
        />
      )}
      {errors[field] && (
        <p className="mt-1 text-xs text-red-500">{errors[field][0]}</p>
      )}
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(236,72,153,0.1)", color: "#ec4899" }}>👤</span>
            Basic Information
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full Name *" field="name" placeholder="Hafsa Yousuf" />
            <Field label="Professional Title *" field="title" placeholder="Creative Full Stack Developer" />
          </div>
          <div className="mt-4">
            <Field
              label="Professional Summary"
              field="summary"
              textarea
              rows={4}
              placeholder="Brief professional summary..."
            />
          </div>
        </div>

        {/* Education */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>🎓</span>
            Education
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Degree" field="degree" placeholder="Bachelor of Software Engineering" />
            <Field label="Institution" field="institution" placeholder="University Name" />
            <Field label="Status" field="educationStatus" placeholder="Undergraduate" />
            <Field label="Period" field="educationPeriod" placeholder="2024 – Present" />
            <Field label="Current Semester" field="currentSemester" placeholder="4th Semester" />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(139,92,246,0.1)", color: "#7c3aed" }}>🔗</span>
            Social Links
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field
              label="GitHub URL"
              field="githubUrl"
              type="url"
              placeholder="https://github.com/example"
            />
            <Field
              label="LinkedIn URL"
              field="linkedinUrl"
              type="url"
              placeholder="https://linkedin.com/in/example"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="btn-primary"
          style={{ opacity: saving ? 0.7 : 1 }}
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Save Profile
            </>
          )}
        </button>
      </form>

      {toast && (
        <Toast
          message={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
