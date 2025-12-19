import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function DashboardHome() {
  const { list: employees } = useSelector((state: RootState) => state.employees);

  const presentCount = employees.filter(e => e.role).length;
  const absentCount = employees.length - presentCount;

  const chartData = [
    { name: "Present", count: presentCount },
    { name: "Absent", count: absentCount },
  ];

  return (
    <main>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500">Total Employees</p>
          <p className="text-2xl font-bold">{employees.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500">Present Count</p>
          <p className="text-2xl font-bold">{presentCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500">Absent Count</p>
          <p className="text-2xl font-bold">{absentCount}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500">Leave Requested</p>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Attendance Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
