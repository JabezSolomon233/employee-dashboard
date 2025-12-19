import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../services/api"
import { toast } from "react-hot-toast"



export default function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      // ---- API CALL ----
      await api.post("/login", { email, password })

      // ---- SUCCESS ----
      toast.success("Logged in successfully")
      navigate("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Employee Portal
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Sign in to continue
        </p>

        {/* Error */}
        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mt-4 text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="mt-6 space-y-5">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          © 2025 Employee Management System
        </p>
      </div>
    </div>
  )
}
