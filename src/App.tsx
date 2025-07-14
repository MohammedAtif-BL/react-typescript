import { Routes, Route, Navigate } from "react-router-dom";
import UserFormPage from "./components/UserFormPage";
import UserTablePage from "./components/UserTablePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UserTablePage />} />
        <Route path="/add-user" element={<UserFormPage />} />
        <Route path="/edit-user/:id" element={<UserFormPage />} />
        <Route path="*" element={<h2>404 Page</h2>} />
      </Routes>
    </>
  );
};

export default App;
