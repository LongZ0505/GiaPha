import React, { useState, useEffect } from 'react';
import { getConversations, getMessages, sendMessage } from '../../api/messageApi';
// import io from 'socket.io-client'; // Sẽ dùng khi kết nối WebSocket
import './ChatPage.css'; // Tạo file CSS này

// const socket = io('http://localhost:8080'); // Địa chỉ WebSocket server

const ChatPage = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  // const myUserId = useAuth().user.id; // Lấy ID người dùng hiện tại

  useEffect(() => {
    // Tải danh sách hội thoại
    getConversations().then(setConversations).catch(console.error);

    // Lắng nghe tin nhắn mới từ WebSocket
    // socket.on('receiveMessage', (message) => {
    //   if (message.conversationId === currentChat?.id) {
    //     setMessages(prev => [...prev, message]);
    //   }
    // });
    // return () => socket.off('receiveMessage');
  }, [currentChat]);

  const selectChat = (convo) => {
    setCurrentChat(convo);
    // Tải tin nhắn cũ
    getMessages(convo.id).then(setMessages).catch(console.error);
    // socket.emit('joinRoom', convo.id); // Tham gia phòng chat
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentChat) return;

    // Gửi qua API (hoặc WebSocket)
    // sendMessage(currentChat.id, newMessage).then(sentMessage => {
    //   setMessages(prev => [...prev, sentMessage]);
    //   setNewMessage('');
    // });
    
    // Gửi qua WebSocket
    // const messageData = { conversationId: currentChat.id, message: newMessage, senderId: myUserId };
    // socket.emit('sendMessage', messageData);
    // setMessages(prev => [...prev, messageData]); // Hiển thị ngay
    
    // Mockup gửi (xóa khi có API/Socket)
    console.log('Gửi:', newMessage);
    setMessages(prev => [...prev, { id: Date.now(), message: newMessage, senderId: 'myUserId' }]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <aside className="chat-sidebar">
        <h3>Thành viên</h3>
        <ul>
          {conversations.map(convo => (
            <li 
              key={convo.id} 
              onClick={() => selectChat(convo)}
              className={currentChat?.id === convo.id ? 'active' : ''}
            >
              {convo.name} {/* Giả sử convo có tên (Tấn Vinh, Thu Hương...) */}
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
            <div className="message-list">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`message-item ${msg.senderId === 'myUserId' ? 'sent' : 'received'}`}
                >
                  <p>{msg.message}</p>
                </div>
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