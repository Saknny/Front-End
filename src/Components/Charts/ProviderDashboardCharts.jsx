import React, { useEffect, useState } from "react";
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
import { fetchProviderDashboardData } from "../../Api/api";
import Loading2 from "../Loading2/Loading2";
function ProviderDashboardCharts({ language }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProviderDashboardData().then(setData);
  }, []);

  if (!data) return <Loading2 />;

  const colors = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];

  const topRatedApartments =
    Array.isArray(data.topRatedApartments) && data.topRatedApartments.length > 0
      ? data.topRatedApartments.map((apt, idx) => ({
          name: apt.title,
          rating: apt.averageRating,
          color: colors[idx % colors.length],
        }))
      : [
          {
            name: language === "EN" ? "No Data" : "لا يوجد",
            rating: 0,
            color: "#ccc",
          },
        ];

  const monthlyBookings =
    Array.isArray(data.monthlyBookingRequests) &&
    data.monthlyBookingRequests.length > 0
      ? data.monthlyBookingRequests.map((item) => ({
          month: item.month,
          requests: Number(item.count),
        }))
      : [{ month: language === "EN" ? "No Data" : "لا يوجد", requests: 0 }];

  const monthlyRooms =
    Array.isArray(data.rentedRoomsPerMonth) &&
    data.rentedRoomsPerMonth.length > 0
      ? data.rentedRoomsPerMonth.map((item) => ({
          month: item.month,
          rooms: Number(item.count),
        }))
      : [{ month: language === "EN" ? "No Data" : "لا يوجد", rooms: 0 }];

  const unitRadar =
    data.requestDistribution && Object.keys(data.requestDistribution).length > 0
      ? Object.entries(data.requestDistribution).map(([key, val]) => ({
          type:
            language === "EN"
              ? key.charAt(0).toUpperCase() + key.slice(1)
              : key === "pending"
              ? "قيد الانتظار"
              : key === "approved"
              ? "مقبول"
              : "مرفوض",
          count: val,
        }))
      : [{ type: language === "EN" ? "No Data" : "لا يوجد", count: 0 }];

  return (
    <div className="charts">
      {/* Monthly Booking Requests */}
      <div className="chart-card">
        <h4>
          {language === "EN"
            ? "Monthly Booking Requests"
            : "طلبات الحجز الشهرية"}
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyBookings}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="requests" fill="#00b894" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Rated Apartments */}
      <div className="chart-card">
        <h4>
          {language === "EN" ? "Top Rated Apartments" : "الشقق الأعلى تقييماً"}
        </h4>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={topRatedApartments}
              dataKey="rating"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(0)}%)`
              }
            >
              {topRatedApartments.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} ★`} />
          </PieChart>
        </ResponsiveContainer>
        <div className="legend">
          {topRatedApartments.map((entry, index) => (
            <div key={index} className="legend-item">
              <span
                style={{ backgroundColor: entry.color || "#8884d8" }}
              ></span>{" "}
              {entry.name}
            </div>
          ))}
        </div>
      </div>

      {/* Area Chart: Monthly Rented Rooms */}
      <div className="chart-card">
        <h4>
          {language === "EN"
            ? "Rented Rooms per Month"
            : "الغرف المؤجرة شهريًا"}
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={monthlyRooms}>
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

      {/* Radar Chart: Unit Distribution */}
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
  );
}

export default ProviderDashboardCharts;
