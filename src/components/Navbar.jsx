export default function Navbar() {
  return (
    <nav className="h-16 bg-white shadow flex items-center justify-between px-6">
      {/* Logo / Brand */}
      <h2 className="text-lg font-semibold text-blue-600">Tech Solutions</h2>

      {/* Right side buttons */}
      <div className="flex items-center space-x-3">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Add Employee
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Logout
        </button>
      </div>
    </nav>
  )
}
