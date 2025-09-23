import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const { token } = useParams(); // Get token from URL
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `https://freelancer-backend-qu3g.onrender.com/api/auth/reset-password/${token}`,
        { newPassword }
      );

      toast.success(res.data.message || "Password reset successful!");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login"); // Redirect to login after success
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired link!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-white/40">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
        <p className="text-gray-600 mb-6">
          Enter your new password below to reset your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="border border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 p-3 rounded-xl w-full shadow-sm transition"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="border border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 p-3 rounded-xl w-full shadow-sm transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-emerald-500 to-teal-500"
            } text-white py-3 rounded-xl shadow-lg hover:shadow-emerald-200 hover:scale-[1.02] transition-all duration-300 font-medium`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-emerald-600 font-medium hover:underline cursor-pointer"
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
