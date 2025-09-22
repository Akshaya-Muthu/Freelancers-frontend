import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role:''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://freelancer-backend-qu3g.onrender.com/api/auth/register', formData, {
        withCredentials: true
      });
      if (res.status === 200) {
        toast.success('Signup successful!');
        setFormData({
          name: '',
          email: '',
          password: '',
          role:''
        });
        setTimeout(() => {
          navigate('/login'); 
        }, 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white md:flex">
      
      <div className="md:w-1/2 min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/40">
          <h1 className="flex items-center mb-6">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-lg font-semibold text-gray-800 ml-2">FreelancePro</span>
          </h1>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">Get Started Now</h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="border border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 p-3 rounded-xl w-full shadow-sm transition"
                onChange={handleChange}
                name="name"
                value={formData.name}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 p-3 rounded-xl w-full shadow-sm transition"
                onChange={handleChange}
                name="email"
                value={formData.email}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 p-3 rounded-xl w-full shadow-sm transition"
                onChange={handleChange}
                name="password"
                value={formData.password}
                required
              />
            </div>
            <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">User Type</label>
  <select
    name="role"
    value={formData.role}
    onChange={handleChange}
    className="border border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 p-3 rounded-xl w-full shadow-sm transition"
    required
  >
    <option value="">Select User Type</option>
    <option value="freelancer">Freelancer</option>
    <option value="admin">Client</option>
  </select>
</div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl shadow-lg hover:shadow-emerald-200 hover:scale-[1.02] transition-all duration-300 font-medium cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          <h3 className="font-medium text-center mt-6 text-gray-600">
            Have an account?{' '}
            <Link to="/login" className="text-emerald-600 font-medium hover:underline">
              Sign in
            </Link>
          </h3>
        </div>
      </div>

     
      <div className="hidden md:block md:w-1/2 relative min-h-screen bg-black">
        <img
          src="/freelancer-using-chatgpt.jpg"
          alt="signup-banner"
          className="w-full h-full object-cover absolute top-0 left-0 opacity-40"
        />
        <div className="absolute inset-0 bg-opacity-50"></div>

        <div className="absolute z-10 w-full h-full flex flex-col items-center justify-center text-white text-center px-6">
          <h1 className="text-3xl font-black font-poppins">
            Welcome to <br />
            <span className="text-4xl text-emerald-400">FreelancePro</span>
          </h1>
          <p className="mt-4 text-sm font-poppins max-w-md">
            Create your account and start your journey today —<br />
            Whether you're a freelancer looking for exciting projects<br />
            or an admin seeking top talent, we’ve got you covered.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
