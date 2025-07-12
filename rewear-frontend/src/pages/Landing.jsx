import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaArrowDown, FaSearch } from "react-icons/fa";
import logo from "../assets/images/logo.png";

// Import images relative to src
import jerseyImg from "../assets/images/men/football jersy/SOLDOUT🎒 (1).jpg";
import windcheaterImg from "../assets/images/men/jackent/NIK E WINDCHEATER🌟Size- smallcolour- black whitecondition- 10-10price- 1600--Including shipping (1).jpg";
import sleevelessImg from "../assets/images/men/sleev less t shirt'/SOLDOUT🎒 (1).jpg";

const Landing = () => {
  const navigate = useNavigate();

  const scrollToFeatured = () => {
    const section = document.getElementById("featured");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAdminClick = () => {
    const passcode = prompt("Enter admin passcode:");
    if (passcode === "123456789") {
      navigate("/admin");
    } else {
      alert("Incorrect passcode!");
    }
  };

  // Featured items data with images
  const featuredItems = [
    {
      id: 1,
      title: "Football Jersey",
      size: "M",
      condition: "Used - Good",
      img: jerseyImg,
    },
    {
      id: 2,
      title: "Nike Windcheater",
      size: "Small",
      condition: "10/10 New",
      img: windcheaterImg,
    },
    {
      id: 3,
      title: "Sleeveless T-Shirt",
      size: "L",
      condition: "Used - Like New",
      img: sleevelessImg,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 md:px-12 py-4 bg-[#111111] shadow-sm sticky top-0 z-20">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/landing")}
        >
          <img
            src={logo}
            alt="ReWear Logo"
            className="w-9 h-9 rounded-full border border-purple-500"
          />
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            ReWear
          </h1>
        </div>
        <nav className="space-x-4 text-sm md:text-base font-medium">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-300 hover:text-purple-400 transition"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/login")}
            className="text-gray-300 hover:text-purple-400 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-gray-300 hover:text-purple-400 transition"
          >
            Register
          </button>
          <button
            onClick={handleAdminClick}
            className="text-gray-300 hover:text-red-500 font-semibold transition"
          >
            Admin
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative text-center py-28 px-4 bg-gradient-to-b from-[#1a1a1f] to-[#0B0B0F]">
        <motion.div
          className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] bg-purple-900 rounded-full blur-[160px] opacity-30 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 1 }}
        />
        <motion.h2
          className="relative z-10 text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text leading-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to ReWear
        </motion.h2>
        <motion.p
          className="relative z-10 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Swap clothes. Save money. Sustain the planet.
        </motion.p>
        <motion.div
          className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={scrollToFeatured}
            className="px-6 py-3 bg-purple-600 text-white rounded-full shadow-md hover:shadow-purple-500/40 hover:bg-purple-700 transition-all font-semibold"
          >
            Start Swapping
          </button>
          <button
            onClick={scrollToFeatured}
            className="px-6 py-3 border border-purple-500 text-purple-400 rounded-full hover:bg-[#1F1F28] transition-all font-semibold"
          >
            Browse Items
          </button>
          <button
            onClick={() => navigate("/upload")}
            className="px-6 py-3 bg-pink-600 text-white rounded-full shadow-md hover:shadow-pink-500/40 hover:bg-pink-700 transition-all font-semibold"
          >
            List an Item
          </button>
        </motion.div>
        <div className="mt-16 flex justify-center">
          <FaArrowDown className="text-purple-400 animate-bounce text-xl" />
        </div>
      </section>

      {/* Search Bar */}
      <section className="px-6 md:px-12 py-6 bg-[#111111]">
        <div className="flex items-center max-w-xl mx-auto bg-[#1a1a1f] rounded-full px-4 py-2 border border-gray-700 shadow-md">
          <input
            type="text"
            placeholder="Search for clothes, categories..."
            className="flex-1 bg-transparent text-white placeholder:text-gray-500 focus:outline-none px-2 py-2"
          />
          <FaSearch className="text-purple-400 text-sm" />
        </div>
      </section>

      {/* Categories */}
      <section className="px-6 md:px-12 py-8 bg-[#0B0B0F]">
        <h3 className="text-2xl font-semibold mb-6 text-white text-center">Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
          {["Men", "Women", "Kids", "Shoes", "Accessories", "Winterwear"].map((cat, i) => (
            <motion.div
              key={i}
              className="bg-[#1F1F28] py-3 rounded-lg text-purple-300 font-medium border border-gray-700 hover:bg-purple-800 hover:text-white transition cursor-pointer"
              whileHover={{ scale: 1.08 }}
              onClick={() => navigate(`/category/${cat}`)}
            >
              {cat}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Items */}
      <section id="featured" className="px-6 md:px-12 py-16 bg-[#141414]">
        <h3 className="text-3xl font-semibold mb-10 text-center text-white">Featured Swaps</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => navigate(`/item/${item.id}`)}
              className="bg-[#1F1F28] p-4 rounded-xl shadow hover:shadow-purple-700/40 transition transform hover:-translate-y-1 cursor-pointer"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-44 object-cover rounded mb-4"
              />
              <h4 className="font-semibold text-lg text-purple-300">{item.title}</h4>
              <p className="text-sm text-gray-400 mt-1">
                Size: {item.size} | Condition: {item.condition}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm py-8 text-gray-400 border-t border-gray-800 bg-[#0B0B0F]">
        © 2025 <span className="text-purple-400 font-semibold">ReWear</span> • Made with ♻️ by The Optimizers
        <div className="mt-2 space-x-4 text-xs text-gray-500">
          <button onClick={() => alert("Terms coming soon!")} className="hover:text-purple-300">
            Terms
          </button>
          <button onClick={() => alert("Privacy coming soon!")} className="hover:text-purple-300">
            Privacy
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
