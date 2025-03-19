import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LoginAdmin } from "./Context/Login/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LoginAdmin>
    <App />
  </LoginAdmin>
);
