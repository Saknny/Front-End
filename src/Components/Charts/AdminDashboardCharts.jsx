import React, { useContext, useEffect, useState } from "react";
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
import { fetchAdminDashboardData } from "../../Api/api";
import Loading2 from "../Loading2/Loading2";

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
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchAdminDashboardData();
      setDashboardData(res);
    };
    getData();
  }, []);

  if (!dashboardData) return <Loading2 />;

  const barColors = ["#8884d8", "#82ca9d", "#ffc658"];
  const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
  const ratingColors = ["#FFBB28", "#00C49F", "#0088FE", "#FF8042", "#AF19FF"];

  const requestStatus =
    dashboardData.requestDistribution &&
    Object.keys(dashboardData.requestDistribution).length > 0
      ? Object.entries(dashboardData.requestDistribution).map(
          ([key, value], i) => ({
            name: key,
            value,
            color: barColors[i % barColors.length],
          })
        )
      : [
          {
            name: language === "EN" ? "No Data" : "لا يوجد",
            value: 0,
            color: "#ccc",
          },
        ];

  const locationBookings =
    Array.isArray(dashboardData.bookingsByLocation) &&
    dashboardData.bookingsByLocation.length > 0
      ? dashboardData.bookingsByLocation.map((entry, i) => ({
          name: entry.locationEnum,
          value: parseInt(entry.count),
          color: pieColors[i % pieColors.length],
        }))
      : [
          {
            name: language === "EN" ? "No Data" : "لا يوجد",
            value: 0,
            color: "#ccc",
          },
        ];

  const bookingData =
    Array.isArray(dashboardData.monthlyBookings) &&
    dashboardData.monthlyBookings.length > 0
      ? dashboardData.monthlyBookings.map((m) => ({
          month: m.month,
          bookings: parseInt(m.count),
        }))
      : [{ month: language === "EN" ? "No Data" : "لا يوجد", bookings: 0 }];

  const ratingBreakdown =
    Array.isArray(dashboardData.ratingBreakdown) &&
    dashboardData.ratingBreakdown.length > 0
      ? dashboardData.ratingBreakdown.map((r, i) => ({
          name: `${r.stars} Stars`,
          value: parseInt(r.count),
          color: ratingColors[i % ratingColors.length],
        }))
      : [
          {
            name: language === "EN" ? "No Data" : "لا يوجد",
            value: 0,
            color: "#ccc",
          },
        ];

  return (
    <div className="charts">
      {/* Monthly Bookings */}
      <div className="chart-card">
        <h4>{language === "EN" ? "Monthly Bookings" : "الحجوزات الشهرية"}</h4>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={bookingData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#fdcb54"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Requests Status Distribution */}
      <div className="chart-card">
        <h4>
          {language === "EN"
            ? "Requests Status Distribution"
            : "توزيع حالة الطلبات"}
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={requestStatus}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {requestStatus.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="legend">
          {requestStatus.map((entry, i) => (
            <div key={i} className="legend-item">
              <span style={{ backgroundColor: entry.color }}></span>{" "}
              {entry.name}
            </div>
          ))}
        </div>
      </div>

      {/* Bookings by Location */}
      <div className="chart-card">
        <h4>
          {language === "EN" ? "Bookings by Location" : "الحجوزات حسب الموقع"}
        </h4>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Tooltip
              content={
                <CustomTooltip
                  total={locationBookings.reduce((sum, e) => sum + e.value, 0)}
                />
              }
            />
            <Pie data={locationBookings} dataKey="value" outerRadius={80}>
              {locationBookings.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
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

      {/* Rating Breakdown */}
      <div className="chart-card">
        <h4>{language === "EN" ? "Rating Breakdown" : "توزيع التقييمات"}</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            layout="vertical"
            data={ratingBreakdown}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Bar dataKey="value" barSize={20}>
              {ratingBreakdown.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="legend">
          {ratingBreakdown.map((entry, index) => (
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
