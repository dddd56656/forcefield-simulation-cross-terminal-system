// src/store/index.ts
// 全局 Redux store 配置，标准大厂写法，支持中大型团队维护
import { configureStore } from "@reduxjs/toolkit";
import apodReducer from "./apodSlice";
import marsRoverReducer from "./marsRoverSlice";  // 路径和名称确认！
import asteroidReducer from "./asteroidSlice";  // 路径和名称确认！

// 你可后续扩展更多slice
export const store = configureStore({
    reducer: {
        apod: apodReducer,
        marsRover: marsRoverReducer, // 必须有这行
        asteroid: asteroidReducer,
        // user: userReducer,
        // ...更多slice
    },
    // 可加middleware，devtools配置等
});

// RootState 和 AppDispatch 类型导出，便于全项目类型推断
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
