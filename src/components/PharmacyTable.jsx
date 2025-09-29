import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const headerCell = "p-4 text-sm font-semibold";
const cell = "p-4 text-[#211221]";

const PharmacyTable = ({ title, pharmacies = [], itemsPerPage = 10 }) => {
  const navigate = useNavigate();

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(pharmacies.length / itemsPerPage) || 1;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = pharmacies.slice(startIdx, startIdx + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handleView = (pharmacy) => {
    navigate(
      `/admin/dashboard/pharmacy/${pharmacy.status}/detail/${pharmacy.id}`,
      {
        state: { pharmacy },
      }
    );
  };

  return (
    <div className="p-6 sm:p-8 bg-[#F5F5F5] min-h-screen">
      <h1 className="text-3xl font-bold text-primary-50 mb-6">{title}</h1>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-xl border border-[#ddd]">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#075c79] text-white">
            <tr>
              <th className={headerCell}>Pharmacy Name</th>
              <th className={headerCell}>License #</th>
              <th className={headerCell}>Owner</th>
              <th className={headerCell}>Phone</th>
              <th className={headerCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((pharmacy) => (
                <tr
                  key={pharmacy.id}
                  className="bg-white border-t border-[#eee] last:border-b"
                >
                  <td className={cell}>{pharmacy.pharmacyName}</td>
                  <td className={cell}>{pharmacy.licenseNumber}</td>
                  <td className={cell}>
                    {pharmacy.managerId ? "Owner Information" : "No Owner"}
                  </td>
                  <td className={cell}>{pharmacy.phoneNumber}</td>
                  <td className={cell}>
                    <button
                      onClick={() => handleView(pharmacy)}
                      className="bg-[#298aaa] text-white text-sm px-3 py-1 rounded-md flex items-center gap-1"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No pharmacies available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination - always visible */}
      <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-1 text-sm rounded border border-[#298aaa] text-[#298aaa] hover:bg-[#298aaa] hover:text-white transition disabled:opacity-50"
          disabled={currentPage === 1 || totalPages === 0}
        >
          Prev
        </button>
        <span className="text-[#211221] font-medium text-sm">
          Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          className="px-4 py-1 text-sm rounded border border-[#298aaa] text-[#298aaa] hover:bg-[#298aaa] hover:text-white transition disabled:opacity-50"
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PharmacyTable;
