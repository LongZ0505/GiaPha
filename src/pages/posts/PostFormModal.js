import React, { useState } from 'react';
// Import CSS, chúng ta sẽ dùng chung CSS của MemberFormModal
// hoặc bạn có thể tạo CSS riêng và import vào
import '../../components/genealogy/MemberFormModal.css'; 

const PostFormModal = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Vui lòng nhập cả tiêu đề và nội dung.');
      return;
    }
    onSubmit({ title, content });
    // Reset form
    setTitle('');
    setContent('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ width: '600px' }}> {/* Rộng hơn 1 chút */}
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3>Thêm bài viết mới</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tiêu đề:</label>
            <input 
              type="text" 
              name="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Nội dung:</label>
            <textarea 
              name="content"
              rows="10"
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-submit">
              Đăng bài
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostFormModal;