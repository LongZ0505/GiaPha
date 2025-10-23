import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

// Import Layouts
import MainLayout from '../components/layout/MainLayout'; // <-- Import Layout
// import AuthLayout from '../components/layout/AuthLayout'; // (Tùy chọn)

// Import Pages
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage'; // <-- Trang mới
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'; // <-- Trang mới
import GenealogyPage from '../pages/home/GenealogyPage';
import MemberListPage from '../pages/members/MemberListPage'; // <-- Trang mới
import PostListPage from '../pages/posts/PostListPage'; // <-- Trang mới
import ChatPage from '../pages/messages/ChatPage'; // <-- Trang mới
import NotificationPage from '../pages/notifications/NotificationPage'; // <-- Trang mới

// Component PrivateRoute
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Các trang không cần layout (Xác thực) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Các trang cần đăng nhập và có layout chung */}
        <Route 
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<GenealogyPage />} />
          <Route path="/members" element={<MemberListPage />} />
          <Route path="/posts" element={<PostListPage />} />
          <Route path="/messages" element={<ChatPage />} />
          <Route path="/notifications" element={<NotificationPage />} />
        </Route>
        
        {/* Trang mặc định */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;