import apiClient from './apiConfig';

// === API cho trang Gia Phả (GenealogyPage) ===

// Lấy toàn bộ cây (nodes và edges)
export const getGenealogyTree = async () => {
  try {
    // Giả sử API trả về 2 mảng: nodes (User_Node) và relations
    const response = await apiClient.get('/genealogy/tree');
    return response.data; 
  } catch (error) {
    console.error("Lỗi tải cây gia phả:", error.response?.data);
    throw error;
  }
};

// Thêm thành viên mới (dựa trên source 14)
export const addMember = async (memberData) => {
  // memberData: { ten, namSinh, mat, gioiTinh, ... }
  try {
    const response = await apiClient.post('/genealogy/member', memberData);
    return response.data; // Trả về node mới
  } catch (error) {
    console.error("Lỗi thêm thành viên:", error.response?.data);
    throw error;
  }
};

// Tạo quan hệ (dựa trên source 14)
export const addRelationship = async (sourceId, targetId, relationType) => {
  // relationType: 'Cha-con', 'Mẹ-con', 'Vợ-Chồng'
  try {
    const response = await apiClient.post('/genealogy/relationship', {
      fromNodeId: sourceId,
      toNodeId: targetId,
      type: relationType,
    });
    return response.data; // Trả về edge mới
  } catch (error) {
    console.error("Lỗi tạo quan hệ:", error.response?.data);
    throw error;
  }
};

// === API cho trang Thành Viên (MemberListPage) ===

// Lấy danh sách thành viên dạng bảng (dựa trên source 15)
export const getMembersList = async () => {
  try {
    const response = await apiClient.get('/genealogy/members');
    return response.data; // Giả sử trả về mảng [ { theHe, hoTen, gioiTinh, ... } ]
  } catch (error) {
    console.error("Lỗi tải danh sách thành viên:", error.response?.data);
    throw error;
  }
};