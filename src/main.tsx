// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./styles/index.css"; // 全局样式（如有）

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* 全局状态管理注入 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
