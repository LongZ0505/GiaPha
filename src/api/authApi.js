import apiClient from './apiConfig';

// Dựa trên UseCase Quản lý tài khoản [cite: 2]

export const login = async (usernameOrEmail, password) => {
  // Giao diện đăng nhập [cite: 7] yêu cầu Tên đăng nhập/Email và Mật khẩu
  try {
    // const response = await apiClient.post('/auth/login', { 
    //   username: usernameOrEmail, // Cần khớp với 'userName' hoặc 'email' trong CSDL [cite: 21]
    //   password: password, // Cần khớp với 'passWord' trong CSDL [cite: 21]
    // });
    return true;
    //return response.data; // Giả sử backend trả về { user, token }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.response?.data);
    throw error;
  }
};

export const register = async (userData) => {
  // Giao diện đăng ký  yêu cầu nhiều thông tin
  try {
    // userData nên là object: { hoTen, email, username, password, gioiTinh, ngaySinh }
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error("Lỗi đăng ký:", error.response?.data);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  // Giao diện quên mật khẩu 
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    console.error("Lỗi quên mật khẩu:", error.response?.data);
    throw error;
  }
};

// Thêm các hàm khác...
// changePassword, logout, grantPermission [cite: 2, 10, 11, 12]