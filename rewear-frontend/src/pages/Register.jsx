import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("✅ User created:", result.user.email);
      navigate("/landing");
    } catch (err) {
      console.error("Firebase error:", err.message);
      if (err.code === "auth/email-already-in-use") {
        setError("⚠️ Email is already registered.");
      } else if (err.code === "auth/weak-password") {
        setError("⚠️ Password must be at least 6 characters.");
      } else {
        setError("⚠️ Account creation failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D12] text-white flex items-center justify-center px-4 font-sans">
      <motion.div
        className="w-full max-w-md bg-[#1A1A1F] p-8 rounded-2xl shadow-2xl border border-[#2A2A32]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-6">
          Create Your Account 📝
        </h2>

        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded bg-[#2A2A32] text-white placeholder:text-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 pr-10 rounded bg-[#2A2A32] text-white placeholder:text-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hover:text-purple-400"
              onClick={() => setShowPass(!showPass)}
              title={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center font-medium">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded bg-purple-500 hover:bg-purple-600 transition-all text-white font-semibold disabled:opacity-60 shadow-lg"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-400 cursor-pointer underline hover:text-purple-300"
          >
            Login here
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
