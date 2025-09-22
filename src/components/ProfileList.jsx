import React, { useState, useEffect } from "react";
import ProfileCard from "./ProfileCard";
import EditProfileModal from "./EditProfileModal";
import { toast } from "react-toastify";
export default function ProfileList() {
  const [profiles, setProfiles] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editProfile, setEditProfile] = useState(null);

  useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/tasks/client-profile", {
            method: "GET",
            credentials: "include",
          });
          const data = await res.json();
  
          if (res.ok) {
          console.log(data);
          
       
            setProfiles([data] || null);
           
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



  async  function handleSave(profile) {
    setProfiles((prev) => {
      const exists = prev.find((p) => p.id === profile.id);
      if (exists) return prev.map((p) => (p.id === profile.id ? profile : p));
      return [...prev, profile];
    });
      try {
            const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/tasks/clientprofilecreate", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(profile),
            });
      
            const data = await res.json();
            
            if (res.ok) {
              toast.success(" Profile Updated successfully!");
            
            } else {
              toast.error(` ${data.message}`);
            }
          } catch (error) {
            console.error(error);
            toast.error("Something went wrong.");
          }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Profiles</h2>
        <button
          onClick={() => { setEditProfile(null); setIsOpen(true); }}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg"
        >
          + Add Profile
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {profiles.map((p) => (
          <ProfileCard
            key={p.id}
            profile={p}
            onEdit={(pf) => { setEditProfile(pf); setIsOpen(true); }}
          />
        ))}
      </div>

      <EditProfileModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        initial={editProfile}
      />
    </div>
  );
}
