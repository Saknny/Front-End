import React, { useContext, Suspense, lazy } from "react";
import "./AdminDashboard.scss";
import { LoginContext } from "../../../Context/Login/Login";
import Loading2 from "../../../Components/Loading2/Loading2.jsx";
// ✅ lazy loading للـ Charts
const AdminDashboardCharts = lazy(() =>
  import("../../../Components/Charts/AdminDashboardCharts.jsx")
);

function AdminDashboard() {
  const { language, darkMode } = useContext(LoginContext);

  return (
    <div className={`AdminDashboard ${darkMode}`}>
      <div className="stats">
        <div className="stat-card">
          <h4>{language == "EN" ? "Total Bookings" : "إجمالي الحجوزات"}</h4>
          <p>
            1500 <span className="increase">+12.5%</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>{language == "EN" ? "Active Students" : "الطلاب النشطون"}</h4>
          <p>
            230 <span className="increase">+8.3%</span>
          </p>
        </div>
        <div className="stat-card">
          <h4>{language == "EN" ? "Available Rooms" : "الغرف المتاحة"}</h4>
          <p>
            85 <span className="decrease">-5.2%</span>
          </p>
        </div>
        <div className="stat-card">
          <h4> {language == "EN" ? "New Listings" : "الحجوزات الجديدة"}</h4>
          <p>
            12 <span className="increase">+3.8%</span>
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
