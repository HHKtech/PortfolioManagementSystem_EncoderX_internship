"use client";
import { useState } from "react";
import type { PublicInterest } from "@/types";
import Toast from "@/components/ui/Toast";

interface InterestManagerProps {
  initialInterests: PublicInterest[];
}

export default function InterestManager({ initialInterests }: InterestManagerProps) {
  const [interestsList, setInterestsList] = useState<PublicInterest[]>(initialInterests);
  const [newInterest, setNewInterest] = useState("");
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newInterest.trim()) return;
    setAdding(true);
    try {
      const res = await fetch("/api/portfolio/interests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newInterest.trim() }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setToast({ msg: json.error || "Failed to add interest", type: "error" });
        return;
      }
      setInterestsList((prev) => [...prev, json.data]);
      setNewInterest("");
      setToast({ msg: "Interest added!", type: "success" });
    } finally {
      setAdding(false);
    }
  }

  async function handleDelete(id: number) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/portfolio/interests/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setToast({ msg: json.error || "Failed to delete interest", type: "error" });
        return;
      }
      setInterestsList((prev) => prev.filter((i) => i.id !== id));
      setToast({ msg: "Interest removed.", type: "success" });
    } finally {
      setDeletingId(null);
    }
  }

  const COLORS = [
    { bg: "rgba(236,72,153,0.08)", color: "#db2777", border: "rgba(236,72,153,0.2)" },
    { bg: "rgba(59,130,246,0.08)", color: "#2563eb", border: "rgba(59,130,246,0.2)" },
    { bg: "rgba(139,92,246,0.08)", color: "#7c3aed", border: "rgba(139,92,246,0.2)" },
    { bg: "rgba(245,158,11,0.08)", color: "#d97706", border: "rgba(245,158,11,0.2)" },
    { bg: "rgba(16,185,129,0.08)", color: "#059669", border: "rgba(16,185,129,0.2)" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Interests</h2>
          <p className="text-sm text-gray-500 mt-0.5">{interestsList.length} interest{interestsList.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Add form */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-6">
        <h3 className="font-semibold text-gray-900 mb-4 text-sm">Add New Interest</h3>
        <form onSubmit={handleAdd} className="flex gap-3">
          <input
            type="text"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            placeholder="e.g. Artificial Intelligence"
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all"
          />
          <button
            type="submit"
            disabled={adding || !newInterest.trim()}
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

      {/* Interests grid */}
      {interestsList.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <div className="text-5xl mb-4">✨</div>
          <h3 className="font-bold text-gray-900 mb-2">No interests yet</h3>
          <p className="text-gray-400 text-sm">Add interests to show what excites you professionally.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex flex-wrap gap-3">
            {interestsList.map((interest, idx) => {
              const color = COLORS[idx % COLORS.length];
              return (
                <span
                  key={interest.id}
                  className="flex items-center gap-2 pl-4 pr-2 py-2 rounded-full text-sm font-medium"
                  style={{
                    background: color.bg,
                    color: color.color,
                    border: `1px solid ${color.border}`,
                  }}
                >
                  {interest.name}
                  <button
                    onClick={() => handleDelete(interest.id)}
                    disabled={deletingId === interest.id}
                    className="w-5 h-5 rounded-full flex items-center justify-center hover:bg-white/60 transition-colors font-bold"
                    title="Remove"
                  >
                    {deletingId === interest.id ? "⏳" : "×"}
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {toast && (
        <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
