import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
