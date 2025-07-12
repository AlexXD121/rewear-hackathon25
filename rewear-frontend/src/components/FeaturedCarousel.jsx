import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

const items = [
  {
    name: "Denim Jacket",
    size: "M",
    condition: "Like New",
    img: "https://via.placeholder.com/300x200?text=Jacket",
  },
  {
    name: "Hoodie",
    size: "L",
    condition: "Worn Twice",
    img: "https://via.placeholder.com/300x200?text=Hoodie",
  },
  {
    name: "Sneakers",
    size: "8",
    condition: "Excellent",
    img: "https://via.placeholder.com/300x200?text=Sneakers",
  },
  {
    name: "Leather Bag",
    size: "-",
    condition: "Good",
    img: "https://via.placeholder.com/300x200?text=Bag",
  },
];

const FeaturedCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="px-6 md:px-12 py-10 bg-[#1A1A1F]">
      <h2 className="text-3xl font-semibold text-white text-center mb-6">🔥 Popular Items</h2>
      <Slider {...settings}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="p-4"
            whileHover={{ scale: 1.03 }}
          >
            <div className="bg-[#2A2A32] rounded-xl overflow-hidden shadow-lg border border-gray-700">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-purple-300 font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-400">Size: {item.size}</p>
                <p className="text-sm text-gray-400">Condition: {item.condition}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedCarousel;
