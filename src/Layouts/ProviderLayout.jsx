import React, { useContext, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LoginContext } from "../Context/Login/Login";
import "./Layout.scss"; // Import your CSS file for styling
const ProviderDashboard = lazy(() =>
  import("../Pages/PROVIDER/ProviderDashboard/ProviderDashboard")
);
const ReservationRequests = lazy(() =>
  import("../Pages/PROVIDER/Reservation Requests/ReservationRequests")
);
const ReservationRequestsDetails = lazy(() =>
  import(
    "../Pages/PROVIDER/ReservationRequestsDetails/ReservationRequestsDetails"
  )
);
import Navbar from "../Components/Navbar/Navbar";
import Sidebar from "../Components/Sidbar/Sidbar";
const Loading2 = lazy(() => import("../Components/Loading2/Loading2"));
function ProviderLayout() {
  const { darkMode } = useContext(LoginContext);

  return (
    <div className="app-container">
      <Suspense fallback={<Loading2 />}>
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
      </Suspense>
    </div>
  );
}

export default ProviderLayout;
