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

  return (
    <div className={`AdminDashboard ${darkMode}`}>
      <div className="stats">
        <div className="stat-card">
          <h4>{language === "EN" ? "Total Bookings" : "إجمالي الحجوزات"}</h4>
          <p>
            {data.totalBookings} <span className="increase">+12.5%</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>{language === "EN" ? "Active Students" : "الطلاب النشطون"}</h4>
          <p>
            {data.activeStudents} <span className="increase">+8.3%</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>{language === "EN" ? "Available Rooms" : "الغرف المتاحة"}</h4>
          <p>
            {data.availableRooms} <span className="decrease">-5.2%</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>{language === "EN" ? "Total Providers" : "عدد المزوّدين"}</h4>
          <p>
            {data.totalProviders} <span className="increase">+4.7%</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>{language === "EN" ? "New Listings" : "الإدراجات الجديدة"}</h4>
          <p>
            {data.newListings} <span className="increase">+1</span>
          </p>
        </div>
      </div>

      <Suspense fallback={<Loading2 />}>
        <AdminDashboardCharts />
      </Suspense>
    </div>
  );
}

export default AdminDashboard;
