import React, { useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';
import './GenealogyPage.css'; // CSS sẽ xử lý ảnh nền

// Dữ liệu mẫu
const initialNodes = [
  { id: 'A', data: { label: 'Ông A (Nam)\n1940–2020' }, position: { x: 250, y: 5 } },
  { id: 'B', data: { label: 'Bà B (Nữ)\n1943–2025' }, position: { x: 550, y: 5 } },
  { id: 'D', data: { label: 'Con D (Nam)\n1985–' }, position: { x: 400, y: 200 } },
  { id: 'E', data: { label: 'Cháu E (Nữ)\n2011–' }, position: { x: 400, y: 400 } },
];

const initialEdges = [
  { id: 'A-B', source: 'A', target: 'B', label: 'Vợ–Chồng', type: 'step' },
  { id: 'A-D', source: 'A', target: 'D', label: 'Cha–Con', type: 'step' },
  { id: 'B-D', source: 'B', target: 'D', label: 'Mẹ–Con', type: 'step' },
  { id: 'D-E', source: 'D', target: 'E', label: 'Cha–Con', type: 'step' },
];

const GenealogyPage = () => {
  const [nodes] = useState(initialNodes);
  const [edges] = useState(initialEdges);

  return (
    <div className="genealogy-container">
      <div className="genealogy-overlay" />
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </div>
  );
};

export default GenealogyPage;
