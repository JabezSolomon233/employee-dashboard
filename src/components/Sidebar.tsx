import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      {/* Brand */}
      <div className="p-6 text-2xl font-bold border-b border-gray-700">EMS</div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 px-4 space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) =>
            `block px-4 py-2 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-700"}`
          }
        >
          Employees
        </NavLink>
      </nav>
    </div>
  );
}
