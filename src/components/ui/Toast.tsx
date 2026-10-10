"use client";
import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border transition-all duration-300"
      style={{
        background: type === "success" ? "#f0fdf4" : "#fff1f2",
        borderColor: type === "success" ? "rgba(16,185,129,0.3)" : "rgba(244,63,94,0.3)",
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        opacity: visible ? 1 : 0,
        maxWidth: "360px",
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm flex-shrink-0"
        style={{
          background: type === "success"
            ? "linear-gradient(135deg, #10b981, #34d399)"
            : "linear-gradient(135deg, #f43f5e, #fb7185)",
        }}
      >
        {type === "success" ? "✓" : "✕"}
      </div>
      <p
        className="text-sm font-medium"
        style={{ color: type === "success" ? "#065f46" : "#881337" }}
      >
        {message}
      </p>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        className="ml-auto text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
