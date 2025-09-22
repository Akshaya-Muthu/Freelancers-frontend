import React from "react";
import { motion } from "framer-motion";

export default function ProfileCard({ profile, onEdit }) {
  return (
 <motion.div
  whileHover={{ scale: 1.03, y: -3 }}
  className="relative bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md shadow-lg rounded-3xl p-6 transition-all duration-300"
>
  {/* Decorative top border glow */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400 rounded-t-3xl" />

  <h4 className="text-xl font-bold text-gray-800">{profile.title}</h4>
  <p className="text-sm text-gray-500">{profile.headline}</p>

  <p className="mt-3 text-sm font-medium text-gray-700">
    💲 <span className="text-emerald-600">{profile.hourly}</span> USD/hr
  </p>

  <div className="mt-3 flex flex-wrap gap-2">
    {profile.skills.map((s, i) => (
      <span
        key={i}
        className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-blue-100 text-emerald-700 rounded-full text-xs font-medium shadow-sm"
      >
        {s}
      </span>
    ))}
  </div>

  <p className="mt-4 text-sm text-gray-700 leading-relaxed">
    {profile.summary}
  </p>

  <div className="mt-5 flex justify-end">
    <button
      onClick={() => onEdit(profile)}
      className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
    >
      ✏️ Edit Profile
    </button>
  </div>
</motion.div>

  );
}
