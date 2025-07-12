import React, { useEffect, useState } from "react";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const ADMIN_EMAIL = "admin@example.com";

const dummyUsers = [
  { id: 1, name: "Dhaval Rathva", email: "dhaval@example.com", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Hemu", email: "hemu@example.com", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Test User", email: "test@example.com", avatar: "https://i.pravatar.cc/150?img=3" },
];

const Dashboard = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [listings, setListings] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [activeTab, setActiveTab] = useState("listings");
  const [loadingData, setLoadingData] = useState(false);

  // Sample points and swaps (replace with real data fetch if needed)
  const [pointsBalance, setPointsBalance] = useState(1200);
  const [swaps, setSwaps] = useState([
    { id: 1, title: "Swap: Book for Headphones", status: "Ongoing" },
    { id: 2, title: "Swap: Guitar for Camera", status: "Completed" },
    { id: 3, title: "Swap: Laptop for Tablet", status: "Ongoing" },
  ]);

  // On mount, auth state change listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setNewName(currentUser.displayName || "");
        setNewEmail(currentUser.email || "");
        await fetchData(currentUser.uid);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  // Fetch user listings and purchases from Firestore
  const fetchData = async (uid) => {
    setLoadingData(true);
    try {
      const listingQuery = query(collection(db, "items"), where("userId", "==", uid));
      const purchaseQuery = query(collection(db, "purchases"), where("userId", "==", uid));
      const [listingSnap, purchaseSnap] = await Promise.all([
        getDocs(listingQuery),
        getDocs(purchaseQuery),
      ]);
      setListings(listingSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setPurchases(purchaseSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch data.");
    }
    setLoadingData(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  // Save updated profile display name
  const saveProfile = async () => {
    try {
      if (!newName.trim()) {
        toast.error("Name cannot be empty.");
        return;
      }
      await updateProfile(auth.currentUser, { displayName: newName.trim() });
      toast.success("Profile updated!");
      setUser({ ...user, displayName: newName.trim() });
      setShowEdit(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  };

  // Filter listings by search query
  const filteredListings = listings.filter((item) =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isAdmin = user?.email === ADMIN_EMAIL;

  const activityData = [
    { name: "Listings", value: listings.length },
    { name: "Purchases", value: purchases.length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0B0F] to-[#1A1A1F] text-white px-6 md:px-12 py-10 font-sans">

      {/* Header Section */}
      <div className="bg-[#ffffff0a] backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-purple-600 bg-opacity-30 rounded-full flex items-center justify-center text-3xl font-semibold shadow-inner">
              {user?.displayName?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-purple-300">{user?.displayName || "User"}</h2>
              <p className="text-sm text-gray-400">{user?.email}</p>
              <div className="flex gap-3 mt-3">
                <span className="bg-[#ffffff14] px-4 py-1 rounded-md text-sm border border-purple-500">Listings: {listings.length}</span>
                <span className="bg-[#ffffff14] px-4 py-1 rounded-md text-sm border border-purple-500">Purchases: {purchases.length}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowEdit(true)}
              className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-md text-sm font-medium transition"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-md text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      {isAdmin && (
        <div className="flex justify-center gap-4 mb-8">
          {["users", "listings", "purchases"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-md text-sm font-semibold transition ${
                activeTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-[#2A2A32] text-gray-300 hover:bg-[#3A3A40]"
              }`}
            >
              Manage {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && isAdmin && (
        <>
          <h3 className="text-xl font-semibold text-purple-400 mb-4">Manage Users</h3>
          {dummyUsers.map((u) => (
            <div
              key={u.id}
              className="flex items-center justify-between p-4 bg-[#1F1F28] mb-4 rounded-xl border border-purple-700"
            >
              <div className="flex items-center gap-4">
                <img src={u.avatar} alt={`${u.name} avatar`} className="w-14 h-14 rounded-full" />
                <div>
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-sm text-gray-400">{u.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-md text-sm">Action 1</button>
                <button className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-md text-sm">Action 2</button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Listings Tab */}
      {activeTab === "listings" && (
        <>
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <input
              type="text"
              placeholder="Search listings..."
              className="w-full md:flex-1 bg-[#1F1F28] border border-gray-700 px-4 py-2 rounded-md text-white placeholder:text-gray-400"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
            <button
              onClick={() => navigate("/upload")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition"
            >
              + Upload Item
            </button>
          </div>

          <div className="mb-12">
            <h3 className="text-xl font-semibold text-purple-400 mb-4">My Listings</h3>
            {loadingData ? (
              <p className="text-gray-400">Loading listings...</p>
            ) : filteredListings.length === 0 ? (
              <p className="text-gray-500">No listings found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredListings.map((item) => (
                  <motion.div
                    key={item.id || item.title} // fallback key
                    whileHover={{ scale: 1.03 }}
                    className="bg-[#ffffff0a] backdrop-blur-md p-4 rounded-xl shadow border border-gray-700 transition"
                  >
                    <div className="h-36 bg-gray-800 rounded mb-3 animate-pulse" />
                    <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                    <p className="text-sm text-gray-400">Size: {item.size}</p>
                    <p className="text-sm text-gray-400">Condition: {item.condition}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Purchases Tab */}
      {activeTab === "purchases" && (
        <div className="mb-12">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">My Purchases</h3>
          {loadingData ? (
            <p className="text-gray-400">Loading purchases...</p>
          ) : purchases.length === 0 ? (
            <p className="text-gray-500">No purchases found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {purchases.map((item) => (
                <motion.div
                  key={item.id || item.title || item.name}
                  whileHover={{ scale: 1.03 }}
                  className="bg-[#ffffff0a] backdrop-blur-md p-4 rounded-xl shadow border border-gray-700 transition"
                >
                  <div className="h-36 bg-gray-800 rounded mb-3 animate-pulse" />
                  <h4 className="text-lg font-semibold text-white">{item.title || item.name}</h4>
                  <p className="text-sm text-gray-400">{item.status || "Completed"}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Usage Summary Chart */}
      <div className="bg-[#ffffff0a] backdrop-blur-md p-6 rounded-xl border border-gray-700 mb-10">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Usage Summary</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={activityData}>
            <XAxis dataKey="name" stroke="#ccc" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#a855f7" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Profile Details and Points Balance */}
      <div className="bg-[#ffffff0a] backdrop-blur-md p-6 rounded-xl border border-gray-700 mb-10 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Profile Details & Points Balance</h3>
        <div className="flex items-center gap-6">
          <img
            src={user?.photoURL || `https://i.pravatar.cc/150?u=${user?.email}`}
            alt="User avatar"
            className="w-24 h-24 rounded-full border-2 border-purple-600"
          />
          <div>
            <p className="text-lg font-semibold">{user?.displayName || "User"}</p>
            <p className="text-sm text-gray-400 mb-2">{user?.email}</p>
            <p className="text-purple-300 font-semibold text-lg">Points Balance: {pointsBalance}</p>
          </div>
        </div>
      </div>

      {/* Ongoing and Completed Swaps */}
      <div className="bg-[#ffffff0a] backdrop-blur-md p-6 rounded-xl border border-gray-700 mb-10 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">Ongoing & Completed Swaps</h3>
        {swaps.length === 0 ? (
          <p className="text-gray-500">No swaps found.</p>
        ) : (
          <ul className="space-y-4">
            {swaps.map((swap) => (
              <li
                key={swap.id}
                className={`p-4 rounded-md border ${
                  swap.status === "Completed"
                    ? "border-green-600 bg-green-900/20"
                    : "border-yellow-600 bg-yellow-900/20"
                }`}
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold text-white">{swap.title}</p>
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${
                      swap.status === "Completed"
                        ? "bg-green-600 text-green-100"
                        : "bg-yellow-600 text-yellow-100"
                    }`}
                  >
                    {swap.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Profile Edit Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1F1F28] p-6 rounded-xl w-[90%] max-w-md border border-purple-600">
            <h3 className="text-xl text-purple-400 font-semibold mb-4">Edit Profile</h3>
            <input
              type="text"
              className="w-full bg-[#2A2A32] border border-gray-600 p-2 rounded-md mb-4 text-white"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Display Name"
              autoFocus
            />
            <input
              type="email"
              className="w-full bg-[#2A2A32] border border-gray-600 p-2 rounded-md mb-4 text-white cursor-not-allowed"
              value={newEmail}
              readOnly
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={saveProfile}
                className="px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;
