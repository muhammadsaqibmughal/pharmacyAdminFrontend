import axios from "axios";

const api = axios.create({
  baseURL: "https://pharmacy-backend-five.vercel.app/api",
  // no need for withCredentials since we are using Authorization header
});

// Add JWT from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken"); // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const currentPath = window.location.pathname;

      if (currentPath !== "/admin/login") {
        console.warn(
          "Unauthorized! Clearing storage and redirecting to admin login..."
        );

        localStorage.removeItem("user");
        localStorage.removeItem("accessToken");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
