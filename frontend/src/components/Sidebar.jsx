import {
  HomeIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Sidebar({ isOpen }) {
  const [width, setWidth] = useState("16rem");

  useEffect(() => {
    setWidth(isOpen ? "16rem" : "4.5rem");
  }, [isOpen]);

  const sections = [
    {
      label: "ทั่วไป",
      items: [
        { icon: HomeIcon, label: "Dashboard" },
        { icon: ChartBarIcon, label: "รายงานสรุป" },
      ],
    },
    {
      label: "การจัดการ",
      items: [
        { icon: UserGroupIcon, label: "ลูกค้า" },
        { icon: BuildingOfficeIcon, label: "โครงการ" },
        { icon: FolderOpenIcon, label: "เอกสาร" },
      ],
    },
    {
      label: "ระบบ",
      items: [
        { icon: DocumentTextIcon, label: "Logs" },
        { icon: Cog6ToothIcon, label: "ตั้งค่า" },
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
              return (
                <li
                  key={idx}
                  className="flex items-center gap-3 p-2 hover:bg-blue-100 rounded cursor-pointer transition"
                >
                  <Icon className="h-6 w-6 text-gray-700 flex-shrink-0" />
                  <span
                    className={`text-gray-800 font-medium whitespace-nowrap transition-all duration-300 ${
                      isOpen
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-4"
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              );
            })}
          </div>
        ))}
      </ul>
    </aside>
  );
}
