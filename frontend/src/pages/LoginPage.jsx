import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      login(response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
  <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8 border border-gray-100">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
      เข้าสู่ระบบ
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          อีเมล
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="กรอกอีเมลของคุณ"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          รหัสผ่าน
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="กรอกรหัสผ่าน"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300 shadow-sm"
      >
        เข้าสู่ระบบ
      </button>
    </form>

    <div className="text-center mt-4">
      <p className="text-gray-600 text-sm">
        ยังไม่มีบัญชี?{" "}
        <button
          onClick={() => navigate("/register")}
          className="text-blue-600 hover:underline font-medium"
        >
          สมัครสมาชิก
        </button>
      </p>
    </div>
  </div>
</div>

  );
}
