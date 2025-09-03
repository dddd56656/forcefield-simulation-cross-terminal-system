// src/store/apodSlice.ts
// ===========================================================================
// Redux Toolkit Slice for APOD (Astronomy Picture of the Day) State Management
// Google CTO 注释版：详细解释每一处设计思路，便于团队协作与迭代
// ===========================================================================

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApod, ApodResponse } from "../api/apodApi";

/**
 * 定义 APOD 状态的数据结构，全面类型声明，有助于类型安全与开发提示。
 */
interface ApodState {
  // 当前获取到的 APOD 数据对象（接口定义见 ../api/apodApi）
  data: ApodResponse | null;
  // 状态流转: 空闲 | 加载中 | 获取成功 | 获取失败
  status: "idle" | "loading" | "succeeded" | "failed";
  // 错误信息（仅在请求失败时赋值）
  error: string | null;
  // 当前选中的日期（支持按日期查询）
  date: string | null;
}

/**
 * Redux 全局 store 初始化状态
 */
const initialState: ApodState = {
  data: null,      // APOD 图像数据，初始为空
  status: "idle",  // 初始为 idle，表示未进行任何请求
  error: null,     // 初始无错误
  date: null,      // 初始无选中日期
};

/**
 * 异步 Action：根据日期获取 NASA APOD 数据
 * - 通过 createAsyncThunk 自动生成三种 action: pending, fulfilled, rejected
 * - date?: string 支持可选日期参数，默认获取今天
 * - API 详情见 ../api/apodApi/fetchApod
 */
export const getApod = createAsyncThunk(
  "apod/fetch",
  async (date?: string) => {
    // 调用 API 层 fetchApod 方法，发起实际的 HTTP 请求
    const res = await fetchApod(date);
    // 返回数据，将自动作为 fulfilled 的 payload
    return res;
  }
);

/**
 * createSlice: 创建 Redux Toolkit Slice
 * - name: Slice 名称，影响 action type 命名空间
 * - initialState: 初始状态
 * - reducers: 同步 action，修改本地状态
 * - extraReducers: 处理异步 action（如 createAsyncThunk 自动生成的 pending/fulfilled/rejected）
 */
const apodSlice = createSlice({
  name: "apod",
  initialState,
  reducers: {
    /**
     * setDate: 修改选中日期
     * - 一般用于用户切换日期时更新状态
     * - 只改变 date 字段，不触发异步获取
     */
    setDate(state, action) {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * 异步请求发起（pending）
       * - 进入 loading 状态
       * - 清空 error 信息
       */
      .addCase(getApod.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      /**
       * 异步请求成功（fulfilled）
       * - 写入获取到的 APOD 数据
       * - 更新状态为 succeeded
       * - 清空 error
       */
      .addCase(getApod.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.error = null;
      })
      /**
       * 异步请求失败（rejected）
       * - 状态设为 failed
       * - 记录错误信息
       */
      .addCase(getApod.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Fetch failed"; // 兜底错误提示
      });
  },
});

/**
 * 导出同步 action，便于组件直接分发（如 dispatch(setDate('2023-01-01'))）
 */
export const { setDate } = apodSlice.actions;

/**
 * 默认导出 reducer，供 store 挂载
 */
export default apodSlice.reducer;

// ===========================================================================
// 该文件设计要点：
// - 遵循单一职责原则，只负责 APOD 相关的全局状态管理
// - 所有异步状态处理都由 extraReducers 托管，简化组件逻辑
// - 便于单元测试和功能拓展（如支持更多查询参数、缓存机制等）
// ===========================================================================
