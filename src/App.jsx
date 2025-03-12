import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Navbar from "./Components/Navbar/Navbar";
import Sidebar from "./Components/Sidbar/Sidbar";
import Requests from "./Pages/Requests/Requests";
import RequestDetails from "./Components/RequestDetails/RequestDetails";
import Settings from "./Components/Settings/Settings";
import UsersAccounts from "./Pages/UsersAccounts/UsersAccounts";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/requests" element={<Requests />} />
              <Route path="/requests/:id" element={<RequestDetails />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/UsersAccounts" element={<UsersAccounts />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
