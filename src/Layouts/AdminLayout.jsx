import React, { useContext, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Sidbar/Sidbar";
import Navbar from "../Components/Navbar/Navbar";

const AdminDashboard = lazy(() =>
  import("../Pages/ADMIN/AdminDashboard/AdminDashboard")
);
const Requests = lazy(() => import("../Pages/ADMIN/Requests/Requests"));
const RequestDetails = lazy(() =>
  import("../Components/RequestDetails/RequestDetails")
);
const Settings = lazy(() => import("../Components/Settings/Settings"));

import UsersAccounts from "../Pages/ADMIN/UsersAccounts/UsersAccounts";
import { LoginContext } from "../Context/Login/Login";
import "./Layout.scss";
import Loading2 from "../Components/Loading2/Loading2";

const AdminIncompleteUsers = lazy(() =>
  import("../Pages/ADMIN/Complete Profile/User/AdminIncompleteUsers")
);
const CompleteProfileDetails = lazy(() =>
  import("../Components/CompleteProfileDetails/CompleteProfileDetails")
);
function AdminLayout() {
  const { darkMode } = useContext(LoginContext);

  return (
    <div className="app-container">
      <Suspense fallback={<Loading2 />}>
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className={`content ${darkMode === "dr" ? "dr" : ""}`}>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/requests/:id" element={<RequestDetails />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/UsersAccounts" element={<UsersAccounts />} />
              <Route
                path="/complete-profile/user"
                element={<AdminIncompleteUsers />}
              />
              <Route
                path="/complete-profile/user/:id"
                element={<CompleteProfileDetails />}
              />
            </Routes>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default AdminLayout;
