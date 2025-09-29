import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import adminForgetSchema from "../validations/adminForgetSchema";
import { adminForget } from "../api/admin";

const AdminForget = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: adminForgetSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setMessage("");
      try {
        const res = await adminForget(values);
        if (res.data.status === "success") {
          setMessage("Password reset email sent! Check your email");
          resetForm();
          setTimeout(() => {
            navigate("/admin/login");
          }, 2000);
        } else {
          setMessage(
            res.data.message || "Failed to send password reset email."
          );
        }
      } catch (err) {
        setMessage(
          err.response?.data?.message ||
            "Failed to send password reset email. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#F5F5F5] flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#298aaa] mb-6">
          Pharmacy Admin Forgot Password
        </h2>

        {message && (
          <div
            className={`mb-4 text-center font-semibold ${
              message.toLowerCase().includes("sent")
                ? "text-[#4CAF50]"
                : "text-[#D32F2F]"
            }`}
          >
            {message}
          </div>
        )}

        {!message.toLowerCase().includes("sent") && (
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                className={`w-full px-4 py-2 text-l border rounded-md text-[#211221] shadow-sm focus:outline-none focus:ring-2 ${
                  formik.touched.email && formik.errors.email
                    ? "border-[#D32F2F] focus:ring-red-300"
                    : "border-gray-300 focus:ring-[#298aaa]"
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

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#298aaa] hover:bg-[#075c79] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              {formik.isSubmitting ? "Sending..." : "Send Reset Email"}
            </button>
          </form>
        )}
        <div className="mt-6 text-center text-sm text-[#757575]">
          Remembered your password?{" "}
          <Link to="/admin/login" className="text-[#298aaa] hover:underline">
            Login
          </Link>
        </div>
        <div className="mt-8 text-center text-sm  text-[#211221] font-medium tracking-wide">
          &copy; 2025{" "}
          <span className="font-semibold text-[#298aaa]">PharmaConnect+</span>{" "}
          Pharmacy Management System
        </div>
      </div>
    </div>
  );
};

export default AdminForget;
