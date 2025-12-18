import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashboardHome from "./pages/dashboard/DashboardHome";
import EmployeeList from "./pages/employees/EmployeeList";

export default function App() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate replace to="/login" />} />

      {/* Login page */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardHome />} />

      {/* Employee list */}
      <Route path="/employees" element={<EmployeeList />} />

      {/* Catch-all: redirect unknown paths to login */}
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}
