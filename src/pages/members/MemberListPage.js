import React, { useState, useEffect } from 'react';
import { getMembersList } from '../../api/genealogyApi';
import './MemberListPage.css'; // Tạo file CSS này

const MemberListPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await getMembersList();
        setMembers(data);
      } catch (err) {
        setError('Không thể tải danh sách thành viên.');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) return <div>Đang tải...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="member-list-container">
      <h2>Danh sách thành viên</h2>
      <table className="member-table">
        <thead>
          <tr>
            <th>THẾ HỆ</th>
            <th>HỌ TÊN</th>
            <th>GIỚI TÍNH</th>
            <th>NGÀY SINH</th>
            <th>NGÀY MẤT</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.generation}</td>
              <td>{member.name}</td>
              <td>{member.sex ? 'Nam' : 'Nữ'}</td> {/* Giả sử CSDL lưu Nam=true/1, Nữ=false/0 */}
              <td>{member.dob}</td>
              <td>{member.dod || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberListPage;