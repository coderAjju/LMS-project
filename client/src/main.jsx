import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { appStore } from "./store/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={appStore}>
      <App />
    </Provider>
  </BrowserRouter>
);
