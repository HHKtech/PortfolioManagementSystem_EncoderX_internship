"use client";
import { useState } from "react";
import type { PublicProject } from "@/types";
import ProjectForm from "./ProjectForm";
import Toast from "@/components/ui/Toast";

interface ProjectListProps {
  initialProjects: PublicProject[];
}

export default function ProjectList({ initialProjects }: ProjectListProps) {
  const [projects, setProjects] = useState<PublicProject[]>(initialProjects);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  async function handleAdd(data: Omit<PublicProject, "id">) {
    const res = await fetch("/api/portfolio/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      const err: unknown = new Error(json.error || "Failed to add project");
      if (json.errors) (err as Record<string, unknown>).errors = json.errors;
      throw err;
    }
    setProjects((prev) => [...prev, json.data]);
    setShowAddForm(false);
    setToast({ msg: "Project added successfully!", type: "success" });
  }

  async function handleEdit(id: number, data: Omit<PublicProject, "id">) {
    const res = await fetch(`/api/portfolio/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      const err: unknown = new Error(json.error || "Failed to update project");
      if (json.errors) (err as Record<string, unknown>).errors = json.errors;
      throw err;
    }
    setProjects((prev) => prev.map((p) => (p.id === id ? json.data : p)));
    setEditingId(null);
    setToast({ msg: "Project updated successfully!", type: "success" });
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/portfolio/projects/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        setToast({ msg: json.error || "Failed to delete project", type: "error" });
        return;
      }
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setToast({ msg: "Project deleted.", type: "success" });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-sm text-gray-500 mt-0.5">{projects.length} project{projects.length !== 1 ? "s" : ""}</p>
        </div>
        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="btn-primary"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Project
          </button>
        )}
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="mb-6 bg-white rounded-2xl p-6 border border-pink-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(236,72,153,0.1)", color: "#ec4899" }}>+</span>
            New Project
          </h3>
          <ProjectForm
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
          />
        </div>
      )}

      {/* Projects list */}
      {projects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <div className="text-5xl mb-4">🚀</div>
          <h3 className="font-bold text-gray-900 mb-2">No projects yet</h3>
          <p className="text-gray-400 text-sm">Add your first project to showcase your work.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {editingId === project.id ? (
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(59,130,246,0.1)", color: "#3b82f6" }}>✏️</span>
                    Edit Project
                  </h3>
                  <ProjectForm
                    initialData={{
                      ...project,
                      detailedDescription: project.detailedDescription ?? "",
                      category: project.category ?? "",
                      imageUrl: project.imageUrl ?? "",
                      githubUrl: project.githubUrl ?? "",
                      liveDemoUrl: project.liveDemoUrl ?? "",
                    }}
                    onSubmit={(data) => handleEdit(project.id, data)}
                    onCancel={() => setEditingId(null)}
                    isEditing
                  />
                </div>
              ) : (
                <div className="p-5 flex items-start gap-4">
                  {/* Order badge */}
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(59,130,246,0.1))",
                      color: "#ec4899",
                    }}
                  >
                    #{project.displayOrder}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900">{project.title}</h3>
                      {project.category && (
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-medium"
                          style={{
                            background: "rgba(236,72,153,0.08)",
                            color: "#db2777",
                          }}
                        >
                          {project.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                      {project.description}
                    </p>
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs rounded-lg"
                            style={{ background: "#f3f4f6", color: "#374151" }}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-2 py-0.5 text-xs rounded-lg text-gray-400" style={{ background: "#f3f4f6" }}>
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditingId(project.id)}
                      className="px-3 py-2 rounded-xl text-sm font-medium text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      disabled={deletingId === project.id}
                      className="px-3 py-2 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all"
                    >
                      {deletingId === project.id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              )}
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
