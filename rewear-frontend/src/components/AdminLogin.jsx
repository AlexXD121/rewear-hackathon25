// src/components/AdminLogin.jsx
import React, { useState } from "react";

const AdminLogin = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "123456789") {
      onSuccess();
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1F1F28] p-6 rounded-lg w-80 shadow-lg"
      >
        <h2 className="text-xl font-semibold text-white mb-4">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none"
          autoFocus
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
