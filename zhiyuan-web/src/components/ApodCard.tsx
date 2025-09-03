// src/components/ApodCard.tsx
// 纯展示型组件：天文每日一图
import React from "react";
import { ApodResponse } from "../api/apodApi";

/**
 * Props 结构定义
 */
interface ApodCardProps {
  apod: ApodResponse;
}

/**
 * NASA APOD 展示卡片
 */
const ApodCard: React.FC<ApodCardProps> = ({ apod }) => (
  <div className="bg-gray-900 rounded-2xl shadow-xl p-6 max-w-2xl mx-auto my-4 text-white">
    <h2 className="text-2xl font-bold mb-3">{apod.title}</h2>
    <p className="mb-2 text-sm">{apod.date}</p>
    {apod.media_type === "image" ? (
      <img
        src={apod.url}
        alt={apod.title}
        className="rounded-xl w-full object-cover mb-4"
        loading="lazy"
      />
    ) : (
      <iframe
        title={apod.title}
        src={apod.url}
        className="w-full rounded-xl mb-4"
        style={{ aspectRatio: "16/9" }}
        allowFullScreen
      />
    )}
    <p className="text-base leading-relaxed">{apod.explanation}</p>
    {apod.hdurl && (
      <a
        href={apod.hdurl}
        target="_blank"
        rel="noopener noreferrer"
        className="block mt-3 text-blue-400 underline text-sm"
      >
        查看高清原图
      </a>
    )}
  </div>
);

export default ApodCard;
