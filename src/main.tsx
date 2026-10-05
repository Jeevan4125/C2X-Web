import { createRoot } from "react-dom/client";
import "./styles/globals.scss";
import App from "./App";

// Disable browser scroll restoration
if (typeof window !== "undefined" && "scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

// Force scroll to top
if (typeof window !== "undefined") {
  window.scrollTo(0, 0);
}

// Remove StrictMode in production for better performance
const root = createRoot(document.getElementById("root")!);
root.render(<App />);
