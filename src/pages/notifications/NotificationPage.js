import React, { useState, useEffect } from 'react';
import { getNotifications } from '../../api/messageApi';
import './NotificationPage.css'; // Tạo file CSS này

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getNotifications()
      .then(setNotifications)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="notification-container">
      <h2>🔔 Thông báo</h2>
      {loading ? (
        <p>Đang tải thông báo...</p>
      ) : (
        <ul className="notification-list">
          {notifications.map(notif => (
            <li key={notif.id}>
              <p>{notif.message}</p>
              <span className="notif-date">
                {new Date(notif.createdAt).toLocaleString('vi-VN')}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationPage;