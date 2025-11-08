import { useNavigate } from "react-router-dom";
import { Bars3Icon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow px-4 py-4 flex justify-between items-center z-50">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded hover:bg-gray-100 transition"
        >
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>
        <h1 className="text-lg font-bold text-blue-800">SANKO SAFETY</h1>
      </div>

      <button
        onClick={handleLogout}
        className="p-2 rounded hover:bg-gray-100 transition"
        title="Logout"
      >
        <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-500 hover:text-red-600" />
      </button>
    </nav>
  );
}
