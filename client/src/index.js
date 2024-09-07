import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PayPalScriptProvider options={{ "client-id": "AaGCSMvEj_qE68aHfL56j2_9l2N4rYsUkyM5GgLpSTlAQlQ2SA5qHP5IwMhkLtVnF3SQhiIgu-EkaU2v" }}>
          <App />
        </PayPalScriptProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
