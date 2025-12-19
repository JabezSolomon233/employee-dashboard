import { NavLink } from "react-router-dom"
import { FaUsers, FaChartBar, FaSignOutAlt } from "react-icons/fa"

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-2xl font-bold mb-8">HR Dashboard</h1>

      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-3 p-2 rounded hover:bg-slate-700"
        >
          <FaChartBar /> Dashboard
        </NavLink>

        <NavLink
          to="/employees"
          className="flex items-center gap-3 p-2 rounded hover:bg-slate-700"
        >
          <FaUsers /> Employees
        </NavLink>
      </nav>
    </div>
  )
}
