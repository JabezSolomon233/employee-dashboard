import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export default function EmployeeList() {
  const employees = useSelector((state: RootState) => state.employees.list);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Employees</h1>

      {/* Employees Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">Joining Date</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{emp.id}</td>
                <td className="px-4 py-2 border">
                  {emp.first_name} {emp.last_name}
                </td>
                <td className="px-4 py-2 border">{emp.role || "N/A"}</td>
                <td className="px-4 py-2 border">{emp.email}</td>
                <td className="px-4 py-2 border">{emp.phone}</td>
                <td className="px-4 py-2 border">{emp.joining_date}</td>
                <td className="px-4 py-2 border">
                  {emp.role ? (
                    <span className="text-green-600 font-semibold">Present</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Absent</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
