import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Sidbar/Sidbar";
import Navbar from "../Components/Navbar/Navbar";
import ProviderDashboard from "../Pages/PROVIDER/ProviderDashboard/ProviderDashboard";
import ReservationRequests from "../Pages/PROVIDER/Reservation Requests/ReservationRequests";
import { LoginContext } from "../Context/Login/Login";
import "./Layout.scss"; // Import your CSS file for styling
import ReservationRequestsDetails from "../Pages/PROVIDER/ReservationRequestsDetails/ReservationRequestsDetails";
// import Settings from "../Components/Settings/Settings";
function ProviderLayout() {
  const { darkMode } = useContext(LoginContext);

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className={`content ${darkMode === "dr" ? "dr" : ""}`}>
          <Routes>
            <Route path="/" element={<ProviderDashboard />} />
            <Route path="/requests" element={<ReservationRequests />} />
            <Route
              path="/requests/:id"
              element={<ReservationRequestsDetails />}
            />

            {/* Add more provider-specific routes here */}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default ProviderLayout;
