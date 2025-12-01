import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import AdminLogin from "../pages/AdminLogin";
import DashboardLayout from "../components/Admin/DashboardLayout";
import AdminDashboard from "../components/Admin/AdminDashboard";
import AdminNotifications from "../components/Admin/AdminNotifications";
import ApprovedPharmacies from "../components/Admin/ApprovedPhamcies";
import PendingPharmacies from "../components/Admin/PendingPharmacies";
import AdminProfile from "../components/Admin/AdminProfile";
import ChangePassword from "../components/Admin/ChangePassword";
import AdminForget from "../pages/AdminForget";
import AdminResetPassword from "../pages/AdminResetPassword";
import PharmacyDetailPage from "../components/PharmacyDetailPage";

const AdminProtectedRoute = () => {
  const isAuth = localStorage.getItem("is_auth");
  const role = localStorage.getItem("userRole");

  if (isAuth != "true") {
    return <Navigate to="/admin/login" replace />;
  }

  if (role != "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="login" element={<AdminLogin />} />
      <Route path="forgot-password" element={<AdminForget />} />
      <Route
        path="password-reset/:userId/:token"
        element={<AdminResetPassword />}
      />

      {/* Protected Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="notifications" element={<AdminNotifications />} />
          <Route path="pharmacy/approved" element={<ApprovedPharmacies />} />
          <Route path="pharmacy/pending" element={<PendingPharmacies />} />
          <Route
            path="pharmacy/:status/detail/:pharmacyId"
            element={<PharmacyDetailPage />}
          />
          <Route path="account/profile" element={<AdminProfile />} />
          <Route path="account/change-password" element={<ChangePassword />} />
        </Route>
      </Route>

      {/* Unauthorized Page */}
      <Route
        path="/unauthorized"
        element={
          <div className="p-6 text-center">
            <h1 className="text-3xl font-bold mb-4">Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
          </div>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
