// ✅ ProviderDashboard.jsx with Chart Section Lazily Loaded
import React, { useContext, Suspense, lazy } from "react";
import "./ProviderDashboard.scss";
import { LoginContext } from "../../../Context/Login/Login";

const ProviderDashboardCharts = lazy(() =>
  import("../../../Components/Charts/ProviderDashboardCharts.jsx")
);

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

      <Suspense fallback={<div>Loading Charts...</div>}>
        <ProviderDashboardCharts
          language={language}
          apartmentTypes={apartmentTypes}
          monthlyEarnings={monthlyEarnings}
          unitRadar={unitRadar}
        />
      </Suspense>
    </div>
  );
}

export default ProviderDashboard;
