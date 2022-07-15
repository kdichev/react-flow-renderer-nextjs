import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";

const FlowChart = ({ ruleNodes, ruleLinks, onNodeClick }) => {
  const [nodes, _, onNodesChange] = useNodesState(ruleNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(ruleLinks);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      attributionPosition="top-right"
      onNodeClick={onNodeClick}
    >
      <MiniMap
        nodeStrokeColor={(n) => {
          if (n.style?.background) return n.style.background;
          if (n.type === "input") return "#0041d0";
          if (n.type === "output") return "#ff0072";
          if (n.type === "default") return "#1a192b";
          return "#eee";
        }}
        nodeColor={(n) => {
          if (n.style?.background) return n.style.background;
          return "#fff";
        }}
        nodeBorderRadius={2}
      />
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
};

export default FlowChart;
