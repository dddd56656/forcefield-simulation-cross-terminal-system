// components/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";

// 菜单配置
const menuItems = [
  { name: "NASA天文图", to: "/apod" },
  { name: "近地小行星", to: "/asteroids" },
  { name: "火星探测器", to: "/roverPhotos" },

];



/**
 * 侧边栏
 * - h-full保证高度
 * - bg-gray-100保证灰色
 * - NavLink实现路由跳转/高亮
 */
const Sidebar: React.FC = () => (
  <nav className="flex flex-col h-full p-4 space-y-2">
    {menuItems.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          [
            "flex items-center px-3 py-2 rounded transition-all duration-150",
            isActive
              ? "bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-500"
              : "text-gray-700 hover:bg-blue-100 hover:text-blue-600 border-l-4 border-transparent",
          ].join(" ")
        }
      >
        {item.name}
      </NavLink>
    ))}
  </nav>
);

export default Sidebar;
