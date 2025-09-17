import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, ArrowLeft } from "lucide-react"; 

const PharmacyDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pharmacy = location.state?.pharmacy; 

  const handleApprove = () => {
    console.log("Pharmacy Approved:", pharmacy.name);
    navigate("/admin/dashboard/pharmacy/approved");
  };

  const handleReject = () => {
    console.log("Pharmacy Rejected:", pharmacy.name);
    navigate("/admin/dashboard/pharmacy/rejected");
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!pharmacy) {
    return (
      <div className="p-4 sm:p-6 md:p-8 bg-[#F5F5F5] min-h-screen">
        <h1 className="text-lg sm:text-xl text-red-500">
          No pharmacy data found. Please go back.
        </h1>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-[#F5F5F5] min-h-screen">
      <button
        onClick={handleBack}
        className="flex items-center text-[#00474A] mb-6 gap-2 hover:text-[#ffa04c] transition"
      >
        <ArrowLeft size={30} /> 
        Back
      </button>

      <h1 className="text-2xl sm:text-3xl font-bold text-[#00474A] mb-6">
        Pharmacy Details
      </h1>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold text-[#00474A] mb-4 flex items-center gap-2">
          <Eye size={20} />
          Pharmacy Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-[#211221] text-sm sm:text-base">
          <div>
            <span className="font-semibold">Pharmacy Name:</span>{" "}
            {pharmacy.name}
          </div>
          <div>
            <span className="font-semibold">License Number:</span>{" "}
            {pharmacy.licenseNumber}
          </div>
          <div>
            <span className="font-semibold">Owner:</span> {pharmacy.owner}
          </div>
          <div>
            <span className="font-semibold">Phone:</span> {pharmacy.phone}
          </div>
          <div className="sm:col-span-2">
            <span className="font-semibold">Address:</span>{" "}
            {pharmacy.address || "N/A"}
          </div>
          <div className="sm:col-span-2">
            <span className="font-semibold">Status:</span>{" "}
            <span
              className={`font-semibold ${pharmacy.status === "approved"
                ? "text-[#4CAF50]"
                : pharmacy.status === "rejected"
                ? "text-[#D32F2F]"
                : "text-[#ffa04c]"
                }`}
            >
              {pharmacy.status.charAt(0).toUpperCase() +
                pharmacy.status.slice(1)}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="font-semibold">Documents:</span>
            {pharmacy.documents && pharmacy.documents.length > 0 ? (
              <ul className="list-disc pl-5">
                {pharmacy.documents.map((doc, index) => (
                  <li key={index}>
                    <a
                      href={doc.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {doc.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No documents uploaded</p>
            )}
          </div>

          <div className="sm:col-span-2">
            <span className="font-semibold">Location on Map:</span>
            <div className="w-full h-40 sm:h-56 bg-gray-200 flex items-center justify-center text-gray-500 rounded-md">
              {pharmacy.location || "Map Placeholder"}
            </div>
          </div>

          <div className="sm:col-span-2">
            <span className="font-semibold">Additional Info:</span>{" "}
            {pharmacy.additionalInfo || "N/A"}
          </div>
        </div>

        {pharmacy.status === "pending" && (
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-green-500 text-white rounded-md w-full sm:w-auto"
            >
              Approve
            </button>
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-500 text-white rounded-md w-full sm:w-auto"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyDetailPage;
