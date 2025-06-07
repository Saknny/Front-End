import React, { useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { LoginContext } from "../../Context/Login/Login";
import data from "../../Data/Dashboard";

function CustomTooltip({ active, payload, total }) {
  if (active && payload && payload.length) {
    const percent = ((payload[0].value / total) * 100).toFixed(1);
    return (
      <div
        style={{
          background: "white",
          padding: "7px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          textAlign: "center",
        }}
      >
        <p style={{ margin: 0, fontWeight: "bold" }}>{payload[0].name}</p>
        <p style={{ margin: 0 }}>{percent}%</p>
      </div>
    );
  }
  return null;
}

function AdminDashboardCharts() {
  const { language } = useContext(LoginContext);
  return (
    <div className="charts">
      {/* Total bookings per month */}
      <div className="chart-card">
        <h4>{language === "EN" ? "Monthly Bookings" : "الحجوزات الشهرية"}</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data[language].bookingData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#000"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Device usage */}
      <div className="chart-card">
        <h4>{language === "EN" ? "Device Usage" : "استخدام الأجهزة"}</h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data[language].deviceUsage}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {data[language].deviceUsage.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="legend">
          {data[language].deviceUsage.map((entry, index) => (
            <div key={index} className="legend-item">
              <span style={{ backgroundColor: entry.color }}></span>{" "}
              {entry.name}
            </div>
          ))}
        </div>
      </div>

      {/* Bookings by location */}
      <div className="chart-card">
        <h4>
          {language === "EN" ? "Bookings by Location" : "الحجوزات حسب الموقع"}
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Tooltip
              content={
                <CustomTooltip
                  total={data[language].locationBookings.reduce(
                    (sum, entry) => sum + entry.value,
                    0
                  )}
                />
              }
            />
            <Pie
              data={data[language].locationBookings}
              dataKey="value"
              outerRadius={80}
            >
              {data[language].locationBookings.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="legend">
          {data[language].locationBookings.map((entry, index) => (
            <div key={index} className="legend-item">
              <span style={{ backgroundColor: entry.color }}></span>{" "}
              {entry.name}
            </div>
          ))}
        </div>
      </div>

      {/*Traffic sources */}
      <div className="chart-card">
        <h4>{language === "EN" ? "Traffic Sources" : "مصادر الزيارات"}</h4>

        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Tooltip
              content={
                <CustomTooltip
                  total={data[language].trafficSources.reduce(
                    (sum, entry) => sum + entry.value,
                    0
                  )}
                />
              }
            />
            <Pie
              data={data[language].trafficSources}
              dataKey="value"
              outerRadius={80}
            >
              {data[language].trafficSources.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="legend">
          {data[language].trafficSources.map((entry, index) => (
            <div key={index} className="legend-item">
              <span style={{ backgroundColor: entry.color }}></span>{" "}
              {entry.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardCharts;
