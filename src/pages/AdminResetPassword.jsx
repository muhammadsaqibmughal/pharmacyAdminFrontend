import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import { adminResetPassword } from "../api/admin";
import resetPasswordSchema from "../validations/resetPasswordSchema";

const AdminResetPassword = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState("");
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setError("");
      setServerMessage("");
      try {
        const response = await adminResetPassword(
          userId,
          token,
          values.password
        );

        if (response.data.status === "success") {
          setServerMessage(
            "Password reset successful! Redirecting to login page..."
          );
          setTimeout(() => {
            navigate("/admin/login");
          }, 2000);
        } else {
          setError(response.data.message || "Failed to reset password.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br bg-[#F5F5F5] flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#298aaa] mb-6">
          Reset Password
        </h2>

        {serverMessage && (
          <div className="mb-4 text-center text-[#4CAF50] font-semibold">
            {serverMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 text-center text-[#D32F2F] font-semibold">
            {error}
          </div>
        )}

        {!serverMessage && (
          <form onSubmit={formik.handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                className={`w-full px-4 py-2 text-l border rounded-md text-[#211221] shadow-sm focus:outline-none focus:ring-2 ${
                  formik.touched.password && formik.errors.password
                    ? "border-[#D32F2F] focus:ring-red-300"
                    : "border-gray-300 focus:ring-[#298aaa]"
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className={`w-full px-4 py-2 border text-l rounded-md text-[#211221] shadow-sm focus:outline-none focus:ring-2 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-[#D32F2F] focus:ring-red-300"
                    : "border-gray-300 focus:ring-[#298aaa]"
                }`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-[#D32F2F] text-sm mt-1">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full bg-[#298aaa] hover:bg-[#075c79] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              {formik.isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-[#757575]">
          Remembered your password?{" "}
          <Link to="/admin/login" className="text-[#298aaa] hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminResetPassword;
