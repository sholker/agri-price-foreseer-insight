import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  Node,
  Edge,
  NodeTypes,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Database, BarChart3, Brain, CheckCircle, ChevronRight, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Interface for the data structure of our custom node
interface MethodologyNodeData {
  label: string;
  description: string;
  details: string[];
  icon: React.ComponentType<any>;
  isExpanded: boolean;
  children?: string[]; // Optional: IDs of child nodes
  childEdges?: string[]; // Optional: IDs of edges connecting children
}

// Custom Node Component
const MethodologyNode = ({ data }: { data: MethodologyNodeData }) => {
  const Icon = data.icon;
  const isParent = data.children && data.children.length > 0;
  
  return (
    <Card className="p-4 w-[350px] bg-gradient-card shadow-space border border-primary/20 backdrop-blur-sm transition-all duration-300">
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground">{data.label}</h3>
        </div>
        {isParent && (
          <div className="text-muted-foreground">
            {data.isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
        )}
      </div>
      
      {(data.isExpanded && (data.description || data.details.length > 0)) && (
        <div className="space-y-3 mt-4 animate-fade-in">
          {data.description && <p className="text-sm text-muted-foreground leading-relaxed">{data.description}</p>}
          {data.details.length > 0 && <div className="space-y-2">
            {data.details.map((detail, index) => (
              <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <span>{detail}</span>
              </div>
            ))}
          </div>}
        </div>
      )}
    </Card>
  );
};

// Register the custom node type
const nodeTypes: NodeTypes = {
  methodology: MethodologyNode,
};

// Define initial nodes for the new hierarchical flowchart
const initialNodes: Node<MethodologyNodeData>[] = [
  // --- Parent Nodes ---
  {
    id: 'pre-processing',
    type: 'methodology',
    position: { x: -250, y: 200 },
    data: {
      label: 'Pre processing',
      icon: Database,
      isExpanded: false,
      description: 'Click to expand the pre-processing workflow.',
      details: [],
      children: ['loading-data', 'merge-data', 'normalize', 'clean'],
      childEdges: ['e-pre-load', 'e-load-merge', 'e-merge-norm', 'e-norm-clean'],
    },
  },
  {
    id: 'prediction',
    type: 'methodology',
    position: { x: -250, y: 400 },
    data: {
      label: 'Prediction food production',
      icon: Brain,
      isExpanded: false,
      description: 'This section would detail the prediction models.',
      details: [],
    },
  },

  // --- Pre-processing Child Nodes (initially hidden) ---
  {
    id: 'loading-data',
    type: 'methodology',
    position: { x: 200, y: 200 },
    hidden: true,
    data: { label: 'Loading Data', icon: Database, isExpanded: false, description: '', details:[] },
    sourcePosition: Position.Right, targetPosition: Position.Left,
  },
  {
    id: 'merge-data',
    type: 'methodology',
    position: { x: 650, y: 200 },
    hidden: true,
    data: { label: 'Merge All Datasets', icon: Database, isExpanded: false, description: 'Combine all data sources into a single dataset.', details:[] },
    sourcePosition: Position.Right, targetPosition: Position.Left,
  },
  {
    id: 'normalize',
    type: 'methodology',
    position: { x: 1100, y: 200 },
    hidden: true,
    data: {
      label: 'Normalize by Z-score',
      icon: BarChart3,
      isExpanded: true, // Always show formula
      description: 'z_scores = (data - mean) / std_dev',
      details: [],
    },
    sourcePosition: Position.Right, targetPosition: Position.Left,
  },
  {
    id: 'clean',
    type: 'methodology',
    position: { x: 1550, y: 200 },
    hidden: true,
    data: {
      label: 'Clean',
      icon: CheckCircle,
      isExpanded: false, // User clicks to see details
      description: 'Click this node to see cleaning steps.',
      details: [
        'Drop area rows that do not have data for more than 20% of the years (2000-2024).',
        'Drop areas that are missing more than 40% of values for any single year.',
        'Remove areas that do not exist in the food production datasets.',
        'Remove outliers using mean and standard deviation.',
      ],
    },
    targetPosition: Position.Left,
  },
];

// Define edges connecting the nodes sequentially
const initialEdges: Edge[] = [
  { id: 'e-pre-load', source: 'pre-processing', target: 'loading-data', type: 'smoothstep', animated: true, hidden: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
  { id: 'e-load-merge', source: 'loading-data', target: 'merge-data', type: 'smoothstep', animated: true, hidden: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
  { id: 'e-merge-norm', source: 'merge-data', target: 'normalize', type: 'smoothstep', animated: true, hidden: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
  { id: 'e-norm-clean', source: 'normalize', target: 'clean', type: 'smoothstep', animated: true, hidden: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
];

export const MethodologyMindmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event: React.MouseEvent, clickedNode: Node<MethodologyNodeData>) => {
    setNodes(nds => {
        // Create a map for efficient updates
        const nodesMap = new Map(nds.map(n => [n.id, { ...n }]));
        const updatedNode = nodesMap.get(clickedNode.id)!;
        
        // Toggle the isExpanded state for the clicked node
        updatedNode.data = { ...updatedNode.data, isExpanded: !updatedNode.data.isExpanded };
        
        // If the node is a parent, toggle the visibility of its children and their edges
        const isParent = updatedNode.data.children && updatedNode.data.children.length > 0;
        if (isParent) {
            const shouldBeHidden = !updatedNode.data.isExpanded;
            
            updatedNode.data.children!.forEach(childId => {
                const childNode = nodesMap.get(childId);
                if (childNode) childNode.hidden = shouldBeHidden;
            });

            setEdges(eds =>
              eds.map(edge => {
                if (updatedNode.data.childEdges?.includes(edge.id)) {
                  return { ...edge, hidden: shouldBeHidden };
                }
                return edge;
              })
            );
        }
        
        // Return the updated array of nodes
        return Array.from(nodesMap.values());
    });
  }, [setNodes, setEdges]);
  
  const customStyles = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }
  `;

  return (
    <div className="bg-gradient-card rounded-xl border border-primary/20 backdrop-blur-sm overflow-hidden w-full h-full flex flex-col">
      <style>{customStyles}</style>
      <div className="flex justify-between items-center p-4 border-b border-primary/20 flex-shrink-0">
        <h3 className="text-lg font-semibold text-card-foreground">
          מתודולוגיית המחקר - תרשים זרימה
        </h3>
      </div>
      <div className="flex-grow w-full h-full" style={{ minHeight: '600px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          style={{ direction: 'ltr' }}
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="p-4 text-center text-sm text-muted-foreground border-t border-primary/20 flex-shrink-0">
        לחץ על שלב כדי להרחיב • גרור כדי לנווט • זום עם הגלגלת
      </div>
    </div>
  );
};