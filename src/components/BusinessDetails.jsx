import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import ProfilePassword from "./ProfilePassword";
import {toast} from 'react-toastify';
export default function BusinessDetails() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    industry: "",
    website: "",
    location: "",
    description: ""
  });

  const [business, setBusiness] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/admin/client-profile", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
        console.log(data);
        
     
          setBusiness(data || null);
         
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
 

  const handleSave = async () => {
    setBusiness(form);
    console.log(form)
    
     try {
        const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/admin/clientprofilecreate", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
  
        const data = await res.json();
        
        if (res.ok) {
          toast.success(" Profile Updated successfully!");
          setForm({
            name: "",
            industry: "",
            website: "",
            location: "",
            description: ""
          });
        } else {
          toast.error(` ${data.message}`);
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
      }
       setIsOpen(false);
    };
   

  
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mt-6 max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold mb-4">Business Details</h3>

      {business ? (
       <motion.div
  whileHover={{ scale: 1.02 }}
  className="p-6 rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg border border-gray-200 transition w-full max-w-lg"
>
  {/* Business Name */}
  <h4 className="text-xl font-bold text-gray-800 mb-2">
    {business.name || "Business Name"}
  </h4>

  {/* Info Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
    <p className="flex items-center gap-2">
      <span className="text-emerald-500">🏢</span>
      <span>{business.industry || "Industry not set"}</span>
    </p>

    <p className="flex items-center gap-2">
      <span className="text-blue-500">🌍</span>
      <span>{business.location || "Location not set"}</span>
    </p>

    <p className="flex items-center gap-2 sm:col-span-2">
      <span className="text-indigo-500">🔗</span>
      <a
        href={business.website}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline truncate"
      >
        {business.website || "No website"}
      </a>
    </p>
  </div>

  {/* Description */}
  <p className="mt-4 text-gray-600 text-sm leading-relaxed">
    {business.description || "No description provided."}
  </p>
</motion.div>

      ) : (
        <p className="text-sm text-gray-500">No business details added yet.</p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
  <button
    onClick={() => setIsOpen(true)}
    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-sm shadow hover:shadow-lg transition"
  >
    {business ? "Edit Business Details" : "+ Add Business Details"}
  </button>

  <ProfilePassword />
</div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
        <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-3xl p-8 z-10 overflow-auto"
>
  <h3 className="text-3xl font-extrabold mb-8 text-center text-gray-800">
    Business Information
  </h3>

  {/* Responsive Form */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="font-semibold text-gray-700 mb-2 block">
        Business Name
      </label>
      <input
        type="text"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Enter business name"
        className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 transition"
      />
    </div>

    <div>
      <label className="font-semibold text-gray-700 mb-2 block">
        Industry
      </label>
      <input
        type="text"
        value={form.industry}
        onChange={(e) => setForm({ ...form, industry: e.target.value })}
        placeholder="e.g., IT, Healthcare, Retail"
        className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 transition"
      />
    </div>

    <div>
      <label className="font-semibold text-gray-700 mb-2 block">
        Website
      </label>
      <input
        type="url"
        value={form.website}
        onChange={(e) => setForm({ ...form, website: e.target.value })}
        placeholder="https://yourbusiness.com"
        className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 transition"
      />
    </div>

    <div>
      <label className="font-semibold text-gray-700 mb-2 block">
        Location
      </label>
      <input
        type="text"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        placeholder="City, Country"
        className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 transition"
      />
    </div>

    <div className="md:col-span-2">
      <label className="font-semibold text-gray-700 mb-2 block">
        Description
      </label>
      <textarea
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        placeholder="Describe your business..."
        className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 transition h-28"
      />
    </div>
  </div>

  {/* Buttons */}
  <div className="mt-8 flex justify-end gap-4">
    <button
      onClick={() => setIsOpen(false)}
      className="px-6 py-2 rounded-xl border border-gray-300 text-gray-600 bg-white/70 hover:bg-gray-100 transition"
    >
      Cancel
    </button>
    <button
      onClick={handleSave}
      className="px-8 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition"
    >
      Save
    </button>
  </div>
</motion.div>

        </div>
      )}
    </div>
  );
}
