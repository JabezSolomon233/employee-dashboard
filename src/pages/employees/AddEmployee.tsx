import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../../services/api"

export default function AddEmployee() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    job_position: "",
    phone: "",
    mobile: "",
    fax: "",
  })

  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async () => {
    setError("")
    console.log("FORM DATA SENDING:", form)

    if (!form.first_name || !form.email || !form.job_position) {
      setError("First name, Email and Job Position are required")
      return
    }

    try {
      await api.post("/employees", form)
      alert("Employee added successfully 🎉")
      navigate("/dashboard/employees")
    } catch (err) {
      console.error(err)
      setError("Failed to add employee")
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Employee</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded shadow">
        <input
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="job_position"
          placeholder="Job Position"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="fax"
          placeholder="Fax"
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Save Employee
      </button>
    </div>
  )
}
