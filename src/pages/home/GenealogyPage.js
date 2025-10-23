import React, { useState, useEffect } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import './GenealogyPage.css'; // CSS sẽ xử lý ảnh nền

// import { getGenealogyTree } from '../../api/genealogyApi'; // API bạn sẽ tạo

// Dữ liệu mock dựa trên giao diện 
// Backend của bạn cần trả về dữ liệu theo định dạng này
const initialNodes = [
  {
    id: 'A',
    type: 'default', // Bạn có thể tạo custom node
    data: { label: 'Ông A (Nam)\n1940-01-01\n2020-01-01' },
    position: { x: 250, y: 5 },
  },
  {
    id: 'B',
    type: 'default',
    data: { label: 'b (Nữ)\n1943-06-08\n2025-10-29' },
    position: { x: 550, y: 5 },
  },
  {
    id: 'D',
    type: 'default',
    data: { label: 'd (Nam)\n1985-01-07' },
    position: { x: 400, y: 200 },
  },
  {
    id: 'E',
    type: 'default',
    data: { label: 'e (Nữ)\n2011-06-14' },
    position: { x: 400, y: 400 },
  },
];
const initialEdges = [
  // Quan hệ Vợ-Chồng [cite: 31]
  { id: 'eA-B', source: 'A', target: 'B', label: 'vợ-chồng', type: 'step' },
  // Quan hệ Cha-Con [cite: 31]
  { id: 'eA-D', source: 'A', target: 'D', label: 'cha-con', type: 'step' },
  // Quan hệ Mẹ-Con [cite: 31]
  { id: 'eB-D', source: 'B', target: 'D', label: 'mẹ-con', type: 'step' },
  // Quan hệ Cha-Con
  { id: 'eD-E', source: 'D', target: 'E', label: 'cha-con', type: 'step' },
];

// Hàm trợ giúp (Giữ nguyên)
const formatNodeLabel = (data) => {
  let label = `${data.name} (${data.sex})`;
  if (data.dob) label += `\n${data.dob}`;
  if (data.dod) label += `\n${data.dod}`;
  return label;
};

// --- MỚI: HÀM TRỢ GIÚP LẤY MÀU SẮC CHO CẠNH (EDGE) ---
/**
 * Trả về đối tượng style cho cạnh dựa trên nhãn
 * @param {string} label - Nhãn của quan hệ (ví dụ: 'vợ-chồng')
 * @returns {object} - Đối tượng CSS style
 */
const getEdgeStyle = (label) => {
  const style = { strokeWidth: 2 }; // Làm cho đường kẻ dày hơn
  switch (label) {
    case 'vợ-chồng':
      style.stroke = 'red'; // Màu đỏ
      break;
    case 'cha-con':
    case 'mẹ-con':
      style.stroke = 'hotpink'; // Màu hồng
      break;
    case 'anh-em':
      style.stroke = 'blue'; // Màu xanh
      break;
    default:
      style.stroke = '#b1b1b7'; // Màu xám mặc định
  }
  return style;
};

// --- CẬP NHẬT: XỬ LÝ DỮ LIỆU BAN ĐẦU ---

// Chuyển đổi dữ liệu node mock
const processedInitialNodes = initialNodes.map(node => ({
  ...node,
  data: { 
    ...node.data,
    label: formatNodeLabel(node.data)
  }
}));

// Chuyển đổi dữ liệu edge mock (THÊM STYLE)
const processedInitialEdges = initialEdges.map(edge => ({
  ...edge,
  style: getEdgeStyle(edge.label) // Gán style dựa trên label
}));

// --- (Giữ nguyên) ---
const relationshipTypeMap = {
  'vợ-chồng': 'SOUSE',
  'cha-con': 'FATHER_SON',
  'mẹ-con': 'MOTHER_SON',
  'anh-em': 'BROTHER_SISTER',
};
const HORIZONTAL_SPACING = 300;
const VERTICAL_SPACING = 200;
// --- (Hết phần giữ nguyên) ---

const GenealogyPage = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // TODO: Gọi API để lấy dữ liệu cây gia phả thật
  //   const fetchTree = async () => {
  //     try {
  //       setLoading(true);
  //       const treeData = await getGenealogyTree(); // Hàm này từ genealogyApi.js
  //       // Chuyển đổi dữ liệu từ API (Nodes và Relations) [cite: 28, 30] 
  //       // sang định dạng nodes và edges của reactflow
  //       const { nodes, edges } = transformDataForReactFlow(treeData);
  //       setNodes(nodes);
  //       setEdges(edges);
  //     } catch (error) {
  //       console.error("Lỗi tải cây gia phả:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   
  //   fetchTree();
  // }, []);

  return (
    <div style={{ height: 'calc(100vh - 60px)' }}> {/* Giả sử navbar cao 60px */}
      {/* Thêm các thanh công cụ "Thêm thành viên", "Xóa thành viên", "Tạo quan hệ"
        dựa trên giao diện  ở đây.
        Các nút này sẽ gọi hàm từ 'genealogyApi.js'
      */}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background gap={16} />
      </ReactFlow>

      {/* Modal Thêm/Sửa Thành viên (Cũ) */}
      <MemberFormModal
        isOpen={isMemberModalOpen}
        onClose={handleCloseMemberModal}
        onSubmit={handleMemberFormSubmit}
        onDelete={handleDeleteNode}
        initialData={currentNodeData}
      />

      {/* Modal Thêm Quan hệ (Mới) */}
      <RelationshipFormModal
        isOpen={isRelationshipModalOpen}
        onClose={handleCloseRelationshipModal}
        onSubmit={handleRelationshipSubmit}
        nodes={nodes}
      />
    </div>
  );
};

export default GenealogyPage;
