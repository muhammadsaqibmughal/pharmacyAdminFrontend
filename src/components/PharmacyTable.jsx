import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

const headerCell = "p-4 text-sm font-semibold";
const cell = "p-4 text-[#211221]";

const PharmacyTable = ({ title, pharmacies, itemsPerPage = 10 }) => {
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const detailRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (detailRef.current && !detailRef.current.contains(event.target)) {
        setSelectedPharmacy(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(pharmacies.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentItems = pharmacies.slice(startIdx, startIdx + itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const handleView = (pharmacy) => {
    navigate(`/admin/dashboard/pharmacy/${pharmacy.status}/detail/${pharmacy.id}`, {
      state: { pharmacy },
    });
  };

  return (
    <div className="p-6 sm:p-8 bg-[#F5F5F5] min-h-screen">
      <h1 className="text-3xl font-bold text-[#00474A] mb-6">{title}</h1>

      {/* Table Wrapper */}
      <div className="overflow-x-auto rounded-xl border border-[#ddd]">
        <table className="w-full text-sm text-left">
          <thead className="bg-[#211221] text-white">
            <tr>
              <th className={headerCell}>Pharmacy Name</th>
              <th className={headerCell}>License #</th>
              <th className={headerCell}>Owner</th>
              <th className={headerCell}>Phone</th>
              <th className={headerCell}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((pharmacy) => (
              <tr
                key={pharmacy.id}
                className="bg-white border-t border-[#eee] last:border-b"
              >
                <td className={cell}>{pharmacy.name}</td>
                <td className={cell}>{pharmacy.licenseNumber}</td>
                <td className={cell}>{pharmacy.owner}</td>
                <td className={cell}>{pharmacy.phone}</td>
                <td className={cell}>
                  <button
                    onClick={() => handleView(pharmacy)}
                    className="bg-[#ffa04c] text-white text-sm px-3 py-1 rounded-md flex items-center gap-1"
                  >
                    <Eye size={14} />
                    View
                  </button>
                </td>
              </tr>
            ))}

            {currentItems.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-[#757575] py-4">
                  No pharmacies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex flex-wrap justify-center items-center gap-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-1 text-sm rounded border border-[#ffa04c] text-[#ffa04c] hover:bg-[#ffa04c] hover:text-white transition disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="text-[#211221] font-medium text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-1 text-sm rounded border border-[#ffa04c] text-[#ffa04c] hover:bg-[#ffa04c] hover:text-white transition disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PharmacyTable;
