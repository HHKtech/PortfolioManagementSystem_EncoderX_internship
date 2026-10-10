"use client";
import { useState } from "react";
import { SKILL_CATEGORIES } from "@/types";
import type { PublicSkill } from "@/types";
import Toast from "@/components/ui/Toast";

interface SkillManagerProps {
  initialSkills: PublicSkill[];
}

const CATEGORY_COLORS: Record<string, { bg: string; color: string; border: string }> = {
  Languages: { bg: "rgba(236,72,153,0.08)", color: "#db2777", border: "rgba(236,72,153,0.2)" },
  Frontend: { bg: "rgba(59,130,246,0.08)", color: "#2563eb", border: "rgba(59,130,246,0.2)" },
  Backend: { bg: "rgba(139,92,246,0.08)", color: "#7c3aed", border: "rgba(139,92,246,0.2)" },
  Databases: { bg: "rgba(20,184,166,0.08)", color: "#0d9488", border: "rgba(20,184,166,0.2)" },
  AI: { bg: "rgba(245,158,11,0.08)", color: "#d97706", border: "rgba(245,158,11,0.2)" },
  Tools: { bg: "rgba(16,185,129,0.08)", color: "#059669", border: "rgba(16,185,129,0.2)" },
};

export default function SkillManager({ initialSkills }: SkillManagerProps) {
  const [skills, setSkills] = useState<PublicSkill[]>(initialSkills);
  const [newSkill, setNewSkill] = useState<{ name: string; category: string }>({ name: "", category: SKILL_CATEGORIES[0] });
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingSkill, setEditingSkill] = useState<PublicSkill | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const grouped = SKILL_CATEGORIES.reduce<Record<string, PublicSkill[]>>((acc, cat) => {
    acc[cat] = skills.filter((s) => s.category === cat);
    return acc;
  }, {});

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newSkill.name.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/portfolio/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSkill),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setToast({ msg: json.error || "Failed to add skill", type: "error" });
        return;
      }
      setSkills((prev) => [...prev, json.data]);
      setNewSkill({ name: "", category: SKILL_CATEGORIES[0] });
      setToast({ msg: "Skill added!", type: "success" });
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/portfolio/skills/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setToast({ msg: json.error || "Failed to delete skill", type: "error" });
        return;
      }
      setSkills((prev) => prev.filter((s) => s.id !== id));
      setToast({ msg: "Skill removed.", type: "success" });
    } finally {
      setDeletingId(null);
    }
  }

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editingSkill) return;
    try {
      const res = await fetch(`/api/portfolio/skills/${editingSkill.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editingSkill.name, category: editingSkill.category }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setToast({ msg: json.error || "Failed to update skill", type: "error" });
        return;
      }
      setSkills((prev) => prev.map((s) => (s.id === editingSkill.id ? json.data : s)));
      setEditingSkill(null);
      setToast({ msg: "Skill updated!", type: "success" });
    } catch {
      setToast({ msg: "Network error.", type: "error" });
    }
  }

  const inputClass = "px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all";

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
          <p className="text-sm text-gray-500 mt-0.5">{skills.length} total skills</p>
        </div>
      </div>

      {/* Add skill form */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 text-sm">Add New Skill</h3>
        <form onSubmit={handleAdd} className="flex flex-wrap gap-3">
          <input
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="Skill name"
            className={`${inputClass} flex-1 min-w-40`}
          />
          <select
            value={newSkill.category}
            onChange={(e) =>
              setNewSkill((prev) => ({ ...prev, category: e.target.value }))
            }
            className={`${inputClass} bg-white`}
          >
            {SKILL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="submit"
            disabled={adding || !newSkill.name.trim()}
            className="btn-primary"
            style={{ opacity: adding ? 0.7 : 1 }}
          >
            {adding ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add
              </>
            )}
          </button>
        </form>
      </div>

      {/* Edit modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <h3 className="font-bold text-gray-900 mb-5">Edit Skill</h3>
            <form onSubmit={handleEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                  className={`${inputClass} w-full`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select
                  value={editingSkill.category}
                  onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                  className={`${inputClass} w-full bg-white`}
                >
                  {SKILL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="btn-primary flex-1 justify-center">Save</button>
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="flex-1 px-4 py-3 rounded-full text-sm font-semibold text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grouped skills */}
      <div className="space-y-4">
        {SKILL_CATEGORIES.map((cat) => {
          const catSkills = grouped[cat];
          if (catSkills.length === 0) return null;
          const colors = CATEGORY_COLORS[cat] || { bg: "rgba(236,72,153,0.08)", color: "#db2777", border: "rgba(236,72,153,0.2)" };

          return (
            <div key={cat} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 text-sm">{cat}</h3>
                <span className="text-xs text-gray-400">{catSkills.length} skills</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {catSkills.map((skill) => (
                  <span
                    key={skill.id}
                    className="flex items-center gap-2 pl-3 pr-1 py-1.5 rounded-full text-xs font-medium"
                    style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.border}` }}
                  >
                    {skill.name}
                    <div className="flex gap-0.5">
                      <button
                        onClick={() => setEditingSkill(skill)}
                        className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors text-xs"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(skill.id)}
                        disabled={deletingId === skill.id}
                        className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/50 transition-colors text-xs"
                        title="Delete"
                      >
                        {deletingId === skill.id ? "⏳" : "×"}
                      </button>
                    </div>
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {skills.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="text-4xl mb-3">🛠️</div>
            <p className="font-semibold text-gray-800 mb-1">No skills yet</p>
            <p className="text-sm text-gray-400">Add skills using the form above.</p>
          </div>
        )}
      </div>

      {toast && (
        <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
