import React, { useState } from "react";
import { db } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const AddItem = () => {
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async () => {
    if (!image) return toast.error("Please select an image");
    const storage = getStorage();
    const imageRef = ref(storage, `items/${uuidv4()}-${image.name}`);
    await uploadBytes(imageRef, image);
    const url = await getDownloadURL(imageRef);
    setImageURL(url);
    return url;
  };

  const handleSubmit = async () => {
    if (!title || !price || !category || !description || !image) {
      return toast.error("Fill all required fields.");
    }

    try {
      setLoading(true);
      const imageUrl = await handleImageUpload();

      const newItem = {
        title,
        price,
        category,
        size,
        condition,
        tags: tags.split(",").map((tag) => tag.trim()),
        description,
        imageUrl,
        createdAt: Timestamp.now(),
      };

      await addDoc(collection(db, "items"), newItem);
      toast.success("Item uploaded!");

      // Reset fields
      setTitle("");
      setPrice("");
      setCategory("");
      setSize("");
      setCondition("");
      setTags("");
      setDescription("");
      setImage(null);
      setImageURL("");
    } catch (err) {
      console.error(err);
      toast.error("Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-white py-10 px-6 md:px-20 font-sans">
      <h2 className="text-3xl font-bold text-purple-400 mb-8 text-center">Add New Item</h2>

      <div className="bg-[#ffffff0a] p-6 rounded-xl shadow-lg border border-gray-700 space-y-6 max-w-4xl mx-auto">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full bg-[#1A1A1F] p-2 rounded border border-gray-600"
          />
          {imageURL && (
            <img
              src={imageURL}
              alt="Preview"
              className="mt-4 w-40 h-40 object-cover rounded border border-gray-700"
            />
          )}
        </div>

        {/* Title and Price */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Item Title *</label>
            <input
              type="text"
              className="w-full bg-[#1A1A1F] p-2 rounded border border-gray-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Price *</label>
            <input
              type="number"
              className="w-full bg-[#1A1A1F] p-2 rounded border border-gray-600"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Category, Size, Condition */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Category *</label>
            <input
              type="text"
              className="w-full bg-[#1A1A1F] p-2 rounded border border-gray-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Size</label>
            <input
              type="text"
              className="w-full bg-[#1A1A1F] p-2 rounded border border-gray-600"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Condition</label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full bg-[#1A1A1F] p-2 rounded border border-gray-600"
            >
              <option value="">Select</option>
              <option value="New">New</option>
              <option value="Used - Good">Used - Good</option>
              <option value="Used - Fair">Used - Fair</option>
            </select>
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-semibold mb-2">Tags (comma separated)</label>
          <input
            type="text"
            className="w-full bg-[#1A1A1F] p-2 rounded border border-gray-600"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-2">Description *</label>
          <textarea
            className="w-full bg-[#1A1A1F] p-3 rounded border border-gray-600 min-h-[100px]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full shadow disabled:opacity-50"
          >
            {loading ? "Uploading..." : "Submit Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
