import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    const isAuthenticated = localStorage.getItem("token");
    if (isAuthenticated) {
      navigate("/"); // 🔐 กลับ Dashboard
    } else {
      navigate("/login"); // 🔑 ไปหน้า login
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-700">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">ขออภัย ไม่พบหน้าที่คุณต้องการ</p>

      <button
        onClick={handleGoHome}
        className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
      >
        กลับหน้าแรก
      </button>
    </div>
  );
}
