// layouts/MainLayout.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-1 flex flex-col min-h-0">
      {children}
    </main>
    <Footer />
  </div>
);

export default MainLayout;
