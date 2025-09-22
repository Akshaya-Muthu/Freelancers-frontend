import React, { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export default function QualificationSection() {
  const [items, setItems] = useState([
    
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ id: null, name: "", institute: "" });

 useEffect(() => {
       const fetchProfile = async () => {
         try {
           const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/tasks/getqualification", {
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
     if (!form.degree || !form.school) return;
    
     try {
             const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/tasks/createqualification", {
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
     setForm({ id: null, degree: "", school: "", years: "" });
     setIsOpen(false);
   }

  return (
  <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg p-6 mt-6">
  <h3 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
    🎓 Qualifications
  </h3>
{items && items.length > 0 ? (
  items.map((e) => (
    <motion.div
      key={q.id}
      whileHover={{ scale: 1.02, y: -2 }}
      className="p-4 rounded-2xl bg-white/70 backdrop-blur-sm shadow-md mb-3 transition-all"
    >
      <p className="font-semibold text-gray-800">{q.name}</p>
      <p className="text-sm text-gray-500">{q.institute}</p>
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
    + Add Qualification
  </button>

  {isOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-xl rounded-3xl shadow-xl p-6 w-full max-w-md z-10 border border-white/20"
      >
        <h4 className="text-xl font-bold mb-5 text-gray-800 text-center">
          {form.id ? "✏️ Edit Qualification" : "➕ Add Qualification"}
        </h4>

        <div className="grid gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium text-sm">Qualification</label>
            <input
              className="p-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm"
              placeholder="Enter qualification"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-600 font-medium text-sm">Institute</label>
            <input
              className="p-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm"
              placeholder="Enter institute"
              value={form.institute}
              onChange={(e) => setForm({ ...form, institute: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-5 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
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
