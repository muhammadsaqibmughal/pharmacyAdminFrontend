import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaInfoCircle,
} from "react-icons/fa";
import { fetchAdminProfile } from "../../api/admin";

const AdminProfile = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const staticData = {
    phone: "+92 308 9156 503",
    address: "123 Admin Blvd, Admin City, Admin State",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Passionate administrator committed to excellence and innovation.",
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const data = await fetchAdminProfile();
        setAdminData(data);
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    getProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-primary">
        Loading profile...
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

  if (!adminData) {
    return (
      <div className="p-6 text-secondary">
        <p>Profile data is not available.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md border border-gray-200 font-">
      <div className="flex flex-col items-center text-center">
        <FaUserCircle className="text-[50px] text-[#00474A] mb-2" />
        <h2 className="text-3xl font-bold text-[#00474A] mb-6">Admin Profile</h2>

        {/* Avatar */}
        <img
          src={staticData.avatar}
          alt="Admin Avatar"
          className="w-32 h-32 rounded-full border-4 border-[#ffa04c] shadow-md mb-6"
        />

        {/* Name + Role */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-[#211221]">{adminData.name}</h3>
          <p className="text-sm text-[#757575] italic">{adminData.role}</p>
        </div>

        {/* Info List */}
        <div className="space-y-4 w-full">
          <InfoItem icon={<FaEnvelope className="text-[#ffa04c]" />} text={adminData.email} />
          <InfoItem icon={<FaPhone className="text-[#ffa04c]" />} text={staticData.phone} />
          <InfoItem icon={<FaMapMarkerAlt className="text-[#ffa04c]" />} text={staticData.address} />
          <InfoItem
            icon={<FaInfoCircle className="text-[#ffa04c]" />}
            text={staticData.bio}
            isParagraph
          />
        </div>
      </div>
    </div>
  );
};

// Sub-component for reusable info row
const InfoItem = ({ icon, text, isParagraph = false }) => (
  <div className="flex items-start gap-3 text-left">
    <div className="mt-1">{icon}</div>
    {isParagraph ? (
      <p className="text-sm text-[#757575] leading-relaxed">{text}</p>
    ) : (
      <span className="text-sm text-[#211221]">{text}</span>
    )}
  </div>
);

export default AdminProfile;
