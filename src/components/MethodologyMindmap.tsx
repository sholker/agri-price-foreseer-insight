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
import { Database, BarChart3, Brain, CheckCircle, FileText, Merge, Calculator, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Interface for the data structure of our custom node
interface MethodologyNodeData extends Record<string, unknown> {
  label: string;
  description: string;
  details: string[];
  icon: React.ComponentType<any>;
  isExpanded: boolean;
  level: number;
  parentId?: string;
}

// Custom Node Component
const MethodologyNode = ({ data }: { data: MethodologyNodeData }) => {
  const Icon = data.icon;
  
  return (
    // We target the source and target handles for custom positioning
    // to ensure the flow is always top-to-bottom.
    <Card className="p-4 w-[350px] bg-gradient-card shadow-space border border-primary/20 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-card-foreground">{data.label}</h3>
      </div>
      
      {data.isExpanded && (
        <div className="space-y-3 mt-4 animate-fade-in">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.description}
          </p>
          <div className="space-y-2">
            {data.details.map((detail, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                {detail}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

// Register the custom node type
const nodeTypes: NodeTypes = {
  methodology: MethodologyNode,
};

// Define initial nodes for the hierarchical methodology flowchart
const getAllNodes = (): Node<MethodologyNodeData>[] => [
  // Main nodes
  {
    id: 'preprocessing',
    type: 'methodology',
    position: { x: -200, y: 0 },
    data: {
      label: 'Pre Processing',
      description: 'Data preparation pipeline from loading to cleaning',
      details: ['Click to expand and see sub-steps'],
      icon: Database,
      isExpanded: false,
      level: 1,
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'prediction',
    type: 'methodology',
    position: { x: 200, y: 0 },
    data: {
      label: 'Prediction Food Production',
      description: 'Machine learning models for food production prediction',
      details: ['Advanced ML algorithms', 'Model validation', 'Performance evaluation'],
      icon: Brain,
      isExpanded: false,
      level: 1,
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  // Pre-processing sub-nodes
  {
    id: 'loading-data',
    type: 'methodology',
    position: { x: -400, y: 200 },
    data: {
      label: 'Loading Data',
      description: 'Loading datasets from multiple sources',
      details: ['FAO datasets', 'World Bank data', 'Regional statistics'],
      icon: FileText,
      isExpanded: false,
      level: 2,
      parentId: 'preprocessing',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    hidden: true,
  },
  {
    id: 'merge-datasets',
    type: 'methodology',
    position: { x: -200, y: 200 },
    data: {
      label: 'Merge All Datasets',
      description: 'Combining all datasets into one unified dataset',
      details: ['Join by country and year', 'Handle different formats', 'Create unified schema'],
      icon: Merge,
      isExpanded: false,
      level: 2,
      parentId: 'preprocessing',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    hidden: true,
  },
  {
    id: 'normalize',
    type: 'methodology',
    position: { x: 0, y: 200 },
    data: {
      label: 'Normalize by Z-score',
      description: 'z_scores = (data - mean) / std_dev',
      details: ['Calculate mean and standard deviation', 'Apply Z-score transformation', 'Scale all features uniformly'],
      icon: Calculator,
      isExpanded: false,
      level: 2,
      parentId: 'preprocessing',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    hidden: true,
  },
  {
    id: 'clean',
    type: 'methodology',
    position: { x: 200, y: 200 },
    data: {
      label: 'Clean',
      description: 'Data cleaning and outlier removal',
      details: ['Click to see cleaning steps'],
      icon: Filter,
      isExpanded: false,
      level: 2,
      parentId: 'preprocessing',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    hidden: true,
  },
  // Cleaning sub-nodes
  {
    id: 'drop-missing-areas',
    type: 'methodology',
    position: { x: 0, y: 400 },
    data: {
      label: 'Drop Missing Areas',
      description: 'Drop area rows that do not have data in year 2000-2024 more than 20% for 20% of *_value',
      details: ['Check data availability from 2000-2024', 'Calculate missing percentage threshold', 'Remove areas with >20% missing data'],
      icon: Filter,
      isExpanded: false,
      level: 3,
      parentId: 'clean',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    hidden: true,
  },
  {
    id: 'drop-missing-years',
    type: 'methodology',
    position: { x: 200, y: 400 },
    data: {
      label: 'Drop Missing Years',
      description: 'Drop areas with missing values for years 2000-2024 where missing years are more than 40%',
      details: ['Analyze temporal coverage 2000-2024', 'Calculate missing year percentage', 'Remove areas with >40% missing years'],
      icon: Filter,
      isExpanded: false,
      level: 3,
      parentId: 'clean',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    hidden: true,
  },
  {
    id: 'remove-non-food',
    type: 'methodology',
    position: { x: 400, y: 400 },
    data: {
      label: 'Remove Non-Food Areas',
      description: 'Remove areas that do not exist in food production datasets',
      details: ['Cross-reference with food production data', 'Identify non-food producing regions', 'Ensure dataset consistency'],
      icon: Filter,
      isExpanded: false,
      level: 3,
      parentId: 'clean',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    hidden: true,
  },
  {
    id: 'remove-outliers',
    type: 'methodology',
    position: { x: 600, y: 400 },
    data: {
      label: 'Remove Outliers',
      description: 'Remove outliers by mean and standard deviation',
      details: ['Calculate statistical thresholds', 'Identify extreme values using mean ± std', 'Apply outlier removal'],
      icon: Filter,
      isExpanded: false,
      level: 3,
      parentId: 'clean',
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
    hidden: true,
  },
];

// Define all possible edges
const getAllEdges = (): Edge[] => [
  // Main flow
  { id: 'main-flow', source: 'preprocessing', target: 'prediction', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
  
  // Pre-processing sub-flow
  { id: 'prep-1', source: 'preprocessing', target: 'loading-data', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, hidden: true },
  { id: 'prep-2', source: 'loading-data', target: 'merge-datasets', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, hidden: true },
  { id: 'prep-3', source: 'merge-datasets', target: 'normalize', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, hidden: true },
  { id: 'prep-4', source: 'normalize', target: 'clean', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, hidden: true },
  
  // Cleaning sub-flow
  { id: 'clean-1', source: 'clean', target: 'drop-missing-areas', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, hidden: true },
  { id: 'clean-2', source: 'drop-missing-areas', target: 'drop-missing-years', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, hidden: true },
  { id: 'clean-3', source: 'drop-missing-years', target: 'remove-non-food', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, hidden: true },
  { id: 'clean-4', source: 'remove-non-food', target: 'remove-outliers', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, hidden: true },
];

const initialNodes: Node<MethodologyNodeData>[] = getAllNodes();
const initialEdges: Edge[] = getAllEdges();

export const MethodologyMindmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Callback to toggle node expansion and show/hide child nodes
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const nodeData = node.data as MethodologyNodeData;
    
    setNodes((nds) =>
      nds.map((n) => {
        const nData = n.data as MethodologyNodeData;
        
        if (n.id === node.id) {
          // Toggle the isExpanded state for the clicked node
          return {
            ...n,
            data: {
              ...n.data,
              isExpanded: !n.data.isExpanded,
            },
          };
        }
        
        // Show/hide child nodes based on parent expansion
        if (nData.parentId === node.id) {
          return {
            ...n,
            hidden: !nodeData.isExpanded, // If parent is not expanded, hide children
          };
        }
        
        // Hide grandchildren when parent collapses
        if (nodeData.isExpanded === false && nData.level === 3 && nData.parentId) {
          const parentNode = nds.find(parent => parent.id === nData.parentId);
          if (parentNode?.data.parentId === node.id) {
            return {
              ...n,
              hidden: true,
            };
          }
        }
        
        return n;
      })
    );
    
    // Update edges visibility
    setEdges((eds) =>
      eds.map((edge) => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        
        if (!sourceNode || !targetNode) return edge;
        
        const sourceData = sourceNode.data as MethodologyNodeData;
        const targetData = targetNode.data as MethodologyNodeData;
        
        // Show edges when expanding, hide when collapsing
        if (edge.source === node.id && targetData.parentId === node.id) {
          return {
            ...edge,
            hidden: !nodeData.isExpanded, // If parent is not expanded, hide edge
          };
        }
        
        // Handle grandchild edges
        if (targetData.level === 3 && sourceData.parentId === node.id && !nodeData.isExpanded) {
          return {
            ...edge,
            hidden: true,
          };
        }
        
        return edge;
      })
    );
  }, [setNodes, setEdges, nodes]);
  
  // CSS for animations
  const customStyles = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.3s ease-out;
    }
  `;

  // Function to expand all nodes
  const expandAll = () => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, isExpanded: true },
      }))
    );
  };

  // Function to collapse all nodes
  const collapseAll = () => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, isExpanded: false },
      }))
    );
  };

  return (
    <div className="bg-gradient-card rounded-xl border border-primary/20 backdrop-blur-sm overflow-hidden w-full h-full flex flex-col">
      <style>{customStyles}</style>
      <div className="flex justify-between items-center p-4 border-b border-primary/20 flex-shrink-0">
        <h3 className="text-lg font-semibold text-card-foreground">
          Research Methodology - Flow Diagram
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>
            Expand All
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            Collapse All
          </Button>
        </div>
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
          // fitViewOptions is used to control the initial view, e.g., adding some padding
          fitViewOptions={{ padding: 0.2 }}
          style={{ direction: 'ltr' }} // LTR direction for canvas controls
          proOptions={{ hideAttribution: true }} // Hides the "React Flow" attribution
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="p-4 text-center text-sm text-muted-foreground border-t border-primary/20 flex-shrink-0">
        Click each step to see details • Drag to navigate • Zoom with mouse wheel
      </div>
    </div>
  );
};