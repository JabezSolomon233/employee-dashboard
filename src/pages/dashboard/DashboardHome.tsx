import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import api from "../../services/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
      <h3 className="text-gray-500 uppercase text-sm">{title}</h3>
      <p className="text-4xl font-bold mt-2 text-gray-800">{value}</p>
    </div>
  );
}

export default function DashboardHome() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [present, setPresent] = useState(0);
  const [absent, setAbsent] = useState(0);
  const [leaveRequested, setLeaveRequested] = useState(0);
  const [leaveDetails, setLeaveDetails] = useState<{ employee_name: string }[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await api.get("/employees");
        setTotalEmployees(res.data.length);
      } catch {}

      try {
        const att = await api.get("/attendance/summary");
        let totalP = 0, totalA = 0;
        (att.data || []).forEach((e: any) => {
          totalP += Number(e.present_days || 0);
          totalA += Number(e.absent_days || 0);
        });
        setPresent(totalP);
        setAbsent(totalA);
      } catch {
        setPresent(0);
        setAbsent(0);
      }

      try {
        const leaves = await api.get("/attendance/leaves");
        setLeaveRequested(leaves.data.length);
        setLeaveDetails(leaves.data);
      } catch {
        setLeaveRequested(0);
        setLeaveDetails([]);
      }
    };

    loadData();
  }, []);

  const chartData = [
    { name: "Present", value: present },
    { name: "Absent", value: absent },
    { name: "Leave Requested", value: leaveRequested },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar /> {/* Sidebar always visible */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <StatCard title="Total Employees" value={totalEmployees} />
            <StatCard title="Present Count" value={present} />
            <StatCard title="Absent Count" value={absent} />
            <StatCard title="Leave Requested" value={leaveRequested} />
          </div>

          {/* Chart */}
          <div className="bg-white p-6 rounded-2xl shadow mb-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Attendance Overview</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Leave Requests */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Employees Who Requested Leave ({leaveRequested})
            </h3>
            {leaveDetails.length === 0 ? (
              <p className="text-gray-500">No leave requests</p>
            ) : (
              <ul className="list-disc list-inside text-gray-700">
                {leaveDetails.map((l, i) => (
                  <li key={i}>{l.employee_name}</li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
