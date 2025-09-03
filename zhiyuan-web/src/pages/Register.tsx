// /src/pages/Register.tsx
import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";  // 导入supabase实例

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("正在注册...");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setMessage("注册失败：" + error.message);
    } else {
      setMessage("注册成功，请前往邮箱查收验证邮件！");
    }
  };

  return (
    <form onSubmit={handleRegister} className="max-w-sm mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">注册新账号</h2>
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
        minLength={6}
      />
      <button type="submit" className="w-full bg-blue-600 text-white rounded py-2 hover:bg-blue-700">
        注册
      </button>
      {message && <div className="mt-3 text-sm text-blue-700">{message}</div>}
    </form>
  );
};

export default Register;
