// App.tsx
import React from "react";
import AppRoutes from "./routes/AppRoutes";

// 如果有全局状态管理/主题/i18n等，可以按需引入
// import { Provider } from "react-redux";
// import store from "./store";
// import { ThemeProvider } from "styled-components";
// import { I18nextProvider } from "react-i18next";
// import i18n from "./i18n";

/**
 * App 应用顶层组件
 * - 仅负责包裹全局Provider（如Redux/Theme/i18n）
 * - 渲染全局路由组件AppRoutes
 * - 不写具体业务逻辑或页面内容
 */
const App: React.FC = () => {
  return (
    // 如有全局Provider，按需嵌套包裹即可
    // <Provider store={store}>
    //   <ThemeProvider theme={theme}>
    //     <I18nextProvider i18n={i18n}>
          <AppRoutes />
    //     </I18nextProvider>
    //   </ThemeProvider>
    // </Provider>
  );
};

export default App;
