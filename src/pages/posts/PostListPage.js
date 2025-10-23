import React, { useState, useEffect } from 'react';
import { getPosts, createPost, deletePost } from '../../api/postApi';
import './PostListPage.css'; // Tạo file CSS này

const PostListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // TODO: Thêm state để quản lý form "Thêm bài viết"

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getPosts();
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
        await deletePost(postId);
        setPosts(posts.filter(p => p.id !== postId));
      } catch (err) {
        alert("Lỗi khi xóa bài viết.");
      }
    }
  };

  return (
    <div className="post-list-container">
      <h2>Bài viết của gia đình</h2>
      <button className="btn-add-post">Thêm bài viết</button>
      
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
    </div>
  );
};

export default PostListPage;