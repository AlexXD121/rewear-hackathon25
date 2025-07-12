import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // <-- import useNavigate
import toast from "react-hot-toast";

const staticItems = [
  { id: 1, title: "Red Hoodie", size: "L", condition: "Used - Good" },
  { id: 2, title: "Blue Jeans", size: "M", condition: "New" },
  { id: 3, title: "Black Sneakers", size: "42", condition: "Used - Like New" },
];

const AdminPanel = ({ onLogout }) => {
  const navigate = useNavigate();  // <-- initialize navigate
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchItems = () => {
    setLoading(true);
    setTimeout(() => {
      setItems(staticItems);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAction = (itemId, action) => {
    toast.success(`Item ${action}ed successfully`);
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-white font-sans">
      <div className="max-w-7xl mx-auto bg-[#1f2937] rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 space-x-4">
          <h2 className="text-3xl font-bold tracking-wide">Admin Panel</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate("/landing")}
              className="bg-blue-600 hover:bg-blue-700 transition rounded-lg px-4 py-2 font-semibold shadow-md"
            >
              Go to Main Page
            </button>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 transition rounded-lg px-4 py-2 font-semibold shadow-md"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-20">
            <svg
              className="animate-spin h-12 w-12 text-purple-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
          </div>
        )}

        {/* No Items */}
        {!loading && items.length === 0 && (
          <p className="text-center text-gray-400 text-xl mt-20">
            No pending items to moderate.
          </p>
        )}

        {/* Items Table */}
        {!loading && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700 rounded-lg shadow-lg">
              <thead className="bg-gray-800">
                <tr>
                  <th className="border border-gray-600 px-6 py-3 text-left text-purple-400 uppercase tracking-wider font-semibold select-none">
                    Title
                  </th>
                  <th className="border border-gray-600 px-6 py-3 text-left text-purple-400 uppercase tracking-wider font-semibold select-none">
                    Size
                  </th>
                  <th className="border border-gray-600 px-6 py-3 text-left text-purple-400 uppercase tracking-wider font-semibold select-none">
                    Condition
                  </th>
                  <th className="border border-gray-600 px-6 py-3 text-center text-purple-400 uppercase tracking-wider font-semibold select-none">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-700 transition-colors cursor-pointer"
                    title={`ID: ${item.id}`}
                  >
                    <td className="border border-gray-600 px-6 py-4">{item.title}</td>
                    <td className="border border-gray-600 px-6 py-4">{item.size}</td>
                    <td className="border border-gray-600 px-6 py-4">{item.condition}</td>
                    <td className="border border-gray-600 px-6 py-4 text-center space-x-3">
                      <button
                        onClick={() => handleAction(item.id, "accept")}
                        className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-lg font-semibold shadow-sm transition"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(item.id, "reject")}
                        className="bg-yellow-600 hover:bg-yellow-700 px-4 py-1 rounded-lg font-semibold shadow-sm transition"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleAction(item.id, "remove")}
                        className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-lg font-semibold shadow-sm transition"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
