import { useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "../../app/store"
import { createEmployee } from "../features/employees/employeeThunk"

interface Props {
  open: boolean
  onClose: () => void
}

export default function CreateEmployeeModal({ open, onClose }: Props) {
  const dispatch = useDispatch<AppDispatch>()

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    role: "Developer",
    email: "",
    phone: "",
    joining_date: "",
    fax: "",
  })

  if (!open) return null

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    dispatch(createEmployee(form))
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create Employee</h2>

        <div className="grid grid-cols-2 gap-4">
          <input name="first_name" placeholder="First Name" onChange={handleChange} className="border p-2 rounded" />
          <input name="last_name" placeholder="Last Name" onChange={handleChange} className="border p-2 rounded" />
          <select name="role" onChange={handleChange} className="border p-2 rounded">
            <option>Developer</option>
            <option>Tester</option>
            <option>Data Analyst</option>
            <option>Software Engineer</option>
          </select>
          <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 rounded" />
          <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2 rounded" />
          <input name="joining_date" type="date" onChange={handleChange} className="border p-2 rounded" />
          <input name="fax" placeholder="Fax" onChange={handleChange} className="border p-2 rounded" />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded border">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white">
            Create
          </button>
        </div>
      </div>
    </div>
  )
}
