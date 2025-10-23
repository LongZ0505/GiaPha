import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../api/authApi';
import './AuthPages.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await forgotPassword(email);
      setMessage('Đã gửi email khôi phục mật khẩu. Vui lòng kiểm tra hòm thư.');
    } catch (err) {
      setError('Email không tồn tại trong hệ thống.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Quên mật khẩu</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email: *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
        
        <button type="submit" className="btn-submit">Xác nhận</button>
        
        <div className="auth-links">
          <Link to="/login">Hủy</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;