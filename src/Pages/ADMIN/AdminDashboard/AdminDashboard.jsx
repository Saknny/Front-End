import React, { useContext, useEffect, useState, Suspense, lazy } from "react";
import "./AdminDashboard.scss";
import { LoginContext } from "../../../Context/Login/Login";
import Loading2 from "../../../Components/Loading2/Loading2.jsx";
import { fetchAdminDashboardData } from "../../../Api/api";

const AdminDashboardCharts = lazy(() =>
  import("../../../Components/Charts/AdminDashboardCharts.jsx")
);

function AdminDashboard() {
  const { language, darkMode } = useContext(LoginContext);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await fetchAdminDashboardData();
      setData(res);
    };
    getData();
  }, []);

  if (!data) return <Loading2 />;

  const stats = {
    totalBookings: {
      value: data.totalBookings || 0,
      change: data.totalBookingsChange || 0.2,
    },
    activeStudents: {
      value: data.activeStudents || 0,
      change: data.activeStudentsChange || 0.01,
    },
    availableRooms: {
      value: data.availableRooms || 0,
      change: data.availableRoomsChange || 1,
    },
    totalProviders: {
      value: data.totalProviders || 0,
      change: data.totalProvidersChange || 0.9,
    },
    newListings: {
      value: data.newListings || 0,
      change: data.newListingsChange || 5,
    },
  };

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
    <div className={`AdminDashboard ${darkMode}`}>
      <div className="stats">
        {renderStatCard(
          "Total Bookings",
          "إجمالي الحجوزات",
          stats.totalBookings
        )}
        {renderStatCard(
          "Active Students",
          "الطلاب النشطون",
          stats.activeStudents
        )}
        {renderStatCard(
          "Available Rooms",
          "الغرف المتاحة",
          stats.availableRooms
        )}
        {renderStatCard(
          "Total Providers",
          "عدد المزوّدين",
          stats.totalProviders
        )}
        {renderStatCard("New Listings", "الإدراجات الجديدة", stats.newListings)}
      </div>

      <Suspense fallback={<Loading2 />}>
        <AdminDashboardCharts />
      </Suspense>
    </div>
  );
}

export default AdminDashboard;
