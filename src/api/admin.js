
import api from "../../utils/axiosInstance";


// admin login
export const loginAdmin = async (credentials) => {
  return api.post("/api/admin/login", credentials);
};


export const adminForget = (credentials) => {
  return api.post("/api/admin/password-reset-link", credentials);
};

// Reset password with userId and token
export const adminResetPassword = (userId, token, password) => {
  return api.post(`/api/admin/password-reset/${userId}/${token}`, { password });
};


// fetch admin details
export const fetchAdminProfile = async () => {
  try {
    const response = await api.get('/api/admin/profile');  
    return response.data.data;
  } catch (error) {
    throw error.response?.data?.message || error.message || 'Failed to fetch profile';
  }
};

// change admin password
export const changePassword = async ({ currentPassword, newPassword }) => {
  const response = await api.post(
    "/api/admin/change-password",
    { currentPassword, newPassword },
    { withCredentials: true }
  );
  return response.data;
};