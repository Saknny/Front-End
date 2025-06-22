import React, { useContext, Suspense, lazy, useEffect, useState } from "react";
import "./ProviderDashboard.scss";
import { LoginContext } from "../../../Context/Login/Login";
import { fetchProviderDashboardData } from "../../../Api/api";
import Loading2 from "../../../Components/Loading2/Loading2.jsx";

const ProviderDashboardCharts = lazy(() =>
  import("../../../Components/Charts/ProviderDashboardCharts.jsx")
);

function ProviderDashboard() {
  const { language, darkMode } = useContext(LoginContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProviderDashboardData().then(setData);
  }, []);

  if (!data) return <Loading2 />;

  const stats = {
    rentedApartments: { value: data.rentedApartments || 0, change: 0 },
    rentedBeds: { value: data.rentedBeds || 0, change: 0 },
    totalRooms: { value: data.totalRooms || 0, change: 1 },
    averageRating: { value: data.averageRating || 0, change: 0 },
  };

  // Format topRatedApartments with colors
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
      : [
          {
            type: language === "EN" ? "No Data" : "لا يوجد",
            count: 0,
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
