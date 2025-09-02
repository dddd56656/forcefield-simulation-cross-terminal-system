// src/store/hooks.ts
// Redux 工厂标准用法，简化 dispatch/select，避免类型重复，利于后期扩展
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./index";

// 统一类型的 dispatch，避免每个组件手写类型
export const useAppDispatch: () => AppDispatch = useDispatch;

// 统一类型的 selector，提升类型安全与自动补全
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
