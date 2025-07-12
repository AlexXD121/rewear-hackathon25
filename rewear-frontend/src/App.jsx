import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import ItemListing from "./pages/ItemListing";
import AddItem from "./components/AddItem";
import CategoryListing from "./pages/CategoryListing";
import MenCategory from "./pages/MenCategory";
import ProductDetail from "./pages/ProductDetail"; // Optional/testing
import AdminPanel from "./components/AdminPanel";
// Future Pages (uncomment when ready)
// import SwapHistory from "./pages/SwapHistory";
// import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <>
      {/* Toast notifications for the entire app */}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* ===== AUTH ROUTES ===== */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ===== PUBLIC ROUTES ===== */}
        <Route path="/landing" element={<Landing />} />
        <Route path="/item/:id" element={<ItemListing />} />
        <Route path="/category/:category" element={<CategoryListing />} />
        <Route path="/category/Men" element={<MenCategory />} />
        <Route path="/product/:id" element={<ProductDetail />} /> {/* Optional */}

        {/* ===== USER DASHBOARD ROUTES ===== */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/add-item" element={<AddItem />} />

        {/* ===== FUTURE / ADMIN ROUTES ===== */}
        {/* Uncomment when these pages are ready */}
        {/* <Route path="/swaps" element={<SwapHistory />} /> */}
        <Route path="/admin" element={<AdminPanel />} />
        

        {/* ===== CATCH-ALL: Redirect unknown routes to landing or 404 page ===== */}
        <Route path="*" element={<Navigate to="/landing" replace />} />
      </Routes>
    </>
  );
}

export default App;
