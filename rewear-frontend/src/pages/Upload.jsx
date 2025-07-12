import React, { useState } from "react";
import { auth } from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file || !title || !size || !condition) {
      toast.error("Please fill all fields and select a file.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("size", size);
    formData.append("condition", condition);
    formData.append("userId", auth.currentUser?.uid || "anonymous");

    try {
      const res = await axios.post("http://localhost:8000/items/upload", formData);
      toast.success(res.data.message || "Upload successful!");
      // Reset form
      setFile(null);
      setPreview(null);
      setTitle("");
      setSize("");
      setCondition("");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0B0B0F] to-[#1A1A1F] p-6 font-sans">
      <form
        onSubmit={handleUpload}
        className="bg-[#1F1F28] backdrop-blur-md p-8 rounded-xl border border-purple-600 shadow-lg w-full max-w-md
          transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-purple-400 text-center select-none">
          Upload Clothing Item
        </h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-6 w-full text-gray-300 bg-[#2A2A32] border border-gray-700 rounded-md p-2 cursor-pointer
            transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mb-6 w-full h-48 object-contain rounded-lg border border-purple-600
              transition-transform duration-300 hover:scale-105"
          />
        )}

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-[#2A2A32] border border-gray-700 rounded-md text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow duration-300"
          required
        />

        <input
          type="text"
          placeholder="Size (e.g., M, L, XL)"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-[#2A2A32] border border-gray-700 rounded-md text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow duration-300"
          required
        />

        <input
          type="text"
          placeholder="Condition (e.g., Like New)"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full mb-6 px-4 py-2 bg-[#2A2A32] border border-gray-700 rounded-md text-white placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-shadow duration-300"
          required
        />

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold
            transition-transform transform hover:scale-105 hover:shadow-lg disabled:opacity-60 cursor-pointer"
        >
          {uploading ? "Uploading..." : "Upload Item"}
        </button>
      </form>
    </div>
  );
};

export default Upload;
