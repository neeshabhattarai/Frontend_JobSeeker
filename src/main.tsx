import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import JobListingUI from "./Test.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <JobListingUI /> */}
    <App />
  </StrictMode>
);
