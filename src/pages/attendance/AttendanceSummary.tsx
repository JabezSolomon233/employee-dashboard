import { useEffect, useState } from "react";
import api from "../../services/api";

export default function AttendanceSummary() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [attendanceRes, leaveRes] = await Promise.all([
        api.get("/attendance/summary"),
        api.get("/leave/requests")
      ]);

      const leaveMap: Record<number, number> = {};
      leaveRes.data.forEach((lr: any) => {
        leaveMap[lr.employee_id] = lr.days_requested;
      });

      const combined = attendanceRes.data.map((emp: any) => ({
        ...emp,
        leave_days: leaveMap[emp.id] || 0
      }));

      setData(combined);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Attendance Summary</h2>
      <table className="w-full bg-white rounded shadow">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Total</th>
            <th className="p-2">Present</th>
            <th className="p-2">Absent</th>
            <th className="p-2">Leave Days</th>
          </tr>
        </thead>
        <tbody>
          {data.map(emp => (
            <tr key={emp.id} className="border-t">
              <td className="p-2">{emp.first_name} {emp.last_name}</td>
              <td className="p-2">{emp.total_days}</td>
              <td className="p-2">{emp.present_days}</td>
              <td className="p-2">{emp.absent_days}</td>
              <td className="p-2">{emp.leave_days}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
