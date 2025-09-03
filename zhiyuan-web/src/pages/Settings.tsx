// pages/Settings.tsx
import React from "react";

/**
 * 设置页 Settings
 * - 作为 /settings 路由的主内容区
 * - 仅负责右侧内容展示，不包含布局或侧边栏
 * - 可根据实际业务扩展表单、开关、卡片等内容
 */
const Settings: React.FC = () => (
  <div>
    <h2 className="text-xl font-bold mb-3">设置</h2>
    <div className="bg-white rounded shadow p-6 max-w-xl">
      <h3 className="text-lg font-semibold mb-2">个人信息</h3>
      <p className="mb-4 text-gray-600">
        在这里你可以更新你的账号设置和个人信息。
      </p>
      {/* 示例：设置项 */}
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            昵称
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="请输入昵称"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            邮箱
          </label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2"
            type="email"
            placeholder="请输入邮箱"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          保存设置
        </button>
      </form>
    </div>
  </div>
);

export default Settings;
