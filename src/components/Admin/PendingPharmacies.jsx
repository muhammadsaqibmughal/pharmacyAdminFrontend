import React from "react";
import PharmacyTable from "../PharmacyTable";

const allPharmacies = [
  { id: 1, name: "Ali Pharmacy", licenseNumber: "LIC123", owner: "Ali", phone: "03001234567", status: "pending" },
  { id: 2, name: "Naveed Pharmacy", licenseNumber: "LIC456", owner: "Naveed", phone: "03007654321", status: "approved" },
  { id: 3, name: "Iqra Pharmacy", licenseNumber: "LIC789", owner: "Iqra", phone: "03009876543", status: "pending" },
  // Add more pharmacies
];

const PendingPharmacies = () => {
  // Filter only pharmacies with status "pending"
  const pending = allPharmacies.filter((ph) => ph.status === "pending");

  return (
    <div>
      {pending.length > 0 ? (
        <PharmacyTable
          title="Pending Pharmacies"
          pharmacies={pending}
          itemsPerPage={10}
        />
      ) : (
        <p className="text-gray-500 text-center mt-4">
          No pending pharmacies found.
        </p>
      )}
    </div>
  );
};

export default PendingPharmacies;
