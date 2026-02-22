import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomePage from "./landing_page/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./landing_page/signup/Signup";
import Login from "./landing_page/login/Login";
import AboutPage from "./landing_page/about/AboutPage";
import ProductsPage from "./landing_page/products/ProductsPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";
import NotFound from "./landing_page/NotFound";
import AppLayout from "./components/AppLayout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./dashboard/DashboardPage";
import Summary from "./dashboard/Summary";
import Holdings from "./dashboard/Holdings";
import Positions from "./dashboard/Positions";
import Orders from "./dashboard/Orders";
import Funds from "./dashboard/Funds";
import Apps from "./dashboard/Apps";
import "./dashboard/dashboard.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/product" element={<ProductsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Summary />} />
              <Route path="holdings" element={<Holdings />} />
              <Route path="positions" element={<Positions />} />
              <Route path="orders" element={<Orders />} />
              <Route path="funds" element={<Funds />} />
              <Route path="apps" element={<Apps />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
