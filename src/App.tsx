import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserFormPage from "./pages/UserFormPage";
import UserTablePage from "./pages/UserTablePage";
import { type FormData } from "./components/UserForm";

const App = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>App Loaded</h1> {/* Debug */}
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UserTablePage />} />
        <Route path="/add-user" element={<UserFormPage />} />
        <Route path="*" element={<h2>404 Page</h2>} />
      </Routes>
    </>
  );
};

export default App;
