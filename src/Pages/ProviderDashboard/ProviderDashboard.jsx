import React, { useContext } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import "./ProviderDashboard.scss";
import { LoginContext } from "../../Context/Login/Login";

function ProviderDashboard() {
  const { language, darkMode } = useContext(LoginContext);

  const stats = {
    rentedApartments: { value: 25, change: 12.5 },
    rentedBeds: { value: 52, change: 8.3 },
    totalRooms: { value: 40, change: -5.2 },
    totalEarnings: { value: 13400, change: 3.1 },
  };

  const monthlyEarnings = [
    { month: "Jan", income: 1200, rooms: 12 },
    { month: "Feb", income: 1000, rooms: 10 },
    { month: "Mar", income: 1500, rooms: 14 },
    { month: "Apr", income: 1800, rooms: 18 },
    { month: "May", income: 1600, rooms: 16 },
    { month: "Jun", income: 2300, rooms: 22 },
  ];

  const apartmentTypes = [
    {
      name: language === "EN" ? "Apartments" : "شقق",
      value: 15,
      color: "#8884d8",
    },
    {
      name: language === "EN" ? "ٌRoom" : "غرفة",
      value: 20,
      color: "#82ca9d",
    },
    {
      name: language === "EN" ? " Bedroom" : "سرير",
      value: 10,
      color: "#ffc658",
    },
  ];

  const unitRadar = [
    {
      type: language === "EN" ? "Apartments" : "شقق",
      count: 15,
    },
    {
      type: language === "EN" ? "ٌRoom" : "غرفة",
      count: 20,
    },
    {
      type: language === "EN" ? "Bedroom" : "سرير",
      count: 10,
    },
  ];

  const renderStatCard = (labelEn, labelAr, stat) => (
    <div className="stat-card">
      <h4>{language === "EN" ? labelEn : labelAr}</h4>
      <p>
        {stat.value}
        <span className={stat.change >= 0 ? "increase" : "decrease"}>
          {stat.change >= 0 ? " ↑ " : " ↓ "}
          {Math.abs(stat.change)}%
        </span>
      </p>
    </div>
  );

  return (
    <div className={`ProviderDashboard ${darkMode}`}>
      <div className="stats">
        {renderStatCard(
          "Rented Apartments",
          "الشقق المؤجرة",
          stats.rentedApartments
        )}
        {renderStatCard("Rented Beds", "الأسرة المؤجرة", stats.rentedBeds)}
        {renderStatCard("Total Rooms", "إجمالي الغرف", stats.totalRooms)}
        {renderStatCard(
          "Total Earnings ($)",
          "إجمالي الأرباح ($)",
          stats.totalEarnings
        )}
      </div>

      <div className="charts">
        {/* 📌 Monthly Earnings */}
        <div className="chart-card">
          <h4>{language === "EN" ? "Monthly Earnings" : "الأرباح الشهرية"}</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyEarnings}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#00b894" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 📌 Apartment Types */}
        <div className="chart-card">
          <h4>{language === "EN" ? "Apartment Types" : "أنواع الشقق"}</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={apartmentTypes} dataKey="value" outerRadius={80} label>
                {apartmentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="legend">
            {apartmentTypes.map((entry, index) => (
              <div key={index} className="legend-item">
                <span style={{ backgroundColor: entry.color }}></span>{" "}
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* 📌 Area Chart: Monthly Rented Rooms */}
        <div className="chart-card">
          <h4>
            {language === "EN"
              ? "Rented Rooms per Month"
              : "الغرف المؤجرة شهريًا"}
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={monthlyEarnings}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="rooms"
                stroke="#1e90ff"
                fill="#87cefa"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 📌 Radar Chart: Unit Distribution */}
        <div className="chart-card">
          <h4>{language === "EN" ? "Unit Distribution" : "توزيع الوحدات"}</h4>
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart outerRadius={80} data={unitRadar}>
              <PolarGrid />
              <PolarAngleAxis dataKey="type" />
              <PolarRadiusAxis />
              <Radar
                name="Units"
                dataKey="count"
                stroke="#e17055"
                fill="#fab1a0"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default ProviderDashboard;
