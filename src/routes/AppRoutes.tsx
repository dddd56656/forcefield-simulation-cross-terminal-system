// routes/AppRoutes.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// 引入布局和页面
import MainLayout from "../layouts/MainLayout";
import MasterDetailLayout from "../layouts/MasterDetailLayout";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import APOD from "../pages/APOD";
import Asteroids from "../pages/Asteroids";
import Login from "../pages/Login";
import Register from "../pages/Register";
import RoverPhotos from "../pages/RoverPhotos";

// import NotFound from "../pages/NotFound";

// 你可以在这里扩展更多页面、业务模块

/**
 * AppRoutes
 * - 全局路由配置文件，统一管理所有页面的路由跳转
 * - 推荐只在 index.tsx/main.tsx 入口调用一次
 * - 强烈建议用 MainLayout 包裹需要全局布局的页面
 */
const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      {/* 默认首页，重定向到 Dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 带主布局的页面路由 */}
      <Route
        path="/dashboard"
        element={
          // MainLayout 作为顶层布局，包裹所有主内容
          <MainLayout>
            {/* 主从视图布局（Sidebar + Content） */}
            <MasterDetailLayout>
              <Dashboard />
            </MasterDetailLayout>
          </MainLayout>
        }
      />

      {/* 其它页面举例：设置页 */}
      <Route
        path="/settings"
        element={
          <MainLayout>
            <MasterDetailLayout>
              <Settings />
            </MasterDetailLayout>
          </MainLayout>
        }
      />
      <Route
        path="/apod"
        element={
          <MainLayout>
            <MasterDetailLayout>
              <APOD />
            </MasterDetailLayout>
          </MainLayout>
        }
      />
      <Route
        path="/asteroids"
        element={
          <MainLayout>
            <MasterDetailLayout>
              <Asteroids />
            </MasterDetailLayout>
          </MainLayout>
        }
      />
      <Route
        path="/roverPhotos"
        element={
          <MainLayout>
            <MasterDetailLayout>
              <RoverPhotos />
            </MasterDetailLayout>
          </MainLayout>
        }
      />




      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* 404 Not Found 页面，兜底路由
      <Route
        path="*"
        element={
          <MainLayout>
            <NotFound />
          </MainLayout>
        }
      /> */}
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
