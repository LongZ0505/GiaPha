import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
// CSS file (tự tạo) để style giống mockup [cite: 7]
import './AuthPages.css'; 

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      navigate('/'); // Chuyển về trang chủ sau khi đăng nhập
    } catch (err) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Đăng nhập [Cặc]</h2>
        
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập/Email: *</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Mật khẩu: *</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {error && <p className="error-message">{error}</p>}
        
        <button type="submit" className="btn-submit">Đăng nhập</button>
        
        <div className="auth-links">
          <Link to="/register">Đăng ký</Link>
          <Link to="/forgot-password">Quên mật khẩu?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;