import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './AuthPages.css'; // Dùng chung CSS
import Lottie from 'lottie-react';
import dragonAnim from '../../assets/dragon.json';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    hoTen: '',
    email: '',
    username: '',
    password: '',
    gioiTinh: 'Nam',
    ngaySinh: '',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
      navigate('/'); // Chuyển về trang chủ sau khi đăng ký
    } catch (err) {
      setError('Đăng ký không thành công. Vui lòng thử lại.');
    }
  };

  return (
    <div className="auth-container">
      {/* 🐉 Rồng bay động nền */}
      <Lottie animationData={dragonAnim} loop={true} className="auth-dragon" />

      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Đăng ký tài khoản</h2>

        <div className="form-group">
          <label>Họ và tên</label>
          <input
            type="text"
            name="hoTen"
            value={formData.hoTen}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Tên đăng nhập</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group form-group-gender">
          <label>Giới tính:</label>
          <input
            type="radio"
            id="nam"
            name="gioiTinh"
            value="Nam"
            checked={formData.gioiTinh === 'Nam'}
            onChange={handleChange}
          />
          <label htmlFor="nam">Nam</label>

          <input
            type="radio"
            id="nu"
            name="gioiTinh"
            value="Nữ"
            checked={formData.gioiTinh === 'Nữ'}
            onChange={handleChange}
          />
          <label htmlFor="nu">Nữ</label>
        </div>

        <div className="form-group">
          <label>Ngày sinh</label>
          <input
            type="date"
            name="ngaySinh"
            value={formData.ngaySinh}
            onChange={handleChange}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-submit">
          Xác nhận
        </button>

        <div className="auth-links">
          <Link to="/login">Quay lại đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
