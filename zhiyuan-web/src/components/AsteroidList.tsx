// src/components/AsteroidList.tsx
// 展示单日/多日小行星数组的通用列表
import React from "react";
import { Asteroid } from "../api/asteroidApi";

/** 支持多日合并数据展开 */
type Props = { asteroids: Asteroid[] };

const AsteroidList: React.FC<Props> = ({ asteroids }) => {
  if (!asteroids || asteroids.length === 0)
    return <div className="text-gray-400 text-center py-8">暂无数据</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {asteroids.map((ast) => (
        <div
          key={ast.id}
          className="rounded-xl bg-gray-900 shadow-lg p-4 text-white flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">{ast.name}</span>
            {ast.is_potentially_hazardous_asteroid && (
              <span className="ml-2 px-2 py-1 bg-red-500 rounded text-xs">Hazardous</span>
            )}
          </div>
          <div>
            <span className="text-sm text-gray-400 mr-2">JPL ID:</span>
            <a
              href={ast.nasa_jpl_url}
              className="text-blue-300 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ast.id}
            </a>
          </div>
          <div className="text-sm text-gray-400">
            绝对星等: {ast.absolute_magnitude_h}
            <span className="ml-4">直径: {ast.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} ~ {ast.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km</span>
          </div>
          {ast.close_approach_data?.[0] && (
            <div className="text-sm text-gray-300">
              <div>
                距离地球最近日期: {ast.close_approach_data[0].close_approach_date}
                <span className="ml-4">最近距离: {parseFloat(ast.close_approach_data[0].miss_distance.kilometers).toLocaleString()} km</span>
              </div>
              <div>
                相对速度: {parseFloat(ast.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString()} km/h
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AsteroidList;
