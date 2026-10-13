import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import App from "./App";
import "./styles.css";

console.log(RouterProvider);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
