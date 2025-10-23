import React, { useState, useCallback } from 'react';
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';
import './GenealogyPage.css';
import MemberFormModal from '../../components/genealogy/MemberFormModal';
import RelationshipFormModal from '../../components/genealogy/RelationshipFormModal';
import homepageBg from '../../assets/homepage.jpg';
import { 
  addMember, 
  updateMember, 
  deleteMember,
  addRelationship,
  deleteRelationship
} from '../../api/genealogyApi';
// import { getGenealogyTree } from '../../api/genealogyApi'; 

// Dữ liệu mock (Giữ nguyên)
const initialNodes = [
  { id: 'A', type: 'default', data: { name: 'Ông A', sex: 'Nam', dob: '1940-01-01', dod: '2020-01-01' }, position: { x: 250, y: 5 } },
  { id: 'B', type: 'default', data: { name: 'Bà B', sex: 'Nữ', dob: '1943-06-08', dod: '2025-10-29' }, position: { x: 550, y: 5 } },
  { id: 'D', type: 'default', data: { name: 'Ông D', sex: 'Nam', dob: '1985-01-07', dod: '' }, position: { x: 400, y: 200 } },
  { id: 'E', type: 'default', data: { name: 'Bà E', sex: 'Nữ', dob: '2011-06-14', dod: '' }, position: { x: 400, y: 400 } },
];
const initialEdges = [
  { id: 'eA-B', source: 'A', target: 'B', label: 'vợ-chồng', type: 'step' },
  { id: 'eA-D', source: 'A', target: 'D', label: 'cha-con', type: 'step' },
  { id: 'eB-D', source: 'B', target: 'D', label: 'mẹ-con', type: 'step' },
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
  // CẬP NHẬT: Dùng mảng đã xử lý (processed)
  const [nodes, setNodes, onNodesChange] = useNodesState(processedInitialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(processedInitialEdges);
  
  // (State của modal giữ nguyên)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [currentNodeData, setCurrentNodeData] = useState(null);
  const [isRelationshipModalOpen, setIsRelationshipModalOpen] = useState(false);

  // (Các hàm mở/đóng modal giữ nguyên)
  const handleOpenRelationshipModal = () => setIsRelationshipModalOpen(true);
  const handleCloseRelationshipModal = () => setIsRelationshipModalOpen(false);

  // --- CẬP NHẬT: HÀM SUBMIT QUAN HỆ (THÊM STYLE) ---
  const handleRelationshipSubmit = async (sourceId, targetId, typeLabel) => {
    const apiType = relationshipTypeMap[typeLabel];
    if (!apiType) {
      alert('Loại quan hệ không hợp lệ!');
      return;
    }

    try {
      // const newEdgeDataFromApi = await addRelationship(sourceId, targetId, apiType);
      
      // ---- MOCK API ----
      const newEdgeData = {
        id: `e${sourceId}-${targetId}-${Math.random()}`,
        source: sourceId,
        target: targetId,
        label: typeLabel,
        type: 'step',
        style: getEdgeStyle(typeLabel) // <-- THÊM STYLE CHO CẠNH MỚI
      };
      
      setEdges((eds) => eds.concat(newEdgeData));
      
      // (Logic auto-layout giữ nguyên)
      const sourceNode = nodes.find(n => n.id === sourceId);
      if (!sourceNode) return; 

      let newPosition;
      if (typeLabel === 'vợ-chồng' || typeLabel === 'anh-em') {
        newPosition = { 
          x: sourceNode.position.x + HORIZONTAL_SPACING,
          y: sourceNode.position.y
        };
      } else if (typeLabel === 'cha-con' || typeLabel === 'mẹ-con') {
        newPosition = {
          x: sourceNode.position.x,
          y: sourceNode.position.y + VERTICAL_SPACING
        };
      }

      if (newPosition) {
        setNodes((nds) =>
          nds.map((node) =>
            node.id === targetId
              ? { ...node, position: newPosition, data: { ...node.data } }
              : node
          )
        );
      }
      // --- Hết logic auto-layout ---

      handleCloseRelationshipModal();
    } catch (error) {
      alert('Lỗi: Không thể tạo quan hệ.');
    }
  };
  
  // (Tất cả các hàm còn lại: onEdgeClick, handleDeleteEdge, handleOpenAddModal, onNodeClick, 
  // handleCloseMemberModal, handleMemberFormSubmit, handleDeleteNode đều giữ nguyên)
 
  const onEdgeClick = useCallback((event, edge) => {
    event.stopPropagation();
    if (window.confirm(`Bạn có chắc muốn xóa mối quan hệ "${edge.label}"?`)) {
      handleDeleteEdge(edge.id);
    }
  }, []);

  const handleDeleteEdge = async (edgeId) => {
    try {
      // await deleteRelationship(edgeId); 
      console.log('Đã xóa (mock) edge:', edgeId);
      setEdges((eds) => eds.filter((e) => e.id !== edgeId));
    } catch (error) {
      alert('Lỗi: Không thể xóa quan hệ.');
    }
  };

  const handleOpenAddModal = () => {
    setCurrentNodeData(null); 
    setIsMemberModalOpen(true);
  };

  const onNodeClick = useCallback((event, node) => {
    setCurrentNodeData({ id: node.id, ...node.data });
    setIsMemberModalOpen(true);
  }, []);

  const handleCloseMemberModal = () => {
    setIsMemberModalOpen(false);
    setCurrentNodeData(null);
  };

  const handleMemberFormSubmit = async (formData) => {
    if (formData.id) { // SỬA
      try {
        const updatedData = formData; // Mock
        
        setNodes((nds) =>
          nds.map((node) =>
            node.id === formData.id
              ? { ...node, data: { ...updatedData, label: formatNodeLabel(updatedData) } }
              : node
          )
        );
      } catch (error) {
        alert("Lỗi: Không thể cập nhật thành viên.");
      }
    } else { // THÊM
      try {
        const newData = { ...formData, id: `new_${Math.random()}` }; // Mock
        
        let newPosition = { x: 100, y: 100 };
        const lastNode = nodes.length > 0 ? nodes[nodes.length - 1] : null;
        
        if (lastNode) {
          newPosition = { 
            x: lastNode.position.x + HORIZONTAL_SPACING,
            y: lastNode.position.y
          };
        }
        
        const newNode = {
          id: newData.id,
          position: newPosition,
          data: { ...newData, label: formatNodeLabel(newData) },
        };
        setNodes((nds) => nds.concat(newNode));
      } catch (error) {
        alert("Lỗi: Không thể thêm thành viên.");
      }
    }
    handleCloseMemberModal();
  };

  const handleDeleteNode = async (nodeId) => {
    try {
      console.log('Đã xóa (mock) node:', nodeId); // Mock

      setNodes((nds) => nds.filter((n) => n.id !== nodeId));
      setEdges((eds) => eds.filter((e) => e.source !== nodeId && e.target !== nodeId));
      
      handleCloseMemberModal();
    } catch (error) {
      alert("Lỗi: Không thể xóa thành viên.");
    }
  };


  // (JSX và return giữ nguyên)
  return (
    
    <div className="genealogy-container" 
      style={{ backgroundImage: `url(${homepageBg})` }} >
      {/* Thanh công cụ */}
      <div className="toolbar" style={{ padding: '10px', background: '#f0f0f0', display: 'flex', gap: '10px' }}>
        <button onClick={handleOpenAddModal}>
          Thêm thành viên (Node)
        </button>
        <button onClick={handleOpenRelationshipModal}>
          Tạo quan hệ (Edge)
        </button>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick} 
        onEdgeClick={onEdgeClick} 
        onNodesChange={onNodesChange} 
        onEdgesChange={onEdgesChange} 
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
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