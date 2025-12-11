"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const barData = [
  { day: "Mon", revenue: 4200 },
  { day: "Tue", revenue: 5300 },
  { day: "Wed", revenue: 6100 },
  { day: "Thu", revenue: 4800 },
  { day: "Fri", revenue: 7200 },
  { day: "Sat", revenue: 6900 },
  { day: "Sun", revenue: 7500 },
];

const pieData = [
  { name: "Active Students", value: 480 },
  { name: "New Enrollments", value: 120 },
  { name: "Inactive Students", value: 50 },
];

const COLORS = ["#00BFFF", "#1E90FF", "#555"];

export default async function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      {/* Revenue Bar Chart */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Revenue (Last 7 Days)
        </h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <XAxis dataKey="day" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#111",
                  border: "1px solid #222",
                }}
              />
              <Bar dataKey="revenue" fill="#00BFFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Distribution Pie Chart */}
      <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-white mb-4">
          Student Statistics
        </h2>
        <div className="h-72 flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0657ecff",
                  border: "1px solid #222",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}