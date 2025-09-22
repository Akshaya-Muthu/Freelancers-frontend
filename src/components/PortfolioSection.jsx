import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axios from "axios";
function PortfolioSection() {

  const [portfolio, setPortfolio] = useState([
    {
      id: 1,
      title: "Geometric Logo Design",
      description: "Created a modern geometric logo for a French boutique restaurant.",
      tags: "logo, design, minimalist",
      skills: "illustration, branding",
      tools: "Adobe Illustrator",
      industry: "Hospitality",
      projectUrl:"https://via.placeholder.com/400x300.png?text=Logo+Design",
      imageUrl: "https://via.placeholder.com/400x300.png?text=Logo+Design",
    },
    {
      id: 2,
      title: "E-commerce Website UI",
      description: "Designed a responsive e-commerce website for fashion products.",
      tags: "UI, web design, ecommerce",
      skills: "Figma, prototyping",
      tools: "Figma, Adobe XD",
      industry: "E-commerce",
      projectUrl:"https://via.placeholder.com/400x300.png?text=Logo+Design",
      imageUrl: "https://via.placeholder.com/400x300.png?text=E-commerce+UI",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    tags: "",
    skills: "",
    tools: "",
    industry: "",
    projectUrl: "",
    imageUrlFile:"",
    imageUrl: "",
  });

  const [modalItem, setModalItem] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/portfolio/portfolio", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
        console.log(data);
        
     
          setPortfolio(data || []);
         
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imageUrl" && files[0]) {
      setForm({ ...form,  imageUrlFile: files[0], imageUrl: URL.createObjectURL(files[0])  });
    } else {
      setForm({ ...form, [name]: value });
    }
  };


  const handleSave = async() => {
    if (!form.title) return; 
    const newItem = { id: Date.now(), ...form };



  const formData = new FormData();
  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("tags", form.tags);
  formData.append("skills", form.skills);
  formData.append("tools", form.tools);
  formData.append("industry", form.industry);
  formData.append("projectUrl", form.projectUrl);

  if (form.imageUrlFile) {
    formData.append("imageUrl", form.imageUrlFile); 
  }

  try {
    const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/portfolio/portfoliocreate", {
      method: "POST",
      credentials: "include", 
      body: formData,
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
    setPortfolio([...portfolio, newItem]);
    setForm({
      title: "",
      description: "",
      tags: "",
      skills: "",
      tools: "",
      industry: "",
      projectUrl : "",
      imageUrl: "",
    });
    setIsAddOpen(false);
  };


  const handleDelete = (id) => {
    setPortfolio(portfolio.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
   
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          + Add Portfolio
        </button>
      </div>

    
      <div className="grid md:grid-cols-3 gap-6">
        {portfolio.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-4 relative cursor-pointer"
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="rounded-xl w-full h-40 object-cover mb-3"
                onClick={() => setModalItem(item)}
              />
            )}
            <h4 className="font-semibold text-gray-800">{item.title}</h4>
            <p className="text-sm text-gray-500 truncate">{item.description}</p>

          
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="Delete"
            >
              ❌
            </button>
          </motion.div>
        ))}
      </div>

      
    {isAddOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div
      className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      onClick={() => setIsAddOpen(false)}
    />
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-xl rounded-3xl shadow-xl w-full max-w-lg md:max-w-2xl z-10 border border-white/20 p-6 overflow-auto max-h-[90vh]"
    >
      <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">
        ➕ Add Portfolio
      </h3>
      <div className="grid gap-4">
        <div className="flex flex-col md:flex-row md:gap-4">
          <div className="flex-1 flex flex-col">
            <label className="text-gray-600 font-medium text-sm">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Project title"
              className="p-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm w-full"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-gray-600 font-medium text-sm">Industry</label>
            <input
              name="industry"
              value={form.industry}
              onChange={handleChange}
              placeholder="Hospitality, e-commerce"
              className="p-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm w-full"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 font-medium text-sm">Project URL</label>
          <input
            name="projectUrl"
            value={form.projectUrl}
            onChange={handleChange}
            
            placeholder="Give Your Project URL"
                className="p-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm w-full"
              />
        </div>
         <div className="flex flex-col">
          <label className="text-gray-600 font-medium text-sm">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            placeholder="Describe your work"
            className="p-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm w-full"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium text-sm">Tags</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="logo, design, branding"
              className="p-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium text-sm">Skills</label>
            <input
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="illustration, branding"
              className="p-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium text-sm">Tools</label>
            <input
              name="tools"
              value={form.tools}
              onChange={handleChange}
              placeholder="Adobe Illustrator"
              className="p-3 rounded-xl bg-white/70 border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none text-sm w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-600 font-medium text-sm">Image</label>
            <input
              type="file"
              name="imageUrl"
              onChange={handleChange}
              className="p-2"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row justify-end gap-3">
        <button
          onClick={() => setIsAddOpen(false)}
          className="px-5 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          💾 Save
        </button>
      </div>
    </motion.div>
  </div>

      )}

      {modalItem && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setModalItem(null)}
          />
       <motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  className="relative bg-gradient-to-br from-white/80 to-white/50 backdrop-blur-xl rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl z-10 border border-white/20 max-h-[90vh] overflow-auto"
>
  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">
    {modalItem.title}
  </h3>

  {modalItem.imageUrl && (
    <img
      src={modalItem.imageUrl}
      alt={modalItem.title}
      className="rounded-2xl w-full mb-4 object-cover"
    />
  )}

  <p className="text-gray-700 mb-2">{modalItem.description}</p>
  <p className="text-gray-500 text-sm mb-1">Tags: {modalItem.tags}</p>
  <p className="text-gray-500 text-sm mb-1">Skills: {modalItem.skills}</p>
  <p className="text-gray-500 text-sm mb-1">Tools: {modalItem.tools}</p>
  <p className="text-gray-500 text-sm mb-1">Industry: {modalItem.industry}</p>
  <p className="text-gray-500 text-sm mb-1">Project Url: {modalItem.projectUrl}</p>
  

  <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
    <button
      onClick={() => setModalItem(null)}
      className="px-5 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
    >
      Close
    </button>
  </div>
</motion.div>

        </div>
      )}
    </div>
  );
}

export default PortfolioSection;
