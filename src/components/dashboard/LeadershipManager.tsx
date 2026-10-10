"use client";
import { useState } from "react";
import type { PublicLeadership } from "@/types";
import Toast from "@/components/ui/Toast";

interface LeadershipManagerProps {
  initialExperiences: PublicLeadership[];
}

interface FormData {
  role: string;
  organization: string;
  description: string;
  period: string;
  isCurrent: boolean;
}

const EMPTY_FORM: FormData = {
  role: "",
  organization: "",
  description: "",
  period: "",
  isCurrent: false,
};

export default function LeadershipManager({ initialExperiences }: LeadershipManagerProps) {
  const [experiences, setExperiences] = useState<PublicLeadership[]>(initialExperiences);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  function openEdit(exp: PublicLeadership) {
    setEditingId(exp.id);
    setForm({
      role: exp.role,
      organization: exp.organization,
      description: exp.description ?? "",
      period: exp.period ?? "",
      isCurrent: exp.isCurrent,
    });
    setShowForm(true);
  }

  function openAdd() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editingId
        ? `/api/portfolio/leadership/${editingId}`
        : "/api/portfolio/leadership";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();

      if (!res.ok || !json.success) {
        setToast({ msg: json.error || "Failed to save", type: "error" });
        return;
      }

      if (editingId) {
        setExperiences((prev) =>
          prev.map((e) => (e.id === editingId ? json.data : e))
        );
        setToast({ msg: "Experience updated!", type: "success" });
      } else {
        setExperiences((prev) => [...prev, json.data]);
        setToast({ msg: "Experience added!", type: "success" });
      }
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this leadership experience?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/portfolio/leadership/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setToast({ msg: json.error || "Failed to delete", type: "error" });
        return;
      }
      setExperiences((prev) => prev.filter((e) => e.id !== id));
      setToast({ msg: "Experience deleted.", type: "success" });
    } finally {
      setDeletingId(null);
    }
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leadership</h2>
          <p className="text-sm text-gray-500 mt-0.5">{experiences.length} experience{experiences.length !== 1 ? "s" : ""}</p>
        </div>
        {!showForm && (
          <button onClick={openAdd} className="btn-primary">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Experience
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-2xl p-6 border border-pink-100 shadow-sm mb-6">
          <h3 className="font-bold text-gray-900 mb-5">
            {editingId ? "Edit Experience" : "New Leadership Experience"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Role *</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  placeholder="Class Representative"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Organization *</label>
                <input
                  type="text"
                  value={form.organization}
                  onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
                  placeholder="University Name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Period</label>
                <input
                  type="text"
                  value={form.period}
                  onChange={(e) => setForm((f) => ({ ...f, period: e.target.value }))}
                  placeholder="2024 – Present"
                  className={inputClass}
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isCurrent}
                    onChange={(e) => setForm((f) => ({ ...f, isCurrent: e.target.checked }))}
                    className="w-4 h-4 rounded accent-pink-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Currently active</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Describe your responsibilities..."
                className={`${inputClass} resize-none`}
              />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={saving} className="btn-primary" style={{ opacity: saving ? 0.7 : 1 }}>
                {saving ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {editingId ? "Update" : "Add"} Experience
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 rounded-full text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {experiences.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="font-bold text-gray-900 mb-2">No leadership experiences yet</h3>
          <p className="text-gray-400 text-sm">Add your leadership roles to showcase your impact.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">{exp.role}</h3>
                    {exp.isCurrent && (
                      <span
                        className="px-2 py-0.5 text-xs font-semibold rounded-full"
                        style={{ background: "rgba(16,185,129,0.1)", color: "#059669" }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-pink-600 mb-1">{exp.organization}</p>
                  {exp.period && <p className="text-xs text-gray-400 mb-2">📅 {exp.period}</p>}
                  {exp.description && (
                    <p className="text-sm text-gray-500">{exp.description}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(exp)}
                    className="px-3 py-2 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    disabled={deletingId === exp.id}
                    className="px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
                  >
                    {deletingId === exp.id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {toast && (
        <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
