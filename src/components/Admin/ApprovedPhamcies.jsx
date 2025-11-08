import React, { useEffect, useState } from "react";
import PharmacyTable from "../PharmacyTable";
import { getApprovedPharmacies } from "../../api/admin"; 

const ApprovedPharmacies = () => {
  const [approved, setApproved] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  
  const [error, setError] = useState(null);  

  useEffect(() => {
    const getApproved = async () => {
      try {
        const response = await getApprovedPharmacies();  
        if (response.status === "success") {
          console.log(response.data);
          setApproved(response.data);  
        } else {
          setError("Failed to load approved pharmacies.");  
        }
      } catch (err) {
        setError("An error occurred while fetching the pharmacies.");
        console.log(err);
      } finally {
        setIsLoading(false);  
      }
    };

    getApproved();  
  }, []); 

  if (isLoading) {
    return <div className="text-center py-4">Loading approved pharmacies...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }


  return (
    <div>
      <PharmacyTable
        title="Approved Pharmacies"
        pharmacies={approved} 
        itemsPerPage={10}  
      />
    </div>
  );
};

export default ApprovedPharmacies;
