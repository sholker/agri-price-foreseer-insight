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
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Database, Brain, FileText, Merge, Calculator, Filter, BarChart3, Users, GitBranch } from 'lucide-react';
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
  imageUrl?: string;
  tableData?: {
    headers: string[];
    rows: (string | React.ReactNode)[][];
  };
}

// Custom Node Component
const MethodologyNode = ({ data }: { data: MethodologyNodeData }) => {
  const Icon = data.icon;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    if (data.imageUrl) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Explicitly ID'd handles for precise connections */}
      <Handle type="target" position={Position.Top} id="top" style={{ background: 'hsl(var(--primary))' }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: 'hsl(var(--primary))' }} />
      <Handle type="target" position={Position.Left} id="left" style={{ background: 'hsl(var(--primary))' }} />
      <Handle type="source" position={Position.Right} id="right" style={{ background: 'hsl(var(--primary))' }} />

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
            
            {data.tableData ? (
              <div className="overflow-x-auto rounded-lg border border-primary/20">
                <table className="w-full text-sm text-left text-muted-foreground">
                  <thead className="text-xs text-card-foreground uppercase bg-primary/20">
                    <tr>
                      {data.tableData.headers.map((header, i) => (
                        <th key={i} scope="col" className="px-4 py-2">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.tableData.rows.map((row, i) => (
                      <tr key={i} className="bg-card/50">
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3 font-mono">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-2">
                {data.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            )}
            
            {data.imageUrl && (
              <div className="mt-4">
                <img 
                  src={data.imageUrl} 
                  alt={data.label} 
                  className="rounded-lg border border-primary/20 w-full cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={handleImageClick}
                />
              </div>
            )}
          </div>
        )}
      </Card>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100]"
          onClick={closeModal}
        >
          <img 
            src={data.imageUrl} 
            alt={`${data.label} - Full view`}
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

// Register the custom node type
const nodeTypes: NodeTypes = {
  methodology: MethodologyNode,
};

// --- Node and Edge Definitions ---
// A more organized and logical layout for all nodes and edges.

const initialNodesData: Node<MethodologyNodeData>[] = [
  // --- Level 1: Main Pillars (Vertical) ---
  {
    id: 'preprocessing', type: 'methodology', position: { x: 0, y: 0 },
    data: { label: 'Pre-processing', description: 'Data collection, merging, normalization, and cleaning processes.', details: ['Click to see sub-steps'], icon: Database, isExpanded: false, level: 1 },
  },
  {
    id: 'prediction', type: 'methodology', position: { x: 0, y: 300 },
    data: { label: 'Prediction Models', description: 'Using machine learning models to forecast food production.', details: ['Click to see sub-steps'], icon: Brain, isExpanded: false, level: 1 },
  },
  {
    id: 'analyse', type: 'methodology', position: { x: 0, y: 600 },
    data: { label: 'Analysis', description: 'Data analysis using dimensionality reduction and clustering.', details: ['Click to see sub-steps'], icon: BarChart3, isExpanded: false, level: 1 },
  },

  // --- Level 2+: Sub-flows (Horizontal) ---

  // Pre-processing children
  { id: 'loading-data', type: 'methodology', position: { x: 450, y: -150 }, hidden: true, data: { parentId: 'preprocessing', level: 2, label: 'Loading Data', description: 'Loading various datasets from multiple sources.', details: ['FAO datasets', 'World Bank data'], icon: FileText, isExpanded: false } },
  { id: 'merge-datasets', type: 'methodology', position: { x: 900, y: -150 }, hidden: true, data: { parentId: 'preprocessing', level: 2, label: 'Merge Datasets', description: 'Combining all datasets into one unified dataset.', details: ['Joined by country and year'], icon: Merge, isExpanded: false } },
  { id: 'normalize', type: 'methodology', position: { x: 1350, y: -150 }, hidden: true, data: { parentId: 'preprocessing', level: 2, label: 'Normalize by Z-score', description: 'z_scores = (data - mean) / std_dev', details: ['Scales all features uniformly'], icon: Calculator, isExpanded: false } },
  { id: 'clean', type: 'methodology', position: { x: 1800, y: -150 }, hidden: true, data: { parentId: 'preprocessing', level: 2, label: 'Clean Data', description: 'Data cleaning and outlier removal processes.', details: ['Before: 257 Countries & 64 years', 'After: 193 Countries & 23 years', 'Click to see cleaning steps'], icon: Filter, isExpanded: false } },
  
  // Clean children
  { id: 'drop-missing-rows', type: 'methodology', position: { x: 1800, y: 100 }, hidden: true, data: { parentId: 'clean', level: 3, label: 'Drop Rows', description: 'Drop area rows not having data for 2000-2024 for more than 20% of values.', details: ['Check data availability', 'Calculate missing percentage'], icon: Filter, isExpanded: false } },
  { id: 'drop-missing-years', type: 'methodology', position: { x: 1800, y: 350 }, hidden: true, data: { parentId: 'clean', level: 3, label: 'Drop Missing Years', description: 'Drop areas missing values for years 2000-2024 where missing years > 40%.', details: ['Analyze temporal coverage', 'Remove incomplete time series'], icon: Filter, isExpanded: false } },
  { id: 'remove-non-food', type: 'methodology', position: { x: 1800, y: 600 }, hidden: true, data: { parentId: 'clean', level: 3, label: 'Remove Non-Food Areas', description: 'Remove areas not present in food production datasets.', details: ['Cross-reference with food data', 'Ensure dataset consistency'], icon: Filter, isExpanded: false } },
  { id: 'remove-outliers', type: 'methodology', position: { x: 1800, y: 850 }, hidden: true, data: { parentId: 'clean', level: 3, label: 'Remove Outliers', description: 'Remove outliers based on mean and standard deviation.', details: ['Calculate statistical thresholds', 'Identify and remove extreme values'], icon: Filter, isExpanded: false } },
  
  { id: 'complete-missing', type: 'methodology', position: { x: 2250, y: -150 }, hidden: true, data: { parentId: 'preprocessing', level: 2, label: 'Complete Missing Values', description: 'Using Random Forest to impute missing data points. The feature importance plot is shown below.', details: ['Click image to enlarge.'], icon: Brain, isExpanded: false, imageUrl: '/lovable-uploads/randomForest.png' } },

  // Prediction children
  { id: 'arima-model', type: 'methodology', position: { x: 450, y: 150 }, hidden: true, data: { parentId: 'prediction', level: 2, label: 'ARIMA Model', description: 'ARIMA runs on food production index data only. The prediction is based on historical data.', details: ['Univariate time series model.', 'Data range: 1961-2024.'], icon: Brain, isExpanded: false } },
  { id: 'select-order', type: 'methodology', position: { x: 900, y: 150 }, hidden: true, data: { parentId: 'arima-model', level: 3, label: 'Select Order by auto_arima', description: 'Automatically discover the optimal order for the ARIMA model.', details: ['Finds best (p,d,q) values'], icon: GitBranch, isExpanded: false } },
  { id: 'fit-model', type: 'methodology', position: { x: 1350, y: 150 }, hidden: true, data: { parentId: 'arima-model', level: 3, label: 'Fit the Model', description: 'Train the ARIMA model on the historical time series data.', details: ['Uses the selected order'], icon: Brain, isExpanded: false } },
  { id: 'add-to-history', type: 'methodology', position: { x: 1800, y: 150 }, hidden: true, data: { parentId: 'arima-model', level: 3, label: 'Prediction', description: 'For Walk-Forward validation, the prediction is added to the history for the next iteration.', details: ['Simulates real-world forecasting'], icon: FileText, isExpanded: false } },
  { id: 'show-results', type: 'methodology', position: { x: 2250, y: 150 }, hidden: true, data: { parentId: 'arima-model', level: 3, label: 'Show Results', description: 'Display the final forecast results.', details: ['Compare predictions with actuals'], icon: BarChart3, isExpanded: false } },

  { id: 'tabpfn-model', type: 'methodology', position: { x: 450, y: 450 }, hidden: true, data: { parentId: 'prediction', level: 2, label: 'TabPFN Model', description: 'Prediction is based on a wide range of features from the years 2000-2024.', details: ['Features used:', '- Food production index', '- Food security', '- Employment indicators', '- Annual population', '- CO2 emissions', '- Temperature change', '- Pesticides use'], icon: Brain, isExpanded: false } },
  { id: 'tabpfn-table', type: 'methodology', position: { x: 900, y: 450 }, hidden: true, data: { parentId: 'tabpfn-model', level: 3, label: 'Plane Data', description: 'Data is split into 80% training and 20% testing sets for the model.', details: [], icon: FileText, isExpanded: false, tableData: { headers: ['Train Data', 'Test Data'], rows: [['X_train, Y_train', 'X_test'], ['(features, target)', <span className="text-amber-400 font-bold text-lg">?</span>]] } } },
  { id: 'tabpfn-run', type: 'methodology', position: { x: 1350, y: 450 }, hidden: true, data: { parentId: 'tabpfn-model', level: 3, label: 'Run TabPFN Model', description: 'The model is trained on the (X_train, Y_train) data.', details: [], icon: Brain, isExpanded: false } },
  { id: 'tabpfn-predict', type: 'methodology', position: { x: 1800, y: 450 }, hidden: true, data: { parentId: 'tabpfn-model', level: 3, label: 'Prediction', description: 'The trained model predicts the output for X_test, which is then validated.', details: [], icon: Brain, isExpanded: false } },
  { id: 'y-test', type: 'methodology', position: { x: 2250, y: 450 }, hidden: true, data: { parentId: 'tabpfn-model', level: 3, label: 'Y_test', description: 'The actual values from the test set used for validation.', details: [], icon: GitBranch, isExpanded: false } },

  // Analyse children
  { id: 'pca', type: 'methodology', position: { x: 450, y: 600 }, hidden: true, data: { parentId: 'analyse', level: 2, label: 'PCA', description: 'Principal Component Analysis for dimensionality reduction.', details: ['Click to expand and see clustering steps.'], icon: BarChart3, isExpanded: false, imageUrl: '/lovable-uploads/PCA.png' } },
  { id: 'clustering', type: 'methodology', position: { x: 900, y: 600 }, hidden: true, data: { parentId: 'analyse', level: 2, label: 'Clustering', description: 'Grouping countries based on PCA results.', details: ['Click to expand.'], icon: Users, isExpanded: false } },
  { id: 'kmeans', type: 'methodology', position: { x: 1350, y: 600 }, hidden: true, data: { parentId: 'analyse', level: 2, label: 'K-means', description: 'Applying K-means algorithm to identify clusters.', details: ['Click to see manual vs auto results.'], icon: GitBranch, isExpanded: false } },
  { id: 'manual-clustering', type: 'methodology', position: { x: 1150, y: 850 }, hidden: true, data: { parentId: 'kmeans', level: 3, label: 'Manual Clustering', description: 'Manual grouping based on visual inspection of PCA plot.', details: ['Group 1 (len=7): Brazil, China, China, mainland, India, Indonesia, Russian Federation, United States of America'], icon: Users, isExpanded: false, imageUrl: '/lovable-uploads/PCA_manually.png' } },
  { id: 'auto-clustering', type: 'methodology', position: { x: 1550, y: 850 }, hidden: true, data: { parentId: 'kmeans', level: 3, label: 'Auto Clustering (K-means)', description: 'Automatic grouping using K-means algorithm.', details: ["Cluster 1 (len=5): Brazil, China, China, mainland, India, United States of America"], icon: Users, isExpanded: false, imageUrl: '/lovable-uploads/PCA_auto.png' } },
];

const edgeStyle = { stroke: 'hsl(var(--primary))', strokeWidth: 2 };
const edgeMarker = { type: MarkerType.ArrowClosed, color: 'hsl(var(--primary))' };

const initialEdgesData: Edge[] = [
  // --- Main Pillar Connections ---
  { id: 'e-main-1', source: 'preprocessing', target: 'prediction', type: 'smoothstep', animated: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-main-2', source: 'prediction', target: 'analyse', type: 'smoothstep', animated: true, style: edgeStyle, markerEnd: edgeMarker },

  // --- Pre-processing Horizontal Flow ---
  { id: 'e-prep-1', source: 'preprocessing', target: 'loading-data', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-2', source: 'loading-data', target: 'merge-datasets', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-3', source: 'merge-datasets', target: 'normalize', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-4', source: 'normalize', target: 'clean', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-5', source: 'clean', target: 'complete-missing', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  
  // Clean Vertical Flow
  { id: 'e-clean-1', source: 'clean', target: 'drop-missing-rows', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
  { id: 'e-clean-2', source: 'drop-missing-rows', target: 'drop-missing-years', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
  { id: 'e-clean-3', source: 'drop-missing-years', target: 'remove-non-food', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
  { id: 'e-clean-4', source: 'remove-non-food', target: 'remove-outliers', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
  
  // --- Prediction Horizontal Flow ---
  { id: 'e-pred-1', source: 'prediction', target: 'arima-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-pred-2', source: 'prediction', target: 'tabpfn-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  
  // ARIMA sub-chain
  { id: 'e-arima-1', source: 'arima-model', target: 'select-order', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-arima-2', source: 'select-order', target: 'fit-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-arima-3', source: 'fit-model', target: 'add-to-history', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-arima-4', source: 'add-to-history', target: 'show-results', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-arima-loop', source: 'add-to-history', target: 'fit-model', type: 'smoothstep', animated: true, hidden: true, style: { ...edgeStyle, stroke: '#f6ad55' }, markerEnd: { ...edgeMarker, color: '#f6ad55' }, label: 'Walk-Forward Validation', labelStyle: { fill: '#f6ad55', fontWeight: 'bold' }, labelBgStyle: { fill: 'hsl(var(--card))', fillOpacity: 0.7, }, labelBgPadding: [8, 4], labelBgBorderRadius: 4, sourceHandle: 'top', targetHandle: 'top' },
  
  // TabPFN sub-chain
  { id: 'e-tabpfn-1', source: 'tabpfn-model', target: 'tabpfn-table', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-tabpfn-2', source: 'tabpfn-table', target: 'tabpfn-run', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-tabpfn-3', source: 'tabpfn-run', target: 'tabpfn-predict', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-tabpfn-validation', source: 'y-test', target: 'tabpfn-predict', type: 'smoothstep', animated: true, hidden: true, style: { ...edgeStyle, stroke: '#68d391' }, markerEnd: { ...edgeMarker, color: '#68d391' }, label: 'Validation', labelStyle: { fill: '#68d391', fontWeight: 'bold' }, labelBgStyle: { fill: 'hsl(var(--card))', fillOpacity: 0.7 }, labelBgPadding: [8, 4], labelBgBorderRadius: 4, sourceHandle: 'left', targetHandle: 'right' },
  { id: 'e-tabpfn-loop', source: 'tabpfn-predict', target: 'tabpfn-table', type: 'smoothstep', animated: true, hidden: true, style: { ...edgeStyle, stroke: '#f6ad55' }, markerEnd: { ...edgeMarker, color: '#f6ad55' }, label: 'Walk-Forward Validation', labelStyle: { fill: '#f6ad55', fontWeight: 'bold' }, labelBgStyle: { fill: 'hsl(var(--card))', fillOpacity: 0.7 }, labelBgPadding: [8, 4], labelBgBorderRadius: 4, sourceHandle: 'bottom', targetHandle: 'bottom' },

  // --- Analyse Horizontal Flow ---
  { id: 'e-analyse-1', source: 'analyse', target: 'pca', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-analyse-2', source: 'pca', target: 'clustering', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-analyse-3', source: 'clustering', target: 'kmeans', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  
  // K-means Vertical Flow
  { id: 'e-kmeans-1', source: 'kmeans', target: 'manual-clustering', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
  { id: 'e-kmeans-2', source: 'kmeans', target: 'auto-clustering', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
];


export const MethodologyMindmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesData);

  const onNodeClick = useCallback((event: React.MouseEvent, clickedNode: Node<MethodologyNodeData>) => {
    const isExpanding = !clickedNode.data.isExpanded;
  
    const findDescendantIds = (nodeId: string, allNodes: Node<MethodologyNodeData>[]): Set<string> => {
      const descendants = new Set<string>();
      const queue: string[] = [nodeId];
      const visited = new Set<string>([nodeId]);
  
      while (queue.length > 0) {
        const currentId = queue.shift()!;
        allNodes.forEach(n => {
          if (n.data.parentId === currentId && !visited.has(n.id)) {
            descendants.add(n.id);
            queue.push(n.id);
            visited.add(n.id);
          }
        });
      }
      return descendants;
    };
    
    const newNodes = nodes.map(n => {
      if (n.id === clickedNode.id) {
        return { ...n, data: { ...n.data, isExpanded: isExpanding } };
      }
      
      if (n.data.parentId === clickedNode.id) {
        return { ...n, hidden: !isExpanding };
      }
      
      const descendantsToCollapse = !isExpanding ? findDescendantIds(clickedNode.id, nodes) : new Set<string>();
      if (descendantsToCollapse.has(n.id)) {
        return { ...n, hidden: true, data: { ...n.data, isExpanded: false } };
      }
      
      return n;
    });

    const newEdges = initialEdgesData.map(edge => {
      const sourceNode = newNodes.find(n => n.id === edge.source);
      const targetNode = newNodes.find(n => n.id === edge.target);
      
      const isHidden = !sourceNode || !targetNode || sourceNode.hidden || targetNode.hidden;

      // Keep main pillar connections always visible
      if (edge.id.startsWith('e-main-')) {
          return { ...edge, hidden: false };
      }
      
      return { ...edge, hidden: isHidden };
    });

    setNodes(newNodes);
    setEdges(newEdges);

  }, [nodes, setNodes, setEdges]);
  
  const expandAll = () => {
    const newNodes = nodes.map(n => ({ ...n, hidden: false, data: { ...n.data, isExpanded: true } }));
    const newEdges = edges.map(e => ({ ...e, hidden: false }));
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const collapseAll = () => {
    const newNodes = nodes.map(n => ({
      ...n,
      hidden: n.data.level > 1,
      data: { ...n.data, isExpanded: false },
    }));
    const newEdges = initialEdgesData.map(e => ({ 
      ...e, 
      hidden: !e.id.startsWith('e-main-')
    }));
    setNodes(newNodes);
    setEdges(newEdges);
  };
  
  const customStyles = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 0.3s ease-out; }
  `;

  return (
    <div className="bg-gradient-card rounded-xl border border-primary/20 backdrop-blur-sm overflow-hidden w-full h-full flex flex-col">
      <style>{customStyles}</style>
      <div className="flex justify-between items-center p-4 border-b border-primary/20 flex-shrink-0">
        <h3 className="text-lg font-semibold text-card-foreground">
          Research Methodology - Flow Diagram
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>Expand All</Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>Collapse All</Button>
        </div>
      </div>
      <div className="flex-grow w-full" style={{ height: '1500px' }}>
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
        Click each step to see details • Drag to navigate • Zoom with mouse wheel
      </div>
    </div>
  );
};