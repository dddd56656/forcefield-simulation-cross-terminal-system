// /src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { Link } from "react-router-dom";  // 导入 Link 用于跳转

/**
 * 首页组件
 * - 判断用户是否登录
 * - 如果已登录，显示用户名
 * - 如果未登录，显示登录和注册链接
 */
const Home: React.FC = () => {
  // 声明用户状态
  const [user, setUser] = useState<any>(null);

  // 在页面加载时检查当前用户
  useEffect(() => {
    const fetchUser = async () => {
      // 获取当前用户信息
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">首页</h2>
      
      {/* 如果用户已登录，显示欢迎信息 */}
      {user ? (
        <div>
          <span className="text-green-600">欢迎，{user.email}</span> {/* 欢迎信息 */}
        </div>
      ) : (
        // 用户未登录时，显示登录和注册链接
        <div>
          <span>请登录。</span>
          {/* 用Link标签跳转到登录页面，link里加tailwind样式 */}
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-800 ml-2 font-semibold"
          >
            登录
          </Link>
          {/* 用Link标签跳转到注册页面，link里加tailwind样式 */}
          <span className="mx-2">或</span>
          <Link
            to="/register"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            注册
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
