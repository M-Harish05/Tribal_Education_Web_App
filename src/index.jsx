import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import LoadingScreen from "./components/LoadingScreen";
import "./styles/tailwind.css";
import "./styles/index.css";

// Debug: Check if root element exists
const container = document.getElementById("root");
if (!container) {
  console.error("Root element not found!");
  document.body.innerHTML = '<div style="padding: 20px; color: red; font-family: Arial;">Error: Root element not found!</div>';
} else {
  console.log("Root element found, starting React app...");
  const root = createRoot(container);
  
  root.render(
    <Suspense fallback={<LoadingScreen />}>
      <App />
    </Suspense>
  );
}