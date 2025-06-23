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
const RoomReservationRequests = lazy(() =>
  import("../Pages/PROVIDER/Reservation Requests/RoomReservationRequests")
);
const RoomReservationRequestDetails = lazy(() =>
  import(
    "../Pages/PROVIDER/ReservationRequestsDetails/RoomReservationRequestDetails"
  )
);

function ProviderLayout() {
  const { darkMode } = useContext(LoginContext);

  return (
    <div className="app-container">
      {" "}
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <Suspense fallback={<Loading2 />}>
          <div className={`content ${darkMode === "dr" ? "dr" : ""}`}>
            <Routes>
              <Route path="/" element={<ProviderDashboard />} />
              <Route path="/requests" element={<ReservationRequests />} />
              <Route
                path="/requests/:id"
                element={<ReservationRequestsDetails />}
              />
              <Route
                path="/room_requests"
                element={<RoomReservationRequests />}
              />
              <Route
                path="/room_requests/:id"
                element={<RoomReservationRequestDetails />}
              />

              {/* Add more provider-specific routes here */}
            </Routes>
          </div>
        </Suspense>
      </div>
    </div>
  );
}

export default ProviderLayout;
