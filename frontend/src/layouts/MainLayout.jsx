import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false); // 👈 เพิ่มฟังก์ชันปิด

  const sidebarMargin = isSidebarOpen ? "ml-64" : "ml-[4.5rem]";

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="flex pt-[64px]">
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} /> {/* 👈 ส่งไป */}
        <div
          className={`flex flex-col flex-1 min-h-[calc(100vh-64px)] transition-all duration-300 ${sidebarMargin} max-sm:ml-0`}
        >
          <main className="flex-1 p-6 bg-gray-50">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
