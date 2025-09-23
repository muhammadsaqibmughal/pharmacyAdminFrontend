import React, { useState, useEffect } from "react";
import PharmacyTable from "../PharmacyTable";
import { getPendingPharmacies } from "../../api/admin";

const PendingPharmacies = () => {
  const [pending, setPending] = useState(null);
  const [isLoading, setIsloading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const pendingPharmacy = async () => {
      try {
        const response = await getPendingPharmacies();
        console.log(response.data.data)
        setPending(response.data.data); 
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setIsloading(false); 
      }
    };
    pendingPharmacy(); 
  }, []); 


  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-primary">
        Loading Pending Pharmacies...
      </div>
    );
  }


  if (error) {
    return (
      <div className="p-6 text-error">
        <p>Error: {error}</p>
      </div>
    );
  }


  if (!pending || pending.length === 0) {
    return (
      <div className="p-6 text-secondary">
        <p>Pending Pharmacies data is not available.</p>
      </div>
    );
  }


  return (
    <div>
      <PharmacyTable
        title="Pending Pharmacies"
        pharmacies={pending}
        itemsPerPage={10}
      />
    </div>
  );
};

export default PendingPharmacies;
