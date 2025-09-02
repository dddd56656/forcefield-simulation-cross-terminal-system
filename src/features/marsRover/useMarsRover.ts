// src/features/marsRover/useMarsRover.ts
// 业务 hooks：封装所有“查询参数控制”、“分页”、“数据加载”等核心业务逻辑，建议所有涉及火星车照片功能的组件调用本 Hook

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getMarsPhotos,     // 获取火星探测器照片的异步 action
  setRover,          // 设置选中的火星车
  setSol,            // 设置火星日
  setEarthDate,      // 设置地球日期
  setCamera,         // 设置相机类型
  setPage,           // 设置分页页码
  getRoverManifest,  // 获取指定火星车的任务清单
  resetFilters       // 重置所有筛选条件
} from "../../store/marsRoverSlice";

/**
 * useMarsRover
 * @description 统一封装火星车照片页所有“业务状态”与“状态操作方法”。
 * - 包含参数筛选、分页控制、自动加载等全部页面逻辑
 * - 任何涉及火星车图片的页面组件都建议直接引用本 Hook
 */
export const useMarsRover = () => {
  // 派发 Redux action 的函数
  const dispatch = useAppDispatch();

  // 读取 Redux 中 marsRover 的所有业务状态（包括加载中、当前参数、数据等）
  const state = useAppSelector((state) => state.marsRover);

  // ------------------ 数据自动加载逻辑（每当依赖变化时自动拉取照片） ------------------
  useEffect(() => {
    // 只要依赖项（火星车、火星日、地球日期、相机、页码）有任何一个发生变化，自动加载照片
    dispatch(getMarsPhotos());
  }, [
    state.rover,      // 当前选中的火星车（例如 "Curiosity"）
    state.sol,        // 当前选中的火星日
    state.earth_date, // 当前选中的地球日期
    state.camera,     // 当前选中的相机类型
    state.page,       // 当前页码
    dispatch
  ]);

  // ------------------ 任务清单自动同步（仅当火星车切换时自动加载） ------------------
  useEffect(() => {
    // 每次切换火星车后，自动同步最新任务清单（Manifest）
    dispatch(getRoverManifest(state.rover));
  }, [
    state.rover,   // 仅依赖当前火星车名
    dispatch
  ]);

  // ------------------ 对外暴露的所有“业务状态”及“操作函数” ------------------
  return {
    ...state, // 当前所有业务状态，直接解构全部字段

    // 设置当前选中的火星车，例如 "Curiosity"
    setRover: (rover: string) => dispatch(setRover(rover)),

    // 设置当前的火星日（sol），可以传入 null 表示未指定
    setSol: (sol: number | null) => dispatch(setSol(sol)),

    // 设置当前的地球日期，可以传入 null 表示未指定
    setEarthDate: (earthDate: string | null) => dispatch(setEarthDate(earthDate)),

    // 设置当前相机类型，例如 "NAVCAM"，可传入 null 表示未指定
    setCamera: (camera: string | null) => dispatch(setCamera(camera)),

    // 设置当前分页的页码（第一页为 1）
    setPage: (page: number) => dispatch(setPage(page)),

    // 重置全部筛选条件为初始状态（如全部清空或回到默认选项）
    resetFilters: () => dispatch(resetFilters())
  };
};
