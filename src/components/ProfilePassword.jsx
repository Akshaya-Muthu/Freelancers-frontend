import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";

function ProfilePassword() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    try {
      const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/auth/change-password", {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Password updated successfully!");
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setIsModalOpen(false);
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };


  

  return (

   <div >
  <button
  onClick={() => setIsModalOpen(true)}
  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-medium shadow-md hover:shadow-lg transition-all"
>
  Change Password
</button>

      {/* Change Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsModalOpen(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white rounded-3xl shadow-xl w-full max-w-md p-6 z-10 overflow-auto"
          >
            <h3 className="text-xl font-bold mb-4 text-center">Change Password</h3>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                  className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-medium text-sm">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  className="p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
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

export default ProfilePassword;
