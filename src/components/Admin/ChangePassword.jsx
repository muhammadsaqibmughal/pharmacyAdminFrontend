import React, { useState } from "react";
import { useFormik } from "formik";
import changePasswordSchema from "../../validations/changePasswordSchema";
import { changePassword } from "../../api/admin";
import { FaLock, FaUnlock, FaKey } from "react-icons/fa";

const ChangePassword = () => {
  const [statusMsg, setStatusMsg] = useState({ type: "", message: "" });

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setStatusMsg({ type: "", message: "" });
      try {
        const res = await changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });

        if (res.status === "success") {
          setStatusMsg({
            type: "success",
            message: "Password updated successfully!",
          });
          resetForm();
        } else {
          setStatusMsg({
            type: "error",
            message: res.message || "Update failed.",
          });
        }
      } catch (err) {
        const message =
          err.response?.data?.message ||
          "Something went wrong. Please try again.";
        setStatusMsg({ type: "error", message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-extrabold text-[#00474A] mb-8 flex items-center gap-4">
        <FaKey className="text-[#ffa04c]" size={40} />
        Change Password
      </h2>

      {statusMsg.message && (
        <div
          className={`text-sm font-medium p-3 rounded-md mb-6 text-center ${
            statusMsg.type === "success"
              ? "bg-[#4CAF50] text-white border border-[#4CAF50]"
              : "bg-[#D32F2F] text-white border border-[#D32F2F]"
          }`}
        >
          {statusMsg.message}
        </div>
      )}

      <form onSubmit={formik.handleSubmit} className="space-y-6 text-[#211221]">
        {/* Current Password */}
        <div>
          <label className="text-sm font-semibold mb-1 flex items-center gap-2">
            <FaLock />
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            className={`w-full px-4 py-2 border text-l rounded-md bg-white text-[#211221] focus:outline-none focus:ring ${
              formik.touched.currentPassword && formik.errors.currentPassword
                ? "border-[#D32F2F] focus:ring-[#D32F2F]"
                : "border-gray-300 focus:ring-[#ffa04c]"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.currentPassword}
          />
          {formik.touched.currentPassword && formik.errors.currentPassword && (
            <p className="text-[#D32F2F] text-sm mt-1">
              {formik.errors.currentPassword}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="text-sm font-semibold mb-1 flex items-center gap-2">
            <FaUnlock />
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            className={`w-full px-4 py-2  border text-l rounded-md bg-white text-[#211221] focus:outline-none focus:ring ${
              formik.touched.newPassword && formik.errors.newPassword
                ? "border-[#D32F2F] focus:ring-[#D32F2F]"
                : "border-gray-300 focus:ring-[#ffa04c]"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newPassword}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <p className="text-[#D32F2F] text-sm mt-1">
              {formik.errors.newPassword}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-semibold mb-1 flex items-center gap-2">
            <FaKey />
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            className={`w-full px-4 py-2 border text-l rounded-md bg-white text-[#211221] focus:outline-none focus:ring ${
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? "border-[#D32F2F] focus:ring-[#D32F2F]"
                : "border-gray-300 focus:ring-[#ffa04c]"
            }`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <p className="text-[#D32F2F] text-sm mt-1">
              {formik.errors.confirmPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full bg-[#ffa04c] hover:bg-[#D76A30] text-white font-semibold py-2 rounded-md shadow-md transition duration-200"
        >
          {formik.isSubmitting ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
