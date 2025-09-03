// src/features/apod/useApod.ts

/**
 * Feature: APOD（Astronomy Picture of the Day）业务逻辑 Hook
 * 封装对 NASA APOD API 的数据拉取、日期切换等状态逻辑。
 * 面向页面/组件层统一暴露 APOD 状态与操作，提升可维护性与解耦度。
 * 
 * Google 标准最佳实践：
 * - 业务逻辑全部封装为自定义 Hook，避免在组件中混杂副作用/业务调用。
 * - 与 Redux 状态保持解耦，业务层无需关心 action 实现细节。
 * - 充分注释每一行，便于大团队跨国协作和新人 onboarding。
 */

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";  // Redux Typed Hooks: 强类型、解耦全局状态
import { getApod, setDate } from "../../store/apodSlice";            // 业务相关 action：API 拉取、日期变更

/**
 * useApod
 * 自定义 Hook，统一对外暴露 APOD 相关状态与操作函数
 * 返回值可用于页面、组件、feature 层，无缝对接 UI
 */
export const useApod = () => {
  // 获取 Redux dispatch 函数，派发异步 action
  const dispatch = useAppDispatch();

  // 选择 apodSlice 下的数据，自动跟踪 data/status/error/date
  // 这里推荐单点出口，便于全局监控/调试
  const { data, status, error, date } = useAppSelector((state) => state.apod);

  /**
   * 副作用：在页面初次挂载 or 日期变化时自动拉取对应的 APOD 数据
   * Google 推荐实践：
   * - useEffect 仅依赖 date 和 dispatch，保证副作用最小。
   * - 避免不必要的依赖，提升性能。
   * - date 为空时自动获取最新 APOD。
   */
  useEffect(() => {
    // 触发异步 action 拉取 APOD 数据（传递日期参数或取默认最新）
    dispatch(getApod(date || undefined));
    // [date, dispatch]：确保每次日期变更都能拉取新数据
  }, [date, dispatch]);

  /**
   * 业务操作：切换日期（由 DatePicker、日历组件等回调触发）
   * Google 推荐实践：
   * - onDateChange 作为稳定的回调暴露给 UI 层，解耦 redux 细节。
   * - 只派发 setDate，不直接拉取数据，副作用由 useEffect 自动完成。
   * @param newDate 用户选择的新日期（YYYY-MM-DD 格式）
   */
  const onDateChange = (newDate: string) => {
    dispatch(setDate(newDate)); // 仅变更日期，实际数据拉取自动联动
  };

  // Hook 返回值对象，统一暴露全部关心的状态和操作
  // 推荐显式命名，便于团队协作和类型推断
  return {
    data,        // APOD 数据对象（图片、说明、作者等）
    status,      // 拉取状态："idle" | "loading" | "succeeded" | "failed"
    error,       // 错误信息（如 API 异常、网络错误）
    date,        // 当前选中的日期
    onDateChange // 切换日期的操作函数
  };
};

/**
 * 用法建议（Google 标准）：
 * const { data, status, error, date, onDateChange } = useApod();
 * <DatePicker value={date} onChange={onDateChange} />
 * <ApodView data={data} loading={status==='loading'} error={error} />
 *
 * 这样业务代码始终围绕 “状态-操作-UI” 闭环展开，易于测试和扩展。
 */
