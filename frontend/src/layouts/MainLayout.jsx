import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // 👉 เปลี่ยนจาก margin เป็น padding
  const sidebarPadding = isSidebarOpen ? "pl-64" : "pl-[4.5rem]";

  return (
    <div className="bg-gray-100 min-h-screen relative overflow-x-hidden">
      <Navbar onToggleSidebar={toggleSidebar} />

      <div className="flex pt-[64px]">
        <Sidebar isOpen={isSidebarOpen} />

        {/* CONTENT */}
        <div
          className={`flex flex-col flex-1 min-h-[calc(100vh-64px)] transition-all duration-300 ${sidebarPadding}`}
        >
          <main
            className={`
              flex-1 p-6 bg-gray-50 transition-all duration-300
              sm:opacity-100 sm:blur-0
              ${isSidebarOpen ? "opacity-20 blur-[2px]" : "opacity-100"}
            `}
          >
            <Outlet />
          </main>

          <Footer />
        </div>
      </div>

      {/* OVERLAY บังพื้นหลังให้มืดขึ้น (เฉพาะจอเล็ก) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 sm:hidden z-30 transition-opacity"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
