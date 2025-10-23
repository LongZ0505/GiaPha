import React, { useState, useEffect } from 'react';
import { getPosts, createPost, deletePost } from '../../api/postApi';
import useAuth from '../../hooks/useAuth'; // <-- 1. Import useAuth
import PostFormModal from './PostFormModal'; // <-- 2. Import Modal
import './PostListPage.css';

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 3. Thêm state quản lý modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth(); // Lấy thông tin người dùng đang đăng nhập

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        // const data = await getPosts(); // API thật
        
        // --- MOCK DATA (Vì API chưa chạy) ---
        const data = [
          { id: 'p1', title: 'Chào mừng gia đình', content: 'Đây là bài viết đầu tiên.', authorName: 'Admin', createdAt: new Date().toISOString() },
          { id: 'p2', title: 'Thông báo họp họ', content: 'Chủ nhật tuần này họp họ nhé...', authorName: 'Trưởng tộc', createdAt: new Date().toISOString() },
        ];
        // --- Hết MOCK DATA ---
        
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    if (window.confirm("Bạn có chắc muốn xóa bài viết này?")) {
      try {
        // await deletePost(postId); // API thật
        
        // Mock
        setPosts(posts.filter(p => p.id !== postId));
      } catch (err) {
        alert("Lỗi khi xóa bài viết.");
      }
    }
  };

  // 4. Hàm xử lý submit form
  const handleCreatePost = async (postData) => {
    try {
      // const newPost = await createPost(postData); // API thật
      
      // --- MOCK API (Vì chưa có API thật) ---
      const newPost = {
        ...postData,
        id: `p_${Math.random()}`,
        authorName: user.hoTen, // Lấy tên từ AuthContext
        createdAt: new Date().toISOString(),
      };
      // --- Hết MOCK API ---
      
      setPosts([newPost, ...posts]); // Thêm bài viết mới lên đầu danh sách
      setIsModalOpen(false); // Đóng modal
    } catch (err) {
      alert("Lỗi khi tạo bài viết.");
    }
  };

  return (
    <div className="post-list-container">
      <h2>Bài viết của gia đình</h2>
      {/* 5. Cập nhật nút bấm */}
      <button className="btn-add-post" onClick={() => setIsModalOpen(true)}>
        Thêm bài viết
      </button>
      
      <div className="posts">
        {loading && <p>Đang tải bài viết...</p>}
        {posts.map(post => (
          <article key={post.id} className="post-item">
            <div className="post-header">
              <h3>{post.title}</h3>
              <div className="post-actions">
                <button className="btn-edit">✏️</button>
                <button className="btn-delete" onClick={() => handleDelete(post.id)}>🗑️</button>
              </div>
            </div>
            <p>{post.content}</p>
            <footer className="post-footer">
              <span>Đăng bởi: {post.authorName}</span>
              <span>Ngày: {new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
            </footer>
          </article>
        ))}
      </div>

      {/* 6. Thêm Modal vào */}
      <PostFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  );
};

export default PostListPage;