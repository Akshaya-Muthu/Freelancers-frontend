import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function FreelancerSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [freelancers, setFreelancers] = useState([]);
  const [filterSkill, setFilterSkill] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterBudget, setFilterBudget] = useState({ min: 0, max: 1000 });
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);


  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const res = await fetch("https://freelancer-backend-qu3g.onrender.com/api/tasks/serchfilter", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
       
          const sanitizedData = (data || []).map((f) => ({
            ...f,
            skills: f.skills || [],
            portfolio: f.portfolio || [],
            reviews: f.reviews || [],
          }));
          setFreelancers(sanitizedData);
        } else {
          toast.error(data.message || "Failed to fetch freelancers");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong while fetching freelancers");
      }
    };

    fetchFreelancers();
  }, []);


  const filteredFreelancers = freelancers.filter((f) => {
    const matchesSearch = f.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = filterSkill
      ? f.skills.some((skill) => skill.toLowerCase().includes(filterSkill.toLowerCase()))
      : true;
    const matchesLocation = filterLocation
      ? f.location?.toLowerCase().includes(filterLocation.toLowerCase())
      : true;
    const matchesBudget =
      f.hourlyRate >= Number(filterBudget.min) &&
      f.hourlyRate <= Number(filterBudget.max);

    return matchesSearch && matchesSkill && matchesLocation && matchesBudget;
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
 
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Filter by skill"
          value={filterSkill}
          onChange={(e) => setFilterSkill(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Location"
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Max Budget"
          value={filterBudget.max}
          onChange={(e) =>
            setFilterBudget({ ...filterBudget, max: Number(e.target.value) })
          }
          className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

   
      {filteredFreelancers.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">No freelancers found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFreelancers.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-3xl shadow-xl p-5 flex flex-col hover:shadow-2xl transition-all"
            >
              <h3 className="text-lg font-bold mb-1">{f.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{f.location}</p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Skills:</span> {f.skills.join(", ")}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Rating:</span> {f.rating} ⭐
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Rate:</span> ${f.hourlyRate}/hr
              </p>

              <button
                onClick={() => setSelectedFreelancer(f)}
                className="mt-auto px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                View Portfolio
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Portfolio Modal */}
      {selectedFreelancer && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSelectedFreelancer(null)}
          ></div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-6 z-10 overflow-auto"
            style={{ maxHeight: "90vh" }}
          >
            <h3 className="text-2xl font-bold mb-5 text-center">
              {selectedFreelancer.name}'s Portfolio
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {selectedFreelancer.portfolio.map((p, i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-xl p-3 hover:shadow-md transition-all"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-32 object-cover rounded-xl mb-2"
                  />
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-sm text-gray-600">{p.description}</p>
                </div>
              ))}
            </div>

            <h4 className="mt-5 text-lg font-semibold">Client Reviews</h4>
            {selectedFreelancer.reviews.map((r, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-xl mt-2">
                <p className="font-semibold">{r.client}</p>
                <p className="text-sm text-gray-600">{r.comment}</p>
                <p className="text-xs text-gray-500">Rating: {r.rating} ⭐</p>
              </div>
            ))}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedFreelancer(null)}
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
