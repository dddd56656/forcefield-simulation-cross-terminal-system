// src/pages/ApodPage.tsx
// 页面组件：APOD主页面，包含日期选择与展示
import React from "react";
import { useApod } from "../features/apod/useApod";
import ApodCard from "../components/ApodCard";

/**
 * NASA 天文每日一图主页面
 */
const ApodPage: React.FC = () => {
  const { data, status, error, date, onDateChange } = useApod();

  // 日期输入事件处理
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value);
  };

  return (
    <div className="flex flex-col items-center py-8 px-2">
      <h1 className="text-4xl font-bold mb-6 text-white">NASA Astronomy Picture of the Day</h1>
      <input
        type="date"
        value={date || new Date().toISOString().split("T")[0]}
        onChange={handleDateChange}
        max={new Date().toISOString().split("T")[0]}
        className="mb-6 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-600"
      />
      {status === "loading" && <div className="text-lg text-gray-400">加载中...</div>}
      {error && <div className="text-red-400">加载失败：{error}</div>}
      {data && <ApodCard apod={data} />}
    </div>
  );
};

export default ApodPage;
