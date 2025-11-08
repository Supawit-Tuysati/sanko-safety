import {
  HomeIcon,
  PlusCircleIcon,
  UserPlusIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  MapIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const [width, setWidth] = useState("16rem");
  const location = useLocation();

  useEffect(() => {
    setWidth(isOpen ? "16rem" : "4.5rem");
  }, [isOpen]);

  const sections = [
    {
      label: "ทั่วไป",
      items: [{ icon: HomeIcon, label: "Dashboard", path: "/" }],
    },
    {
      label: "การตรวจเช็ก",
      items: [
        { icon: ClipboardDocumentCheckIcon, label: "ตรวจเช็กประจำเดือน", path: "/monthly-check" },
        { icon: MapIcon, label: "แผนผังโรงงาน", path: "/factory-map" },
      ],
    },
    {
      label: "การจัดการข้อมูล",
      items: [
        { icon: PlusCircleIcon, label: "เพิ่มถังดับเพลิง", path: "/extinguisher" },
        { icon: UserPlusIcon, label: "เพิ่มผู้ใช้งาน", path: "/users" },
      ],
    },
    {
      label: "ระบบ",
      items: [
        { icon: DocumentTextIcon, label: "Logs", path: "/logs" },
        { icon: Cog6ToothIcon, label: "ตั้งค่า", path: "/settings" },
      ],
    },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-40 bg-white shadow-lg transition-[width] duration-300 ease-in-out
        h-screen flex flex-col`}
      style={{ width }}
    >
      {/* ช่องว่างด้านบนสำหรับ Navbar */}
      <div className="h-[64px] flex-shrink-0"></div>

      <ul className="space-y-2 p-4 flex-1 overflow-y-auto">
        {sections.map((section, sIdx) => (
          <div key={sIdx}>
            {isOpen && (
              <div className="text-xs text-gray-500 font-semibold uppercase mb-1 px-2 pt-2">
                {section.label}
              </div>
            )}

            {section.items.map((item, idx) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={idx} to={item.path}>
                  <li
                    className={`flex items-center gap-3 p-2 rounded cursor-pointer transition
                    ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-blue-50 text-gray-800"}`}
                  >
                    <Icon className={`h-6 w-6 flex-shrink-0 ${isActive ? "text-blue-600" : "text-gray-700"}`} />
                    <span
                      className={`whitespace-nowrap transition-all duration-300 ${
                        isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                    >
                      {item.label}
                    </span>
                  </li>
                </Link>
              );
            })}
          </div>
        ))}
      </ul>
    </aside>
  );
}
