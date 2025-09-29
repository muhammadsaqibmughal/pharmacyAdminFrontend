import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, ArrowLeft } from "lucide-react";
import { approvedPharmacies, rejectPharmacies } from "../api/admin";

const PharmacyDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pharmacy = location.state?.pharmacy;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // For modal image

  if (!pharmacy) {
    return (
      <div className="p-4 sm:p-6 md:p-8 bg-[#F5F5F5] min-h-screen">
        <h1 className="text-lg sm:text-xl text-red-500">
          No pharmacy data found. Please go back.
        </h1>
      </div>
    );
  }

  const handleApprove = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await approvedPharmacies(pharmacy.id);
      if (response.data.status === "success") {
        navigate("/admin/dashboard/pharmacy/pending");
      } else {
        setError("Error approving pharmacy. Please try again.");
      }
    } catch (err) {
      console.log(err)
      setError("Error approving pharmacy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await rejectPharmacies(pharmacy.id);
      if (response.data.status === "success") {
        navigate("/admin/dashboard/pharmacy/pending");
      } else {
        setError("Error rejecting pharmacy. Please try again.");
      }
    } catch (err) {
      setError("Error rejecting pharmacy. Please try again.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#F5F5F5] min-h-screen">

      {/* ✅ Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // prevents closing when clicking the image
          >
            <img
              src={selectedImage}
              alt="Document Preview"
              className="max-w-full max-h-[90vh] rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white text-2xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center text-primary-50 mb-6 gap-2 hover:text-[#298aaa] transition"
      >
        <ArrowLeft size={30} />
        Back
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold text-primary-50 mb-6">
        Pharmacy Details: {pharmacy.pharmacyName}
      </h1>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-primary-50 mb-4 flex items-center gap-2">
          <Eye size={20} />
          Pharmacy Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#211221] text-sm sm:text-base">
          <div>
            <span className="font-semibold">Pharmacy Name:</span>{" "}
            {pharmacy.pharmacyName}
          </div>
          <div>
            <span className="font-semibold">License Number:</span>{" "}
            {pharmacy.licenseNumber}
          </div>
          <div>
            <span className="font-semibold">Owner (Manager):</span>{" "}
            {pharmacy.manager?.name || "N/A"}
          </div>
          <div>
            <span className="font-semibold">Phone:</span> {pharmacy.phoneNumber}
          </div>

          <div className="sm:col-span-2">
            <span className="font-semibold">Address:</span>{" "}
            {pharmacy.address || "N/A"}
          </div>

          <div className="sm:col-span-2">
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`font-semibold ${
                pharmacy.status === "approved"
                  ? "text-[#4CAF50]"
                  : pharmacy.status === "rejected"
                  ? "text-[#D32F2F]"
                  : "text-[#298aaa]"
              }`}
            >
              {pharmacy.status.charAt(0).toUpperCase() + pharmacy.status.slice(1)}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="font-semibold">Manager:</span>{" "}
            {pharmacy.manager?.name || "No Manager"}
          </div>

          {/* ✅ Document Image Preview */}
          <div className="sm:col-span-2">
            <span className="font-semibold">Documents:</span>
            {(pharmacy.idFrontUrl || pharmacy.idBackUrl || pharmacy.licenseUrl) ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                {pharmacy.idFrontUrl && (
                  <div className="flex justify-center">
                    <img
                      src={pharmacy.idFrontUrl}
                      alt="ID Front"
                      className="w-full h-auto rounded-lg cursor-pointer hover:opacity-80 transition"
                      onClick={() => setSelectedImage(pharmacy.idFrontUrl)}
                    />
                  </div>
                )}
                {pharmacy.idBackUrl && (
                  <div className="flex justify-center">
                    <img
                      src={pharmacy.idBackUrl}
                      alt="ID Back"
                      className="w-full h-auto rounded-lg cursor-pointer hover:opacity-80 transition"
                      onClick={() => setSelectedImage(pharmacy.idBackUrl)}
                    />
                  </div>
                )}
                {pharmacy.licenseUrl && (
                  <div className="flex justify-center">
                    <img
                      src={pharmacy.licenseUrl}
                      alt="License"
                      className="w-full h-auto rounded-lg cursor-pointer hover:opacity-80 transition"
                      onClick={() => setSelectedImage(pharmacy.licenseUrl)}
                    />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 mt-2">No documents uploaded</p>
            )}
          </div>

          {/* Location */}
          <div className="sm:col-span-2">
            <span className="font-semibold">Location on Map:</span>
            <div className="w-full h-40 sm:h-56 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
              {pharmacy.latitude && pharmacy.longitude ? (
                <p>
                  Lat: {pharmacy.latitude}, Lon: {pharmacy.longitude}
                </p>
              ) : (
                <p className="text-gray-500">No location available</p>
              )}
            </div>
          </div>

          <div className="sm:col-span-2">
            <span className="font-semibold">Additional Info:</span>{" "}
            {pharmacy.additionalInfo || "N/A"}
          </div>
        </div>

        {/* Approve/Reject Buttons */}
        {pharmacy.status === "pending" && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-green-500 text-white rounded-md w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Approving..." : "Approve"}
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-500 text-white rounded-md w-full sm:w-auto"
              disabled={loading}
            >
              {loading ? "Rejecting..." : "Reject"}
            </button>
          </div>
        )}

        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

export default PharmacyDetailPage;
