import React, { useState, useEffect } from "react";
import PharmacyTable from "../PharmacyTable";
import { getPendingPharmacies } from "../../api/admin";

const PendingPharmacies = () => {
  const [pending, setPending] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPendingPharmacies = async () => {
      try {
        const response = await getPendingPharmacies();

        if (response.status === "success") {
          console.log(response.data)
          setPending(response.data);
        } else {
          setError("Failed to load pending pharmacies.");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching pharmacies.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingPharmacies();
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
        <p>No pending pharmacies found.</p>
      </div>
    );
  }

  return (
    <div>
      <PharmacyTable
        title="Pending Pharmacies"
        pharmacies={pending}
        length1={pending.length}
        itemsPerPage={10}
      />
    </div>
  );
};

export default PendingPharmacies;
