import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    const res = await axios.post('https://freelancer-backend-qu3g.onrender.com/api/auth/login', formData, {
      withCredentials: true
    });

    if (res.status === 200) {
      const userData = res.data.user; 
      const authToken = res.data.token;

      
      sessionStorage.setItem('user', JSON.stringify(userData));
      sessionStorage.setItem('token', authToken);

      login(userData, authToken); // update context state
      toast.success('Login successful!');
      setFormData({ email: '', password: '' });
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || 'Login failed. Please try again.');
  }
};


  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex md:w-1/2 relative">
        <img
          src="/pic3.jpg"
          alt="Login"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50 flex flex-col items-center justify-center text-center p-8 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome Back to <br />
            <span className="text-emerald-400">FreelancePro</span>
          </h1>
          <p className="mt-4 max-w-md text-gray-300">
            Log in to continue your journey — connect with clients, manage projects, and grow your career.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/40">

          <div className="flex items-center gap-3 mb-6">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <span className="text-lg font-semibold text-gray-800">FreelancePro</span>
          </div>

    
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600 mb-8">Enter your credentials to access your account</p>

        
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
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

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl shadow-lg hover:shadow-emerald-200 hover:scale-[1.02] transition-all duration-300 font-medium cursor-pointer"
            >
              Login
            </button>
          </form>


          <p className="text-center text-gray-600 mt-6">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-emerald-600 font-medium hover:underline cursor-pointer">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
