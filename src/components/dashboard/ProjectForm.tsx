"use client";
import { useState } from "react";
import { PROJECT_CATEGORIES } from "@/types";

interface ProjectData {
  id?: number;
  title: string;
  description: string;
  detailedDescription: string;
  category: string;
  technologies: string[];
  imageUrl: string;
  githubUrl: string;
  liveDemoUrl: string;
  displayOrder: number;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectData>;
  onSubmit: (data: ProjectData) => Promise<void>;
  onCancel: () => void;
  isEditing?: boolean;
}

const DEFAULT_DATA: ProjectData = {
  title: "",
  description: "",
  detailedDescription: "",
  category: "",
  technologies: [],
  imageUrl: "",
  githubUrl: "",
  liveDemoUrl: "",
  displayOrder: 0,
};

export default function ProjectForm({
  initialData = {},
  onSubmit,
  onCancel,
  isEditing = false,
}: ProjectFormProps) {
  const [data, setData] = useState<ProjectData>({ ...DEFAULT_DATA, ...initialData });
  const [techInput, setTechInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  function handleChange(
    field: keyof ProjectData,
    value: string | number | string[]
  ) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: [] }));
  }

  function addTech() {
    const t = techInput.trim();
    if (t && !data.technologies.includes(t)) {
      handleChange("technologies", [...data.technologies, t]);
    }
    setTechInput("");
  }

  function removeTech(tech: string) {
    handleChange(
      "technologies",
      data.technologies.filter((t) => t !== tech)
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      await onSubmit(data);
    } catch (err: unknown) {
      if (err && typeof err === "object" && "errors" in err) {
        setErrors((err as { errors: Record<string, string[]> }).errors);
      }
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-pink-100 focus:border-pink-300 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title & Category */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Project Title *
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="SkillMatriX"
            className={inputClass}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-red-500">{errors.title[0]}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Category
          </label>
          <select
            value={data.category}
            onChange={(e) => handleChange("category", e.target.value)}
            className={inputClass}
            style={{ background: "white" }}
          >
            <option value="">Select category</option>
            {PROJECT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Short Description *
        </label>
        <textarea
          rows={2}
          value={data.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Brief description of the project..."
          className={`${inputClass} resize-none`}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-500">{errors.description[0]}</p>
        )}
      </div>

      {/* Detailed description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Detailed Description
        </label>
        <textarea
          rows={3}
          value={data.detailedDescription}
          onChange={(e) => handleChange("detailedDescription", e.target.value)}
          placeholder="Detailed description with features and technical details..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
          Technologies
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTech();
              }
            }}
            placeholder="e.g. React, Node.js..."
            className={inputClass}
          />
          <button
            type="button"
            onClick={addTech}
            className="px-4 py-3 rounded-xl text-sm font-semibold text-white flex-shrink-0 transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #ec4899, #3b82f6)" }}
          >
            Add
          </button>
        </div>
        {data.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {data.technologies.map((tech) => (
              <span
                key={tech}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(236,72,153,0.08)",
                  color: "#db2777",
                  border: "1px solid rgba(236,72,153,0.2)",
                }}
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTech(tech)}
                  className="hover:text-red-600 transition-colors ml-0.5"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* URLs */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            GitHub URL
          </label>
          <input
            type="url"
            value={data.githubUrl}
            onChange={(e) => handleChange("githubUrl", e.target.value)}
            placeholder="https://github.com/..."
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Live Demo URL
          </label>
          <input
            type="url"
            value={data.liveDemoUrl}
            onChange={(e) => handleChange("liveDemoUrl", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>

      {/* Image & Order */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Image URL
          </label>
          <input
            type="url"
            value={data.imageUrl}
            onChange={(e) => handleChange("imageUrl", e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Display Order
          </label>
          <input
            type="number"
            value={data.displayOrder}
            onChange={(e) => handleChange("displayOrder", parseInt(e.target.value) || 0)}
            min={0}
            className={inputClass}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
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
              {isEditing ? "Update Project" : "Add Project"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 rounded-full text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-all border border-gray-200"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
