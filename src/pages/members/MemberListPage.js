import React, { useState, useEffect } from 'react';
// import { getMembersList } from '../../api/genealogyApi'; // Tạm thời tắt API
import './MemberListPage.css';

// --- THÊM DỮ LIỆU DEMO ---
const DEMO_MEMBERS = [
  { id: 'm1', generation: 1, name: 'Nguyễn Văn An', sex: true, dob: '1940-01-01', dod: '2020-01-01' },
  { id: 'm2', generation: 1, name: 'Trần Thị Bình', sex: false, dob: '1943-06-08', dod: null },
  { id: 'm3', generation: 2, name: 'Nguyễn Văn Cường', sex: true, dob: '1985-01-07', dod: null },
  { id: 'm4', generation: 3, name: 'Nguyễn Thị Dung', sex: false, dob: '2011-06-14', dod: null },
  { id: 'm5', generation: 2, name: 'Nguyễn Văn Em', sex: true, dob: '1988-10-20', dod: null },
];
// -------------------------


const MemberListPage = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        // const data = await getMembersList(); // 1. Tạm thời tắt API thật
        
        // 2. Giả lập API trả về sau 1 giây và dùng data demo
        setTimeout(() => {
          setMembers(DEMO_MEMBERS);
          setLoading(false);
        }, 1000); // 1000ms = 1 giây

      } catch (err) {
        setError('Không thể tải danh sách thành viên.');
        setLoading(false); // Đảm bảo tắt loading kể cả khi lỗi
      }
      // finally { // 3. Tắt 'finally' vì chúng ta xử lý trong setTimeout
      //   setLoading(false);
      // }
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
              <td>{member.sex ? 'Nam' : 'Nữ'}</td> {/* Nam=true, Nữ=false */}
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