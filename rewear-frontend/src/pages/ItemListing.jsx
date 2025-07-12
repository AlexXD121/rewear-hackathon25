import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ItemListing = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, "items", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem(docSnap.data());
        } else {
          alert("Item not found!");
        }
      } catch (err) {
        console.error("Error fetching item:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center">
        <p>Loading item...</p>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white font-sans px-6 md:px-12 py-6">
      {/* Top Nav & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <h1
          className="text-3xl font-extrabold text-purple-400 cursor-pointer"
          onClick={() => navigate("/landing")}
        >
          ReWear
        </h1>
        <div className="flex items-center bg-[#1a1a1f] rounded-full px-4 py-2 border border-gray-700 w-full max-w-md shadow-md">
          <input
            type="text"
            placeholder="Search items..."
            className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none px-2"
          />
          <FaSearch className="text-purple-400 text-base" />
        </div>
      </div>

      {/* Main Product Display */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          className="bg-[#1F1F28] h-80 md:h-[22rem] rounded-xl border border-gray-700 overflow-hidden shadow"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="bg-[#1F1F28] p-6 rounded-xl border border-gray-700 shadow-lg"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-purple-300 mb-4">{item.title}</h2>
          <p className="text-gray-400 mb-2 text-sm">🧍 Size: <span className="font-medium text-white">{item.size}</span></p>
          <p className="text-gray-400 mb-4 text-sm">✨ Condition: <span className="font-medium text-white">{item.condition}</span></p>
          <p className="text-gray-300 leading-relaxed text-base">
            This is a listed item from the ReWear community. It is available for sustainable swapping!
          </p>

          <button
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-full transition-all shadow"
            onClick={() => alert("Swap request coming soon!")}
          >
            Request Swap
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ItemListing;
