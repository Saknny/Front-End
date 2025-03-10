import React from "react";
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
import "./Dashboard.scss";

function Dashboard() {
  // 📌 Number of bookings per month (students who rented a room)
  const bookingData = [
    { month: "Jan", bookings: 50 },
    { month: "Feb", bookings: 75 },
    { month: "Mar", bookings: 90 },
    { month: "Apr", bookings: 110 },
    { month: "May", bookings: 130 },
    { month: "Jun", bookings: 150 },
    { month: "Jul", bookings: 200 },
  ];

  // 📌 Devices used to access the platform (Students & Providers)
  const deviceUsage = [
    { name: "Mobile", value: 60, color: "#8884d8" },
    { name: "Laptop", value: 30, color: "#82ca9d" },
    { name: "Tablet", value: 10, color: "#FFBB28" },
  ];

  // 📌 Number of bookings by location in Damietta
  const locationBookings = [
    { name: "New Damietta", value: 40, color: "#000" },
    { name: "Ras El Bar", value: 30, color: "#36a2eb" },
    { name: "Kafr Saad", value: 15, color: "#4bc0c0" },
    { name: "Faraskour", value: 15, color: "#ffcd56" },
  ];

  // 📌 Traffic sources (Where do users come from?)
  const trafficSources = [
    { name: "Google", value: 50, color: "#4285F4" },
    { name: "Facebook", value: 30, color: "#1877F2" },
    { name: "Instagram", value: 15, color: "#C13584" },
    { name: "Direct Recommendations", value: 5, color: "#FF8042" },
  ];

  const CustomTooltip = ({ active, payload, total }) => {
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
  };

  return (
    <div className="dashboard">
      <div className="stats">
        <div className="stat-card">
          <h4>Total Bookings</h4>
          <p>
            1500 <span className="increase">+12.5%</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>Active Students</h4>
          <p>
            230 <span className="increase">+8.3%</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>Available Rooms</h4>
          <p>
            85 <span className="decrease">-5.2%</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>New Listings</h4>
          <p>
            12 <span className="increase">+3.8%</span>
          </p>
        </div>
      </div>

      <div className="charts">
        {/* 📌 Total bookings per month */}
        <div className="chart-card">
          <h4>Monthly Bookings</h4>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={bookingData}>
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

        {/* 📌 Device usage */}
        <div className="chart-card">
          <h4>Device Usage</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={deviceUsage}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value">
                {deviceUsage.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="legend">
            {deviceUsage.map((entry, index) => (
              <div key={index} className="legend-item">
                <span style={{ backgroundColor: entry.color }}></span>{" "}
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* 📌 Bookings by location */}
        <div className="chart-card">
          <h4>Bookings by Location</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Tooltip
                content={
                  <CustomTooltip
                    total={locationBookings.reduce(
                      (sum, entry) => sum + entry.value,
                      0
                    )}
                  />
                }
              />
              <Pie data={locationBookings} dataKey="value" outerRadius={80}>
                {locationBookings.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="legend">
            {locationBookings.map((entry, index) => (
              <div key={index} className="legend-item">
                <span style={{ backgroundColor: entry.color }}></span>{" "}
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        {/* 📌 Traffic sources */}
        <div className="chart-card">
          <h4>Traffic Sources</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Tooltip
                content={
                  <CustomTooltip
                    total={trafficSources.reduce(
                      (sum, entry) => sum + entry.value,
                      0
                    )}
                  />
                }
              />
              <Pie data={trafficSources} dataKey="value" outerRadius={80}>
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="legend">
            {trafficSources.map((entry, index) => (
              <div key={index} className="legend-item">
                <span style={{ backgroundColor: entry.color }}></span>{" "}
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
