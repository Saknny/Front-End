// Components/Charts/ProviderCharts.jsx
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
  apartmentTypes,
  monthlyEarnings,
  unitRadar,
}) {
  return (
    <div className="charts">
      {/* Monthly Earnings */}
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

      {/* Apartment Types */}
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

      {/* Area Chart: Monthly Rented Rooms */}
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
  monthlyEarnings: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      income: PropTypes.number,
      rooms: PropTypes.number,
    })
  ).isRequired,
  unitRadar: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProviderDashboardCharts;
