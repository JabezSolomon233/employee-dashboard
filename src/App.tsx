import { Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import DashboardHome from "./pages/dashboard/DashboardHome"
import EmployeeList from "./pages/employees/EmployeeList"
import Layout from "./components/Layout"

export default function App() {
  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate replace to="/login" />} />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard + Employees nested under Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/employees" element={<EmployeeList />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}
