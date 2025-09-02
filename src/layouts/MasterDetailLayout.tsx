// layouts/MasterDetailLayout.tsx
import Sidebar from "../components/Sidebar";

const MasterDetailLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-row flex-1 min-h-0 h-full">
    {/* Sidebar灰色到底，w-60宽度 */}
    <aside className="w-60 h-full bg-gray-100 flex-shrink-0">
      <Sidebar />
    </aside>
    {/* 右侧内容区 */}
    <section className="flex-1 min-h-0 overflow-auto p-6 bg-white">
      {children}
    </section>
  </div>
);

export default MasterDetailLayout;
