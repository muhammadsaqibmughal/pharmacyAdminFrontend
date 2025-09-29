import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const stats = [
  { title: "Approved Pharmacies", count: 128, color: "#4CAF50" },      
  { title: "Pending Pharmacies", count: 37, color: "#298aaa" },      
  { title: "Rejected Pharmacies", count: 14, color: "#D32F2F" },      
];

const data = [
  { name: "Jan", users: 20 },
  { name: "Feb", users: 45 },
  { name: "Mar", users: 60 },
  { name: "Apr", users: 80 },
  { name: "May", users: 50 },
  { name: "Jun", users: 90 },
];

const AdminDashboard = () => {
  return (
    <div style={{ padding: "1.5rem 3rem", minHeight: "100vh", backgroundColor: "#F5F5F5" }}>
      <h1 className="text-primary-50" style={{ fontSize: "2.5rem", fontWeight: "800", marginBottom: "2rem", userSelect: "none" }}>
        Pharmacy Admin Dashboard
      </h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.25 }}
            style={{
              backgroundColor: stat.color,
              borderRadius: "1rem",
              boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
              padding: "2rem",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "1rem", fontWeight: "600", letterSpacing: "0.05em" }}>{stat.title}</h2>
            <p style={{ fontSize: "2rem", fontWeight: "700", marginTop: "0.75rem" }}>{stat.count}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ backgroundColor: "white", borderRadius: "1rem", boxShadow: "0 10px 15px rgba(0,0,0,0.1)", padding: "2rem" }}>
        <h2 style={{ fontSize: "1.875rem", fontWeight: "600", marginBottom: "1.5rem", color: "#757575", userSelect: "none" }}>
          Monthly Active Users
        </h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{ top: 25, right: 30, left: 0, bottom: 8 }}
          >
            <XAxis
              dataKey="name"
              stroke="#211221"
              tick={{ fontWeight: '600' }}
              axisLine={{ stroke: "#D1D5DB" }}
            />
            <YAxis
              stroke="#211221"
              tick={{ fontWeight: '600' }}
              axisLine={{ stroke: "#D1D5DB" }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "#298aaa", borderRadius: 8 }}
              cursor={{ fill: "rgba(255, 142, 41, 0.15)" }}
            />
            <Bar
              dataKey="users"
              fill="#298aaa"
              radius={[5, 5, 0, 0]}
              barSize={32}
              animationDuration={800}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
