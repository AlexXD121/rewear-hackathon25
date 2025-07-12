import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [uploader, setUploader] = useState(null);
  const [previousListings, setPreviousListings] = useState([]);
  const [status, setStatus] = useState("Available");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "listings", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProduct(data);
        setPoints(data.pointsRequired || 0);
        fetchUploaderInfo(data.userId);
        fetchUserListings(data.userId);
      }
    };

    const fetchUploaderInfo = async (uid) => {
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUploader(userSnap.data());
      }
    };

    const fetchUserListings = async (uid) => {
      const q = query(collection(db, "listings"), where("userId", "==", uid));
      const snapshot = await getDocs(q);
      const filtered = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((item) => item.id !== id);
      setPreviousListings(filtered);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div className="text-white text-center mt-10">Loading product...</div>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
  };

  const badgeColor = status === "Available" ? "bg-green-600" : "bg-red-600";

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white px-6 py-10 font-sans">
      <h1 className="text-3xl font-bold text-purple-400 mb-10 text-center">Product Detail</h1>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Image Carousel */}
        <div className="bg-[#ffffff0a] backdrop-blur-md p-5 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-purple-300">Image Gallery</h3>
          <Slider {...settings}>
            {product.images && product.images.length > 0 ? (
              product.images.map((img, idx) => (
                <div key={idx} className="flex items-center justify-center h-64">
                  <img
                    src={img}
                    alt={`Product ${idx + 1}`}
                    className="h-full object-contain rounded shadow-md"
                  />
                </div>
              ))
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-400 bg-gray-800 rounded">
                No Images Available
              </div>
            )}
          </Slider>
        </div>

        {/* Description */}
        <div className="bg-[#ffffff0a] backdrop-blur-md p-5 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-purple-300">Product Description</h3>
          <p className="text-gray-300 text-sm whitespace-pre-wrap mb-6">{product.description}</p>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${badgeColor}`}>{status}</span>
        </div>
      </div>

      {/* Uploader Info + Options */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Uploader Info */}
        <div className="bg-[#ffffff0a] backdrop-blur-md p-5 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-purple-300">Uploader Info</h3>
          {uploader ? (
            <>
              <p className="text-sm text-white font-medium">Name: {uploader.name || "Unknown"}</p>
              <p className="text-sm text-gray-400">Email: {uploader.email || "N/A"}</p>
            </>
          ) : (
            <p className="text-gray-500">Uploader data not found.</p>
          )}
        </div>

        {/* Swap / Redeem Options */}
        <div className="bg-[#ffffff0a] backdrop-blur-md p-5 rounded-xl border border-gray-700">
          <h3 className="text-lg font-semibold mb-3 text-purple-300">Available Actions</h3>
          <p className="text-white mb-2 text-sm">Redeem with: <span className="text-yellow-400 font-bold">{points}</span> Points</p>
          <div className="flex gap-4">
            <button
              onClick={() => setStatus("Swap Requested")}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium text-sm shadow"
            >
              Request Swap
            </button>
            <button
              onClick={() => setStatus("Redeemed via Points")}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md font-medium text-sm shadow"
            >
              Redeem Points
            </button>
          </div>
        </div>
      </div>

      {/* Previous Listings */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-purple-400 mb-4">Uploader's Other Items</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {previousListings.length === 0 ? (
            <p className="text-gray-500 col-span-full">No other items found.</p>
          ) : (
            previousListings.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.03 }}
                className="bg-[#ffffff0a] backdrop-blur-md p-4 rounded-xl border border-gray-700 transition"
              >
                <div className="h-32 bg-gray-800 rounded mb-2" />
                <h4 className="text-white text-sm font-semibold truncate">{item.title}</h4>
                <p className="text-gray-400 text-xs truncate">{item.description}</p>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
