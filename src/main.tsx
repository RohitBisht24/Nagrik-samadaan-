
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Prevent scroll to top on refresh
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

createRoot(document.getElementById("root")!).render(<App />);
  