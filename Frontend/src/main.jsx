import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/**
 * Entry point of the React app.
 * ReactDOM creates a root and mounts App inside #root
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
