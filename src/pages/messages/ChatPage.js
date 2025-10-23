import React, { useState, useEffect, useRef } from 'react';
// import { getConversations, getMessages, sendMessage } from '../../api/messageApi';
import useAuth from '../../hooks/useAuth'; // <-- 1. Import useAuth
import './ChatPage.css'; // Đảm bảo bạn đang dùng CSS đẹp (có avatar)

// const socket = io('http://localhost:8080');

// --- THÊM DỮ LIỆU DEMO ---
const DEMO_CONVERSATIONS = [
  { id: 'c1', name: 'Nguyễn Văn An', lastMessage: 'Bạn có ở đó không?', avatar: null },
  { id: 'c2', name: 'Trần Thị Bình', lastMessage: 'Ok, đã nhận được.', avatar: null },
  { id: 'c3', name: 'Admin', lastMessage: 'Chào mừng bạn!', avatar: null },
];

const DEMO_MESSAGES = {
  'c1': [
    { id: 'm1_1', message: 'Chào bạn, khoẻ không?', senderId: 'user_an' },
    { id: 'm1_2', message: 'Tôi khoẻ, cảm ơn bạn. Bạn có ở đó không?', senderId: 'user_an' },
  ],
  'c2': [
    { id: 'm2_1', message: 'Tôi đã gửi tài liệu rồi nhé.', senderId: 'myUserId' }, // Tin nhắn của bạn
    { id: 'm2_2', message: 'Ok, đã nhận được.', senderId: 'user_binh' },
  ],
  'c3': [
     { id: 'm3_1', message: 'Chào mừng bạn đến với hệ thống!', senderId: 'user_admin' },
  ]
};
// -------------------------

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  // 2. Lấy user ID từ context
  const { user } = useAuth(); 
  const myUserId = user.id; // ID này là 'user_test_01' từ AuthContext
  
  // Ref để tự động cuộn
  const messageListRef = useRef(null);

  useEffect(() => {
    // Tải danh sách hội thoại demo
    // getConversations().then(setConversations).catch(console.error);
    setTimeout(() => {
      setConversations(DEMO_CONVERSATIONS);
    }, 500); // Giả lập tải
    
    // (Phần socket.io giữ nguyên)
  }, []);

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const selectChat = (convo) => {
    setCurrentChat(convo);
    // Tải tin nhắn cũ demo
    // getMessages(convo.id).then(setMessages).catch(console.error);
    
    // Thay thế 'myUserId' trong mảng demo bằng ID thật của bạn
    const chatMessages = (DEMO_MESSAGES[convo.id] || []).map(msg => ({
      ...msg,
      senderId: msg.senderId === 'myUserId' ? myUserId : msg.senderId
    }));
    setMessages(chatMessages);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    // Mockup gửi (xóa khi có API/Socket)
    const messageData = { 
      id: Date.now(), 
      message: newMessage, 
      senderId: myUserId // Sử dụng ID thật
    };
    
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <aside className="chat-sidebar">
        <h3>Thành viên</h3>
        {/* --- 3. CẬP NHẬT JSX CHO SIDEBAR --- */}
        <ul>
          {conversations.map(convo => (
            <li 
              key={convo.id} 
              onClick={() => selectChat(convo)}
              className={currentChat?.id === convo.id ? 'active' : ''}
            >
              {/* Thêm Avatar (bạn có thể thay bằng <img>) */}
              <div className="sidebar-avatar"></div>
              
              {/* Bọc text trong div này */}
              <div className="sidebar-info">
                <div className="name">{convo.name}</div>
                <div className="last-message">
                  {convo.lastMessage || "Bắt đầu trò chuyện..."}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      <section className="chat-main">
        {currentChat ? (
          <>
            <header className="chat-header">
              <h4>{currentChat.name}</h4>
              {/* Thêm icon call/video */}
            </header>
            {/* --- 4. CẬP NHẬT JSX CHO KHUNG CHAT --- */}
            <div className="message-list" ref={messageListRef}>
              {messages.map(msg => (
                msg.senderId === myUserId ? (
                  // Tin nhắn GỬI (sent)
                  <div key={msg.id} className="message-item sent">
                    <p>{msg.message}</p>
                  </div>
                ) : (
                  // Tin nhắn NHẬN (received)
                  <div key={msg.id} className="message-received-wrapper">
                    {/* Thêm Avatar (bạn có thể thay bằng <img>) */}
                    <div className="message-avatar"></div>
                    
                    <div className="message-item received">
                      <p>{msg.message}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
            <form className="message-input" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                placeholder="Nhập tin nhắn..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Gửi</button>
            </form>
          </>
        ) : (
          <div className="chat-empty">Chọn một người để bắt đầu trò chuyện.</div>
        )}
      </section>
    </div>
  );
};
  
export default ChatPage;