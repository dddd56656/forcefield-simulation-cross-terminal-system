// src/store/marsRoverSlice.ts
// =======================
// 火星探测车全局状态管理模块
// 管理：当前选择的探测车、日期/火星日(sol)、相机、分页、照片列表、任务清单、加载状态、错误信息
// 适用于所有需要读取和操作“火星照片”数据的页面和组件
// =======================

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMarsPhotos, fetchRoverManifest, MarsPhoto, RoverManifest } from "../api/marsRoverApi";

// 探测车英文名类型
type RoverName = "curiosity" | "opportunity" | "spirit";

// 全局状态类型定义
interface MarsRoverState {
  rover: RoverName;          // 当前选中的火星探测车
  sol: number | null;        // 火星日（sol），优先于地球日期
  earth_date: string | null; // 地球日期，字符串格式 yyyy-mm-dd
  camera: string | null;     // 相机简称
  page: number;              // 当前分页
  photos: MarsPhoto[];       // 当前照片列表
  manifest: RoverManifest | null; // 探测车任务清单
  status: "idle" | "loading" | "succeeded" | "failed"; // 加载状态
  error: string | null;      // 错误提示（中文）
}

// 默认状态
const initialState: MarsRoverState = {
  rover: "curiosity",      // 默认选中“好奇号”
  sol: null,               // 未选择火星日
  earth_date: null,        // 未选择地球日期
  camera: null,            // 未选择相机
  page: 1,                 // 默认第一页
  photos: [],              // 初始无照片
  manifest: null,          // 初始无任务清单
  status: "idle",          // 默认空闲
  error: null,             // 默认无错误
};

// ===============================
// 异步拉取火星照片（根据当前参数）
// ===============================
export const getMarsPhotos = createAsyncThunk(
  "marsRover/fetchPhotos",
  async (_, { getState }) => {
    // 读取当前全局参数
    const state = getState() as { marsRover: MarsRoverState };
    const { rover, sol, earth_date, camera, page } = state.marsRover;
    // 请求照片，sol、earth_date、camera 三者为可选，page为分页
    return await fetchMarsPhotos(
      rover,
      { sol: sol ?? undefined, earth_date: earth_date ?? undefined, camera: camera ?? undefined, page }
    );
  }
);

// ===============================
// 异步拉取探测车任务清单
// ===============================
export const getRoverManifest = createAsyncThunk(
  "marsRover/fetchManifest",
  async (rover: RoverName) => {
    return await fetchRoverManifest(rover);
  }
);

// ===============================
// createSlice 生成全局状态模块
// ===============================
const marsRoverSlice = createSlice({
  name: "marsRover",
  initialState,
  reducers: {
    // 选择探测车，重置所有筛选参数
    setRover(state, action) {
      state.rover = action.payload;
      state.page = 1;
      state.sol = null;
      state.earth_date = null;
      state.camera = null;
    },
    // 设置火星日，清空地球日，重置页码
    setSol(state, action) {
      state.sol = action.payload;
      state.earth_date = null;
      state.page = 1;
    },
    // 设置地球日，清空火星日，重置页码
    setEarthDate(state, action) {
      state.earth_date = action.payload;
      state.sol = null;
      state.page = 1;
    },
    // 选择相机，重置页码
    setCamera(state, action) {
      state.camera = action.payload;
      state.page = 1;
    },
    // 设置分页
    setPage(state, action) {
      state.page = action.payload;
    },
    // 重置所有筛选条件
    resetFilters(state) {
      state.sol = null;
      state.earth_date = null;
      state.camera = null;
      state.page = 1;
    }
  },
  // ===============================
  // 处理异步请求结果（状态管理与中文错误提示）
  // ===============================
  extraReducers: (builder) => {
    builder
      // 获取照片加载中
      .addCase(getMarsPhotos.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      // 获取照片成功
      .addCase(getMarsPhotos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.photos = action.payload;
        state.error = null;
      })
      // 获取照片失败，提示中文报错
      .addCase(getMarsPhotos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "照片加载失败，请重试";
      })
      // 获取任务清单成功
      .addCase(getRoverManifest.fulfilled, (state, action) => {
        state.manifest = action.payload;
      });
  }
});

// ========== 导出actions（中文名建议在UI层做映射） ==========
export const {
  setRover,         // 选择探测车
  setSol,           // 设置火星日
  setEarthDate,     // 设置地球日
  setCamera,        // 设置相机
  setPage,          // 设置页码
  resetFilters      // 重置所有筛选
} = marsRoverSlice.actions;

// 导出reducer
export default marsRoverSlice.reducer;
