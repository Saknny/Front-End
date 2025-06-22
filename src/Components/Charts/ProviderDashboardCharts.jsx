// ✅ ProviderDashboardCharts.jsx (updated with Monthly Booking Requests instead of Earnings)
import React from "react";
import PropTypes from "prop-types";
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

function ProviderDashboardCharts({
  language,
  monthlyBookings,
  monthlyRooms,
  unitRadar,
  topRatedApartments, // ✅ add this line
}) {
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

ProviderDashboardCharts.propTypes = {
  language: PropTypes.string.isRequired,
  apartmentTypes: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  monthlyBookings: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      requests: PropTypes.number.isRequired,
    })
  ).isRequired,
  monthlyRooms: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      rooms: PropTypes.number.isRequired,
    })
  ).isRequired,
  unitRadar: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  topRatedApartments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
};

export default ProviderDashboardCharts;
