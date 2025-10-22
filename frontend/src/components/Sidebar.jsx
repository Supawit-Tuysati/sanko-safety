export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-lg h-auto min-h-full p-4">
      <ul className="space-y-2">
        <li className="p-2 hover:bg-blue-100 rounded cursor-pointer">🏠 Dashboard</li>
        <li className="p-2 hover:bg-blue-100 rounded cursor-pointer">📄 รายงาน</li>
        <li className="p-2 hover:bg-blue-100 rounded cursor-pointer">⚙️ ตั้งค่า</li>
      </ul>
    </aside>
  );
}
