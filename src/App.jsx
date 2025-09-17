import React from "react";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminRoutes from "./Routes/AdminRoutes";

const App = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
