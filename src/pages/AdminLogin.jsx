import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import adminLoginSchema from "../validations/adminLoginSchema";
import { loginAdmin } from "../api/admin";
const AdminLogin = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: adminLoginSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoginError("");
      try {
        const res = await loginAdmin(values);
        // debugger;
        if (res.data.status === "success") {
          localStorage.setItem("accessToken", res.data.access_token);
          localStorage.setItem("is_auth", true);
          localStorage.setItem("userRole", res.data.user.role);
          resetForm();
          navigate("/admin/dashboard");
        } else {
          setLoginError(res.data.message || "Login failed");
        }
      } catch (err) {
        const message =
          err.response?.data?.message ||
          "Invalid credentials. Please try again.";
        setLoginError(message);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#298aaa] mb-6">
          Pharmacy Admin Login
        </h2>
        {loginError && (
          <div className="mb-4 text-center text-[#D32F2F] font-semibold">
            {loginError}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-[#211221] mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`w-full px-4 py-2 border text-l rounded-md shadow-sm text-[#211221] focus:outline-none focus:ring-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-[#D32F2F] focus:ring-red-300"
                  : "border-[#F5F5F5] focus:ring-[#298aaa]"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-[#D32F2F] text-sm mt-1">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-[#211221] mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`w-full px-4 py-2 text-l border rounded-md text-[#211221] shadow-sm focus:outline-none focus:ring-2  ${
                formik.touched.password && formik.errors.password
                  ? "border-[#D32F2F] focus:ring-red-300"
                  : "border-[#F5F5F5] focus:ring-[#298aaa]"
              }`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-[#D32F2F] text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-[#298aaa] hover:bg-[#075c79] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-4 text-center">
          <Link
            to="/admin/forgot-password"
            className="text-sm text-[#298aaa] hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="mt-8 text-center text-[#211221] text-sm font-medium tracking-wide">
          &copy; 2025{" "}
          <span className="font-semibold text-[#298aaa]">PharmaConnect+</span>{" "}
          Pharmacy Management System
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
