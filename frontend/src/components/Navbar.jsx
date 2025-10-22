import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🧼 ลบ token ที่เคยเก็บไว้
    localStorage.removeItem("token");

    // 🔐 เปลี่ยนหน้าไป login
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800">🏃‍♂️ Sanko Safety</h1>
      <button
        onClick={handleLogout}
        className="text-red-500 hover:text-red-600 font-medium"
      >
        ออกจากระบบ
      </button>
    </nav>
  );
}
