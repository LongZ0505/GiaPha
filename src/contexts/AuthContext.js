import React, { createContext, useState } from 'react';
// import { login as apiLogin, register as apiRegister } from '../api/authApi';

const AuthContext = createContext(null);

// --- Dữ liệu người dùng giả để test ---
// Bạn có thể chỉnh sửa thông tin này
const MOCK_USER = {
  id: 'user_test_01',
  userName: 'tester',
  email: 'test@example.com',
  hoTen: 'Người Dùng Test',
  // Thêm các quyền (roles) nếu bạn cần test chức năng admin
  // roles: ['ADMIN', 'USER'] 
};
// ------------------------------------


export const AuthProvider = ({ children }) => {
  // 1. Khởi tạo 'user' bằng MOCK_USER thay vì null
  const [user, setUser] = useState(MOCK_USER); 
  
  // 2. Khởi tạo 'loading' bằng false thay vì true
  const [loading, setLoading] = useState(false); 

  // 3. Vô hiệu hóa (comment out) useEffect kiểm tra localStorage
  // useEffect(() => {
  //   try {
  //     const storedUser = localStorage.getItem('user');
  //     if (storedUser) {
  //       setUser(JSON.parse(storedUser));
  //     }
  //   } catch (error) {
  //     console.error("Failed to load user from storage", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // 4. Giả lập các hàm login/register/logout (chỉ in ra console)
  const login = async (username, password) => {
    console.log("Đã gọi hàm login (mock):", username, password);
    // Không làm gì cả, vì đã login
    // Hoặc bạn có thể setUser(MOCK_USER) nếu logout đã set về null
  };

  const register = async (userData) => {
    console.log("Đã gọi hàm register (mock):", userData);
    // Không làm gì cả
  };

  const logout = () => {
    console.log("Đã gọi hàm logout (mock)");
    // Để test, chúng ta không set user về null
    // Nếu bạn muốn test luồng logout thật, hãy bật dòng dưới:
    // setUser(null); 
    // localStorage.removeItem('user');
  };

  const authValue = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authValue}>
      {/* 5. Bỏ check !loading vì loading luôn là false */}
      {children} 
    </AuthContext.Provider>
  );
};

export default AuthContext;