import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './AuthPages.css'; // Dùng chung CSS

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
    setFormData(prev => ({ ...prev, [name]: value }));
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
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Form đăng ký</h2>
        
        <div className="form-group">
          <label>Họ và tên</label>
          <input type="text" name="hoTen" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
        
        <div className="form-group form-group-gender">
          <label>Giới tính:</label>
          <input type="radio" id="nam" name="gioiTinh" value="Nam" checked={formData.gioiTinh === 'Nam'} onChange={handleChange} />
          <label htmlFor="nam">Nam</label>
          <input type="radio" id="nu" name="gioiTinh" value="Nữ" checked={formData.gioiTinh === 'Nữ'} onChange={handleChange} />
          <label htmlFor="nu">Nữ</label>
        </div>
        
        <div className="form-group">
          <label>Ngày sinh</label>
          <input type="date" name="ngaySinh" onChange={handleChange} />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="btn-submit">Xác nhận</button>
        <div className="auth-links">
          <Link to="/login">Quay lại Đăng nhập</Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;