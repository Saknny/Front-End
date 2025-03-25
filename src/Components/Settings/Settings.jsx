import { useEffect } from "react";
import axios from "axios";
import React from "react";
function Settings() {
  useEffect(() => {
    axios;
    axios
      .get("/api/admin/pending-requests")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, []);
  return (
    <div className="container mt-4">
      <h2>Settings Page</h2>
      <p>Here you can manage application settings.</p>
    </div>
  );
}

export default Settings;
