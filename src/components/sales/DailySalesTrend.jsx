import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const dailySalesData = [
  { name: "Mon", sales: 3200 },
  { name: "Tue", sales: 4000 },
  { name: "Wed", sales: 3600 },
  { name: "Thu", sales: 4300 },
  { name: "Fri", sales: 5000 },
  { name: "Sat", sales: 6200 },
  { name: "Sun", sales: 5800 },
];

const DailySalesTrend = () => {
  return (
    <motion.div
      className="bg-[#1f2937] shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4">Daily Sales Trend</h2>

      <div className="w-full h-72">
        <ResponsiveContainer>
          <BarChart data={dailySalesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1F2937", borderColor: "#4B5563" }}
              itemStyle={{ color: "#E5E7EB" }}
            />
            <Bar dataKey="sales" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default DailySalesTrend;
