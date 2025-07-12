import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Local image imports (make sure the paths are correct)
import acMilanImg from "../assets/images/men/football jersy/SOLDOUT🎒 (1).jpg";
import nikeWindcheaterImg from "../assets/images/men/jackent/NIK E WINDCHEATER🌟Size- smallcolour- black whitecondition- 10-10price- 1600--Including shipping (1).jpg";

const MenCategory = () => {
  const navigate = useNavigate();

  const items = [
    {
      title: "AC MILAN CL FINAL 2007 JERSEY 🔴⚫️🏆",
      image: acMilanImg,
      description: `Size – M (Medium)
Colour – White with red & black accents
Condition – 9/10 (Vintage, no major flaws)
Price – ₹1899/- Including shipping ✅
Payment Mode – Online only (No COD) 💳
Usage – Worn once, well-preserved
Details –
• Adidas branding ✅
• Champions League Athens Final embroidery 🏟️
• BWIN sponsor
• Collector’s piece for true Rossoneri fans 🔥`,
    },
    {
      title: "NIKE WINDCHEATER 🌟",
      image: nikeWindcheaterImg,
      description: `Size – Small
Colour – Black & White
Condition – 9/10
Price – ₹1600/- Including shipping ✅
Payment Mode – Online only (No COD)
Usage – Only once worn`,
    },
    {
      title: "NIKE DRI-FIT SLEEVELESS TEE 🏀💨",
      image: "E:/Hackathon/ReWear/rewear-frontend/src/assets/images/men/sleev less t shirt'/SOLDOUT🎒 (1).jpg",
      description: `Size – M (Medium)
Colour – White with black detailing
Condition – 9.5/10 (No stains, no damage)
Price – ₹999/- Including shipping ✅
Payment Mode – Online only (No COD) 💳
Usage – Tried once indoors 🧼
Features – Breathable fabric, lightweight, perfect for workouts or summer fits ☀️🏋️`,
    },
    {
      title: "SAMSUNG x ADIDAS VINTAGE JERSEY ⚽️🔥",
      image: "https://via.placeholder.com/400x250?text=SAMSUNG+JERSEY",
      description: `Size – L (Large)
Colour – Royal Blue 💙
Condition – 9.5/10 (Near mint)
Price – ₹1499/- including shipping 🚚✅
Payment Mode – Online only (No COD) 💳
Usage – Worn just once (Collector’s piece 🧵)`,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white px-6 md:px-12 py-10 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-bold text-purple-400">Men's Clothing</h2>
        <button
          onClick={() => navigate("/landing")}
          className="text-sm text-purple-300 border border-purple-500 px-4 py-2 rounded hover:bg-purple-600 hover:text-white transition"
        >
          ⬅ Back to Home
        </button>
      </div>

      {/* Item Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="bg-[#1F1F28] p-4 rounded-xl border border-purple-800 hover:border-purple-500 transition-shadow duration-300 shadow-md hover:shadow-purple-500/50 group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative overflow-hidden rounded">
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover rounded group-hover:blur-[1px] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-40 transition duration-300" />
            </div>

            <h4 className="text-lg font-semibold text-purple-300 mt-4 mb-2 group-hover:underline">
              {item.title}
            </h4>
            <pre className="text-sm text-gray-400 whitespace-pre-wrap group-hover:text-gray-300 transition-all duration-200">
              {item.description}
            </pre>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MenCategory;
