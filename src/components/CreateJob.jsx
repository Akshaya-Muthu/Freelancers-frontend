import React, { useState } from "react";
import {toast} from 'react-toastify';
function CreateJob() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    deadline: "",
    skills: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/jobs/createjob", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(" Job created successfully!");
        setFormData({
          title: "",
          description: "",
          budget: "",
          deadline: "",
          skills: "",
          category: "",
        });
      } else {
        toast.error(` ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center lg:p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-emerald-700 mb-6">Create a New Job</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          
         
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="e.g. Frontend Developer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="Describe the job requirements..."
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget ($)
              </label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                placeholder="1000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              placeholder="React, Tailwind, API"
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Design">Design</option>
              <option value="Writing">Writing</option>
              <option value="Marketing">Marketing</option>
              <option value="Editing">Editing</option>
              <option value="Other">Other</option>
            </select>
          </div>

      
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition duration-200 font-medium cursor-pointer"
          >
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateJob;
