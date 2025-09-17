import React from "react";
import PharmacyTable from "../PharmacyTable";

// Example data with unique IDs
const allPharmacies = [
  {
    id: 1,
    name: "Ali Pharmacy",
    licenseNumber: "LIC123",
    owner: "Ali",
    phone: "03001234567",
    status: "approved",
  },
  {
    id: 2,
    name: "Naveed Pharmacy",
    licenseNumber: "LIC456",
    owner: "Naveed",
    phone: "03007654321",
    status: "approved",
  },
  {
    id: 3,
    name: "Iqra Pharmacy",
    licenseNumber: "LIC789",
    owner: "Iqra",
    phone: "03009876543",
    status: "approved",
  },
  // Add more pharmacies with unique IDs
  {
    id: 4,
    name: "Zain Pharmacy",
    licenseNumber: "LIC012",
    owner: "Zain",
    phone: "03001112233",
    status: "approved",
  },
  {
    id: 5,
    name: "Muneeb Pharmacy",
    licenseNumber: "LIC345",
    owner: "Muneeb",
    phone: "03002223344",
    status: "approved",
  },
  {
    id: 6,
    name: "Sara Pharmacy",
    licenseNumber: "LIC678",
    owner: "Sara",
    phone: "03003334455",
    status: "approved",
  },
  // You can continue adding unique pharmacies as needed
];

const ApprovedPharmacies = () => {
  const approved = allPharmacies.filter((ph) => ph.status === "approved");

  return (
    <PharmacyTable
      title="Approved Pharmacies"
      pharmacies={approved}
      itemsPerPage={10}
    />
  );
};

export default ApprovedPharmacies;
