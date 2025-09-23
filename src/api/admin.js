import api from "../../utils/axiosInstance";

// admin login
export const loginAdmin = async (credentials) => {
  return api.post("/admin/login", credentials);
};

export const adminForget = (credentials) => {
  return api.post("/admin/password-reset-link", credentials);
};

// Reset password with userId and token
export const adminResetPassword = (userId, token, password) => {
  return api.post(`/admin/password-reset/${userId}/${token}`, { password });
};

// fetch admin details
export const fetchAdminProfile = async () => {
  try {
    const response = await api.get("/admin/profile");
    return response.data.data;
  } catch (error) {
    throw (
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch profile"
    );
  }
};

// change admin password
export const changePassword = async ({ currentPassword, newPassword }) => {
  const response = await api.post(
    "/admin/change-password",
    { currentPassword, newPassword },
  );
  return response.data;
};

// get pending pharmacies
export const getPendingPharmacies = async () => {
  const response = await api.get("/admin/pharmacies/pending-pharmacies");
  return response.data;
};

// approve pharmacy
export const approvedPharmacies=async (id) => {
  const response=await api.put(`/admin/pharmacies/${id}/approved/`);
  return response;
}

// reject pharmacy
export const rejectPharmacies=async (id) => {
  const response=await api.put(`/admin/pharmacies/${id}/reject/`);
  return response;
}

// get approved pharmacies
export const getApprovedPharmacies=async()=>{
  const response=await api.get("/admin/pharmacies/approved-pharmacies");
  return response.data;
}

