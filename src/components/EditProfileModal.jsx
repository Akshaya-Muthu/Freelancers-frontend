import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {toast} from 'react-toastify';
export default function EditProfileModal({ isOpen, onClose, onSave, initial }) {
  const blank = { id: null, title: "", location:"",hourly: 0, headline: "", skills: [], summary: "" };
  const [form, setForm] = useState(initial || blank);

  useEffect(() => {
    setForm(initial || blank);
  }, [initial, isOpen]);

  if (!isOpen) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "skills") {
      setForm((s) => ({ ...s, skills: value.split(",").map((x) => x.trim()).filter(Boolean) }));
    } else {
      setForm((s) => ({ ...s, [name]: value }));
    }
  }

  function handleSave() {
    if (!form.title.trim()) return alert("Profile title is required");
    onSave({ ...form, id: form.id || Date.now().toString() });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="relative w-full max-w-4xl bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 z-20 border border-white/30 mx-4"
>
  {/* Decorative Top Glow Line */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 rounded-t-3xl shadow-md" />

  {/* Title */}
  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">
    {form.id ? "✏️ Edit Profile" : "➕ Add Profile"}
  </h3>

  {/* Responsive Grid Form */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Title */}
    <div className="flex flex-col">
      <label className="mb-1 text-gray-700 text-sm font-medium">Title</label>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Enter profile title"
        className="p-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm"
      />
    </div>

    {/* Location */}
    <div className="flex flex-col">
      <label className="mb-1 text-gray-700 text-sm font-medium">Location</label>
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Enter Location"
        className="p-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm"
      />
    </div>

    {/* Hourly */}
    <div className="flex flex-col">
      <label className="mb-1 text-gray-700 text-sm font-medium">
        Hourly Rate (USD)
      </label>
      <input
        name="hourly"
        type="number"
        value={form.hourly}
        onChange={handleChange}
        placeholder="Enter hourly rate"
        className="p-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm"
      />
    </div>

    {/* Headline */}
    <div className="flex flex-col">
      <label className="mb-1 text-gray-700 text-sm font-medium">Headline</label>
      <input
        name="headline"
        value={form.headline}
        onChange={handleChange}
        placeholder="Enter headline"
        className="p-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm"
      />
    </div>

    {/* Skills (span both columns) */}
    <div className="flex flex-col sm:col-span-2">
      <label className="mb-1 text-gray-700 text-sm font-medium">Skills</label>
      <input
        name="skills"
        value={form.skills.join(", ")}
        onChange={handleChange}
        placeholder="Enter skills (comma separated)"
        className="p-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm"
      />
    </div>

    {/* Summary (span both columns) */}
    <div className="flex flex-col sm:col-span-2">
      <label className="mb-1 text-gray-700 text-sm font-medium">Summary</label>
      <textarea
        name="summary"
        value={form.summary}
        onChange={handleChange}
        placeholder="Write a short summary"
        rows={3}
        className="p-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm resize-none"
      />
    </div>
  </div>

  {/* Actions */}
  <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
    <button
      onClick={onClose}
      className="px-5 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-all"
    >
      Cancel
    </button>
    <button
      onClick={handleSave}
      className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
    >
      💾 Save
    </button>
  </div>
</motion.div>



    </div>
  );
}
