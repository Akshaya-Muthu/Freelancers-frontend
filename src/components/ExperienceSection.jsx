import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function ExperienceSection() {
  const [items, setItems] = useState([
  
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ id: null, role: "", company: "", years: "" });
useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/tasks/getexperience", {
            method: "GET",
            credentials: "include",
          });
          const data = await res.json();
  
          if (res.ok) {
          console.log(data.pro);
          
       
            setItems(data.pro || null);
           
          } else {
            toast.error(data.message || "Failed to fetch profile");
          }
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong while fetching profile");
        }
      };
  
      fetchProfile();
    }, []);

 async function handleSave() {
    if (!form.company || !form.role) return;
   
    try {
            const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/tasks/createexperience", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(form),
            });
      
            const data = await res.json();
            
            if (res.ok) {
              toast.success(" Profile Updated successfully!");
            setItems((prev) => [...prev, data.profile]);
            } else {
              toast.error(` ${data.message}`);
            }
          } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
          }
    setForm({  id: null, role: "", company: "", years: "" });
    setIsOpen(false);
  }

  return (
   <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-6 mt-6">
  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
   Experience
  </h3>
{items && items.length > 0 ? (
  items.map((e) => (
    <motion.div
      key={e.id}
      whileHover={{ scale: 1.02, y: -2 }}
      className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm shadow-md mb-3 transition-all"
    >
      <p className="font-semibold text-gray-800">{e.role}</p>
      <p className="text-sm text-gray-500">{e.company}</p>
      <p className="text-xs text-gray-400">{e.years}</p>
    </motion.div>
  ))) : (
  <p className="text-gray-500 italic text-sm text-center">
    No records found.
  </p>
)}

  <button
    onClick={() => setIsOpen(true)}
    className="mt-3 px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
  >
 Add Experience
  </button>



      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsOpen(false)} />
     <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.9, opacity: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="relative bg-gradient-to-br from-white/90 to-white/60 backdrop-blur-xl rounded-3xl shadow-xl p-6 sm:p-8 w-full max-w-2xl z-10 border border-white/30 mx-4"
>
  {/* Decorative Top Glow */}
  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-500 rounded-t-3xl shadow-md" />

  {/* Title */}
  <h4 className="text-lg sm:text-xl font-bold mb-6 text-gray-800 text-center">
    {form.id ? "✏️ Edit Experience" : "➕ Add Experience"}
  </h4>

  {/* Responsive Grid Form */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Role */}
    <div className="flex flex-col">
      <label className="mb-1 text-gray-700 font-medium text-sm">Role</label>
      <input
        className="p-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm"
        placeholder="Enter role"
        value={form.role}
        onChange={(e) => setForm({ ...form, role: e.target.value })}
      />
    </div>

    {/* Company */}
    <div className="flex flex-col">
      <label className="mb-1 text-gray-700 font-medium text-sm">Company</label>
      <input
        className="p-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm"
        placeholder="Enter company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
      />
    </div>

    {/* Years - full width */}
    <div className="flex flex-col sm:col-span-2">
      <label className="mb-1 text-gray-700 font-medium text-sm">Years</label>
      <input
        className="p-3 rounded-xl bg-white/70 border border-gray-300 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm"
        placeholder="e.g. 2020-2023"
        value={form.years}
        onChange={(e) => setForm({ ...form, years: e.target.value })}
      />
    </div>
  </div>

  {/* Action Buttons */}
  <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
    <button
      onClick={() => setIsOpen(false)}
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
      )}
    </div>
  );
}
