import React, { useState } from "react";
import { motion } from "framer-motion";

// Dummy data
const dummyServices = [
  {
    id: 1,
    title: "Logo Design",
    description: "Professional logo design for businesses",
    category: "Design",
    price: 50,
    availability: "Available",
    samples: ["https://via.placeholder.com/100", "https://via.placeholder.com/100"],
  },
  {
    id: 2,
    title: "Website Development",
    description: "Responsive websites using React/Next.js",
    category: "Development",
    price: 300,
    availability: "Not Available",
    samples: ["https://via.placeholder.com/100"],
  },
];

export default function ServiceManagement() {
  const [services, setServices] = useState(dummyServices);
  const [modalService, setModalService] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    availability: "Available",
    samples: [],
  });

  const openModal = (service = null) => {
    if (service) {
      setForm(service);
    } else {
      setForm({
        title: "",
        description: "",
        category: "",
        price: "",
        availability: "Available",
        samples: [],
      });
    }
    setModalService(true);
  };

  const closeModal = () => setModalService(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setForm({ ...form, samples: files });
  };

  const handleSave = () => {
    if (form.id) {
      setServices(services.map((s) => (s.id === form.id ? form : s)));
    } else {
      setServices([...services, { ...form, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => openModal()}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
        >
          + Add Service
        </button>
      </div>

     

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <motion.div
            key={service.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-3xl shadow-xl p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-bold mb-1">{service.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{service.description}</p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Category:</span> {service.category}
              </p>
              <p className="text-sm mb-1">
                <span className="font-semibold">Price:</span> ${service.price}
              </p>
              <p
                className={`text-sm font-semibold ${
                  service.availability === "Available" ? "text-green-600" : "text-red-500"
                }`}
              >
                {service.availability}
              </p>
              {/* Work Samples */}
              {service.samples.length > 0 && (
                <div className="flex gap-2 mt-3 overflow-x-auto">
                  {service.samples.map((sample, i) => (
                    <img
                      key={i}
                      src={sample}
                      alt="sample"
                      className="h-20 w-20 rounded-lg object-cover border border-gray-200"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Edit/Delete Buttons */}
            <div className="mt-4 flex gap-3 justify-end">
              <button
                onClick={() => openModal(service)}
                className="px-4 py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="px-4 py-1 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
   {modalService && (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6 md:p-8">
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={closeModal}
    ></div>

    {/* Modal */}
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg sm:max-w-xl md:max-w-2xl p-6 z-10 overflow-auto"
      style={{ maxHeight: "90vh" }} // ensures modal scrolls on small screens
    >
      <h3 className="text-2xl sm:text-3xl font-bold mb-5 text-center">
        {form.id ? "Edit Service" : "Add Service"}
      </h3>

      <div className="flex flex-col gap-4">
        {/* Service Title */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Service Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter service title"
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter service description"
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
          />
        </div>

        {/* Category */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g., Design, Development"
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Price ($)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Availability */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Availability</label>
          <select
            name="availability"
            value={form.availability}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Available</option>
            <option>Not Available</option>
          </select>
        </div>

        {/* Work Samples */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-600 mb-1">Upload Work Samples</label>
          <input type="file" multiple onChange={handleFileChange} className="mt-2" />
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {form.samples.map((sample, i) => (
              <img
                key={i}
                src={sample}
                alt="preview"
                className="h-16 w-16 rounded-lg border flex-shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal Actions */}
      <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={closeModal}
          className="px-5 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold hover:shadow-lg transition-all"
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
