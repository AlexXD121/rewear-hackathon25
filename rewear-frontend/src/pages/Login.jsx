import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInAnonymously,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const ADMIN_EMAIL = "admin@example.com";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectBasedOnRole = (email) => {
    if (email === ADMIN_EMAIL) {
      navigate("/dashboard");
    } else {
      navigate("/landing");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      redirectBasedOnRole(result.user.email);
    } catch {
      setError("⚠️ Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      redirectBasedOnRole(result.user.email);
    } catch {
      setError("⚠️ Google login failed");
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/landing");
    } catch {
      setError("⚠️ Anonymous login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D12] text-white flex items-center justify-center px-4 font-sans transition-all duration-500">
      <motion.div
        className="w-full max-w-md bg-[#1A1A1F] p-8 rounded-2xl shadow-2xl border border-purple-800 backdrop-blur-sm"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-extrabold text-center text-purple-400 mb-6 tracking-wide">
          Welcome Back 👋
        </h2>

        <motion.form
          onSubmit={handleEmailLogin}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full px-4 py-3 rounded-lg bg-[#2A2A32] text-white placeholder:text-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              className="w-full px-4 py-3 pr-10 rounded-lg bg-[#2A2A32] text-white placeholder:text-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-300"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          {email === ADMIN_EMAIL && (
            <p className="text-purple-400 text-sm font-semibold text-center">
              ✅ Admin Access Enabled
            </p>
          )}

          {error && (
            <motion.p
              className="text-red-400 text-sm text-center font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileTap={{ scale: 0.96 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-all text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in with Email"}
          </motion.button>
        </motion.form>

        <div className="my-6 border-t border-gray-700 text-center text-gray-500 text-sm">
          or continue with
        </div>

        <div className="space-y-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            className="w-full py-2 rounded-lg bg-white text-black font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-all shadow"
          >
            <FcGoogle className="text-xl" /> Sign in with Google
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnonymousLogin}
            className="w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all text-white shadow"
          >
            Continue as Guest
          </motion.button>
        </div>

        <p className="text-sm text-center text-gray-500 mt-6">
          New here?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-purple-400 cursor-pointer underline hover:text-purple-300"
          >
            Create account
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
