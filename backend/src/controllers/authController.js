import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabaseClient.js';

const JWT_SECRET = process.env.JWT_SECRET;

// 📝 REGISTER
export const registerUser = async (req, res) => {
  console.log("📝 Register:", req.body);
  
  try {
    const { email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password: hashed, created_by: 0 }])
      .select();

    if (error) throw error;

    res.json({ message: 'สมัครสำเร็จ ✅', user: data[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔐 LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .limit(1);

    if (error) throw error;
    if (users.length === 0) return res.status(401).json({ error: 'ไม่พบผู้ใช้' });

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'รหัสผ่านไม่ถูกต้อง' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    res.json({ message: 'เข้าสู่ระบบสำเร็จ ✅', token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🙋 PROFILE
export const getProfile = async (req, res) => {
  try {
    const { id } = req.user; // ได้จาก middleware
    const { data: users, error } = await supabase
      .from('users')
      .select('id, email')
      .eq('id', id)
      .limit(1);

    if (error) throw error;
    res.json({ user: users[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
