// /src/pages/Login.tsx
import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";  // 导入supabase实例

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("正在登录...");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage("登录失败：" + error.message);
    } else {
      setMessage("登录成功！");
      // 登录成功后可以跳转到首页
      window.location.href = "/";
    }
  };

  return (
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">登录</h2>
      <input
        className="border px-3 py-2 mb-3 w-full rounded"
        type="email"
        placeholder="请输入邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        className="border px-3 py-2 mb-3 w-full rounded"
        type="password"
        placeholder="请输入密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700">
        登录
      </button>
      {message && <div className="mt-3 text-sm text-blue-700">{message}</div>}
    </form>
  );
};

export default Login;
