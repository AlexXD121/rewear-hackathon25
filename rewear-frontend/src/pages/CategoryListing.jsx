import React from "react";
import { useParams } from "react-router-dom";

const CategoryListing = () => {
  const { category } = useParams();

  // Mock data — replace this later with real Firebase data
  const allItems = [
    { id: 1, name: "Men's Jacket", category: "Men" },
    { id: 2, name: "Women's Top", category: "Women" },
    { id: 3, name: "Cap", category: "Accessories" },
  ];

  const filteredItems = allItems.filter(item => item.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white px-8 py-12">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">Category: {category}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <div key={item.id} className="bg-[#1F1F28] p-4 rounded-lg shadow hover:shadow-purple-700 transition">
              <div className="h-40 bg-gray-700 rounded mb-3 animate-pulse" />
              <h3 className="text-lg text-purple-300">{item.name}</h3>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No items found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryListing;
