import { useEffect, useState } from "react"
import Sidebar from "../../components/Sidebar"
import api from "../../services/api"

interface Employee {
  id: number
  first_name: string
  last_name: string
  role?: string // optional now
  email: string
  phone: string
  joining_date: string
  fax: string
}

export default function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [editingEmp, setEditingEmp] = useState<Employee | null>(null)
  const [form, setForm] = useState<Employee>({
    id: 0,
    first_name: "",
    last_name: "",
    role: "Developer",
    email: "",
    phone: "",
    joining_date: "",
    fax: "",
  })

  const fetchEmployees = async () => {
    try {
      const res = await api.get("/employees")
      setEmployees(res.data || [])
    } catch (error) {
      console.error("Failed to fetch employees:", error)
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      if (editingEmp) {
        await api.put(`/employees/${editingEmp.id}`, form) // update existing employee
      } else {
        await api.post("/employees", form) // add new employee
      }
      setForm({
        id: 0,
        first_name: "",
        last_name: "",
        role: "Developer",
        email: "",
        phone: "",
        joining_date: "",
        fax: "",
      })
      setEditingEmp(null)
      fetchEmployees()
    } catch (error) {
      console.error("Error saving employee:", error)
    }
  }

  const handleEdit = (emp: Employee) => {
    setEditingEmp(emp)
    setForm({
      ...emp,
      role: emp.role || "Developer", // ensure role is set when editing
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Employee List</h1>

        {/* Employee Form */}
        <div className="mb-6 bg-white rounded-2xl shadow p-4">
          <h2 className="text-xl font-semibold mb-4">{editingEmp ? "Edit Employee" : "Add Employee"}</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border p-2 rounded"
            />
            <input
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border p-2 rounded"
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option>Developer</option>
              <option>Tester</option>
              <option>Data Analyst</option>
              <option>Software Engineer</option>
              <option>Voice Process</option>
            </select>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded"
            />
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-2 rounded"
            />
            <input
              name="joining_date"
              type="date"
              value={form.joining_date}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              name="fax"
              value={form.fax}
              onChange={handleChange}
              placeholder="Fax"
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingEmp ? "Update Employee" : "Add Employee"}
          </button>
        </div>

        {/* Employee Table */}
        <div className="overflow-x-auto bg-white rounded-2xl shadow p-4">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Role</th>
                <th className="px-4 py-2 border-b">Email</th>
                <th className="px-4 py-2 border-b">Phone</th>
                <th className="px-4 py-2 border-b">Joining Date</th>
                <th className="px-4 py-2 border-b">Fax</th>
                <th className="px-4 py-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{emp.first_name} {emp.last_name}</td>
                  <td className="px-4 py-2 border-b">
                    {emp.role
                      ? emp.role
                      : ["Developer", "Tester", "Data Analyst", "Software Engineer", "Voice Process"][emp.id % 5]}
                  </td>
                  <td className="px-4 py-2 border-b">{emp.email}</td>
                  <td className="px-4 py-2 border-b">{emp.phone}</td>
                  <td className="px-4 py-2 border-b">{emp.joining_date}</td>
                  <td className="px-4 py-2 border-b">{emp.fax}</td>
                  <td className="px-4 py-2 border-b">
                    <button
                      onClick={() => handleEdit(emp)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
