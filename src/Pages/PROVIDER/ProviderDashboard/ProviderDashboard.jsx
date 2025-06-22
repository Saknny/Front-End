import React, { useContext, Suspense, lazy, useEffect, useState } from "react";
import "./ProviderDashboard.scss";
import { LoginContext } from "../../../Context/Login/Login";
import { fetchProviderDashboardData } from "../../../Api/api";

const ProviderDashboardCharts = lazy(() =>
  import("../../../Components/Charts/ProviderDashboardCharts.jsx")
);

function ProviderDashboard() {
  const { language, darkMode } = useContext(LoginContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProviderDashboardData().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  const stats = {
    rentedApartments: { value: data.rentedApartments || 0, change: 0 },
    rentedBeds: { value: data.rentedBeds || 0, change: 0 },
    totalRooms: { value: data.totalRooms || 0, change: 0 },
    averageRating: { value: data.averageRating || 0, change: 0 },
  };

  // Format topRatedApartments with colors
  const colors = ["#FF8042", "#0088FE", "#00C49F", "#FFBB28"];
  const topRatedApartments = (data.topRatedApartments || []).map(
    (apt, idx) => ({
      name: apt.title,
      rating: apt.averageRating,
      color: colors[idx % colors.length],
    })
  );

  // Format monthlyBookingRequests to match chart format
  const monthlyBookings = (data.monthlyBookingRequests || []).map((item) => ({
    month: item.month,
    requests: Number(item.count),
  }));

  // Format rentedRoomsPerMonth
  const monthlyRooms = (data.rentedRoomsPerMonth || []).map((item) => ({
    month: item.month,
    rooms: Number(item.count),
  }));

  // Format unitRadar from requestDistribution
  const unitRadar = Object.entries(data.requestDistribution || {}).map(
    ([key, val]) => ({
      type:
        language === "EN"
          ? key.charAt(0).toUpperCase() + key.slice(1)
          : key === "pending"
          ? "قيد الانتظار"
          : key === "approved"
          ? "مقبول"
          : "مرفوض",
      count: val,
    })
  );

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
        {renderStatCard("Average Rating", "متوسط التقييم", stats.averageRating)}
      </div>

      <Suspense fallback={<div>Loading Charts...</div>}>
        <ProviderDashboardCharts
          language={language}
          monthlyBookings={monthlyBookings}
          monthlyRooms={monthlyRooms}
          unitRadar={unitRadar}
          topRatedApartments={topRatedApartments}
        />
      </Suspense>
    </div>
  );
}

export default ProviderDashboard;
