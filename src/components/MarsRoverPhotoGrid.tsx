// src/components/MarsRoverPhotoGrid.tsx
// 纯展示型网格组件，展示 Mars 照片列表
import React from "react";
import { MarsPhoto } from "../api/marsRoverApi";

/**
 * Props: Mars Rover照片列表
 */
interface Props {
  photos: MarsPhoto[];
}

/**
 * 网格形式展示每张照片及相关信息
 */
const MarsRoverPhotoGrid: React.FC<Props> = ({ photos }) => {
  if (!photos.length) return <div className="text-center text-gray-400 py-6">暂无图片数据</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {photos.map((photo) => (
        <div key={photo.id} className="bg-gray-900 rounded-2xl shadow-lg p-4 flex flex-col items-center">
          <img
            src={photo.img_src}
            alt={`Sol ${photo.sol} ${photo.camera.full_name}`}
            className="rounded-xl w-full h-56 object-cover mb-3"
            loading="lazy"
          />
          <div className="w-full">
            <div className="font-bold text-lg mb-1">{photo.camera.full_name}</div>
            <div className="text-xs text-gray-400 mb-1">Rover: {photo.rover.name}</div>
            <div className="text-xs text-gray-400 mb-1">Sol: {photo.sol} / Earth Date: {photo.earth_date}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarsRoverPhotoGrid;
