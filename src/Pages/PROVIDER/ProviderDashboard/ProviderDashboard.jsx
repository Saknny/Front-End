// ✅ ProviderDashboard.jsx (Fixed null crash + passed language prop to Charts)
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
    rentedApartments: {
      value: data.rentedApartments || 0,
      change: data.rentedApartmentsChange || 0,
    },
    rentedBeds: {
      value: data.rentedBeds || 0,
      change: data.rentedBedsChange || 0,
    },
    totalRooms: {
      value: data.totalRooms || 0,
      change: data.totalRoomsChange || 0,
    },
    averageRating: {
      value: data.averageRating || 0,
      change: data.averageRatingChange || 0,
    },
  };

  const renderStatCard = (labelEn, labelAr, stat) => (
    <div className="stat-card">
      <h4>{language === "EN" ? labelEn : labelAr}</h4>
      <p>
        {stat?.value ?? 0}
        <span className={stat?.change >= 0 ? "increase" : "decrease"}>
          {stat?.change >= 0 ? " ↑ " : " ↓ "}
          {Math.abs(stat?.change ?? 0)}%
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

      <Suspense fallback={<Loading2 />}>
        <ProviderDashboardCharts language={language} />
      </Suspense>
    </div>
  );
}

export default ProviderDashboard;
