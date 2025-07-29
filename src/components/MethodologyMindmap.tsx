import React, { useState, useCallback, useEffect } from 'react';
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

// --- MOCK UI COMPONENTS ---
// In a real app, these would be imported from your UI library (e.g., shadcn/ui)
const Card = ({ className, children }) => <div className={`border rounded-lg shadow-md ${className}`}>{children}</div>;
const Button = ({ children, ...props }) => <button className="px-3 py-1.5 text-sm font-medium border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2" {...props}>{children}</button>;


// --- NODE AND COMPONENT DEFINITIONS ---

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
      {/* Handles for precise connections */}
      <Handle type="target" position={Position.Top} id="top" style={{ background: '#5E42D9' }} />
      <Handle type="source" position={Position.Bottom} id="bottom" style={{ background: '#5E42D9' }} />
      <Handle type="target" position={Position.Left} id="left" style={{ background: '#5E42D9' }} />
      <Handle type="source" position={Position.Right} id="right" style={{ background: '#5E42D9' }} />

      <Card className="p-4 w-[350px] bg-white bg-opacity-80 backdrop-blur-sm border-gray-300 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{data.label}</h3>
        </div>
        
        {data.isExpanded && (
          <div className="space-y-3 mt-4 animate-fade-in">
            <p className="text-sm text-gray-600 leading-relaxed">
              {data.description}
            </p>
            
            {data.tableData ? (
              <div className="overflow-x-auto rounded-lg border border-gray-300">
                <table className="w-full text-sm text-left text-gray-600">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
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
                      <tr key={i} className="bg-white border-b">
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
                  <div key={index} className="flex items-start gap-2 text-xs text-gray-500">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
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
                  className="rounded-lg border border-gray-300 w-full cursor-pointer hover:opacity-80 transition-opacity"
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

// --- DATA DEFINITIONS FOR NODES AND EDGES ---

// Define initial nodes with a logical, hierarchical layout
const initialNodesData: Node<MethodologyNodeData>[] = [
  // Level 1 - Main Vertical Flow
  {
    id: 'preprocessing', type: 'methodology', position: { x: 0, y: 0 },
    data: { label: '1. Pre-processing', description: 'Data collection, merging, normalization, and cleaning processes.', details: ['Click to see sub-steps'], icon: Database, isExpanded: false, level: 1 },
  },
  {
    id: 'prediction', type: 'methodology', position: { x: 0, y: 250 },
    data: { label: '2. Prediction Food Production', description: 'Using machine learning models to forecast food production.', details: ['Click to see sub-steps'], icon: Brain, isExpanded: false, level: 1 },
  },
  {
    id: 'analyse', type: 'methodology', position: { x: 0, y: 500 },
    data: { label: '3. Analyse', description: 'Data analysis using dimensionality reduction and clustering.', details: ['Click to see sub-steps'], icon: BarChart3, isExpanded: false, level: 1 },
  },

  // --- Preprocessing Horizontal Flow (Children of 'preprocessing') ---
  {
    id: 'loading-data', type: 'methodology', position: { x: 450, y: 0 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Loading Data', description: 'Loading various datasets from multiple sources.', details: ['FAO datasets', 'World Bank data'], icon: FileText, isExpanded: false, level: 2 },
  },
  {
    id: 'merge-datasets', type: 'methodology', position: { x: 900, y: 0 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Merge Datasets', description: 'Combining all datasets into one unified dataset.', details: ['Joined by country and year'], icon: Merge, isExpanded: false, level: 2 },
  },
  {
    id: 'normalize', type: 'methodology', position: { x: 1350, y: 0 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Normalize by Z-score', description: 'z_scores = (data - mean) / std_dev', details: ['Scales all features uniformly'], icon: Calculator, isExpanded: false, level: 2 },
  },
  {
    id: 'clean', type: 'methodology', position: { x: 1800, y: 0 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Clean Data', description: 'Data cleaning and outlier removal processes.', details: ['Before: 257 Countries & 64 years', 'After: 193 Countries & 23 years', 'Click to see cleaning steps'], icon: Filter, isExpanded: false, level: 2 },
  },
  // Children of 'clean' (Vertical Drill-down)
  {
    id: 'drop-missing-rows', type: 'methodology', position: { x: 1800, y: 250 }, hidden: true,
    data: { parentId: 'clean', label: 'Drop Rows', description: 'Drop area rows not having data for 2000-2024 for more than 20% of values.', details: ['Check data availability', 'Calculate missing percentage'], icon: Filter, isExpanded: false, level: 3 },
  },
  {
    id: 'drop-missing-years', type: 'methodology', position: { x: 1800, y: 500 }, hidden: true,
    data: { parentId: 'clean', label: 'Drop Missing Years', description: 'Drop areas missing values for years 2000-2024 where missing years > 40%.', details: ['Analyze temporal coverage', 'Remove incomplete time series'], icon: Filter, isExpanded: false, level: 3 },
  },
  {
    id: 'remove-non-food', type: 'methodology', position: { x: 1800, y: 750 }, hidden: true,
    data: { parentId: 'clean', label: 'Remove Non-Food Areas', description: 'Remove areas not present in food production datasets.', details: ['Cross-reference with food data', 'Ensure dataset consistency'], icon: Filter, isExpanded: false, level: 3 },
  },
  {
    id: 'remove-outliers', type: 'methodology', position: { x: 1800, y: 1000 }, hidden: true,
    data: { parentId: 'clean', label: 'Remove Outliers', description: 'Remove outliers based on mean and standard deviation.', details: ['Calculate statistical thresholds', 'Identify and remove extreme values'], icon: Filter, isExpanded: false, level: 3 },
  },
  {
    id: 'complete-missing', type: 'methodology', position: { x: 2250, y: 0 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Complete Missing Values', description: 'Using Random Forest to impute missing data points. The feature importance plot is shown below.', details: ['Click image to enlarge.'], icon: Brain, isExpanded: false, level: 2, imageUrl: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Random+Forest+Plot' },
  },

  // --- Prediction Horizontal Flow (Children of 'prediction') ---
  {
    id: 'arima-model', type: 'methodology', position: { x: 450, y: 175 }, hidden: true,
    data: { parentId: 'prediction', label: 'ARIMA Model', description: 'ARIMA runs on food production index data only. The prediction is based on historical data.', details: ['Univariate time series model.', 'Data range: 1961-2024.'], icon: Brain, isExpanded: false, level: 2 },
  },
  // Children of 'arima-model' (Horizontal Drill-down)
  {
    id: 'select-order', type: 'methodology', position: { x: 900, y: 175 }, hidden: true,
    data: { parentId: 'arima-model', label: 'Select Order by auto_arima', description: 'Automatically discover the optimal order for the ARIMA model.', details: ['Finds best (p,d,q) values'], icon: GitBranch, isExpanded: false, level: 3 },
  },
  {
    id: 'fit-model', type: 'methodology', position: { x: 1350, y: 175 }, hidden: true,
    data: { parentId: 'arima-model', label: 'Fit the Model', description: 'Train the ARIMA model on the historical time series data.', details: ['Uses the selected order'], icon: Brain, isExpanded: false, level: 3 },
  },
  {
    id: 'add-to-history', type: 'methodology', position: { x: 1800, y: 175 }, hidden: true,
    data: { parentId: 'arima-model', label: 'Prediction', description: 'For Walk-Forward validation, the prediction is added to the history for the next iteration.', details: ['Simulates real-world forecasting'], icon: FileText, isExpanded: false, level: 3 },
  },
  {
    id: 'show-results', type: 'methodology', position: { x: 2250, y: 175 }, hidden: true,
    data: { parentId: 'arima-model', label: 'Show Results', description: 'Display the final forecast results.', details: ['Compare predictions with actuals'], icon: BarChart3, isExpanded: false, level: 3 },
  },
  {
    id: 'tabpfn-model', type: 'methodology', position: { x: 450, y: 325 }, hidden: true,
    data: { parentId: 'prediction', label: 'TabPFN Model', description: 'Prediction is based on a wide range of features from the years 2000-2024.', details: ['Features used:', '- Food production index', '- Food security', '- Employment indicators', '- Annual population', '- CO2 emissions', '- Temperature change', '- Pesticides use'], icon: Brain, isExpanded: false, level: 2 },
  },
  // Children of 'tabpfn-model' (Horizontal Drill-down)
  {
    id: 'tabpfn-table', type: 'methodology', position: { x: 900, y: 325 }, hidden: true,
    data: { parentId: 'tabpfn-model', label: 'Plane Data', description: 'Data is split into 80% training and 20% testing sets for the model.', details: [], icon: FileText, isExpanded: false, level: 3,
      tableData: {
        headers: ['Train Data', 'Test Data'],
        rows: [['X_train, Y_train', 'X_test'], ['(features, target)', <span className="text-amber-500 font-bold text-lg">?</span>]]
      }
    },
  },
  {
    id: 'tabpfn-run', type: 'methodology', position: { x: 1350, y: 325 }, hidden: true,
    data: { parentId: 'tabpfn-model', label: 'Run TabPFN Model', description: 'The model is trained on the (X_train, Y_train) data.', details: [], icon: Brain, isExpanded: false, level: 3 },
  },
  {
    id: 'tabpfn-predict', type: 'methodology', position: { x: 1800, y: 325 }, hidden: true,
    data: { parentId: 'tabpfn-model', label: 'Prediction', description: 'The trained model predicts the output for X_test, which is then validated.', details: [], icon: Brain, isExpanded: false, level: 3 },
  },
  {
    id: 'y-test', type: 'methodology', position: { x: 1800, y: 525 }, hidden: true,
    data: { parentId: 'tabpfn-model', label: 'Y_test', description: 'The actual values from the test set used for validation.', details: [], icon: GitBranch, isExpanded: false, level: 3 },
  },
  
  // --- Analyse Horizontal Flow (Children of 'analyse') ---
  {
    id: 'pca', type: 'methodology', position: { x: 450, y: 500 }, hidden: true,
    data: { parentId: 'analyse', label: 'PCA', description: 'Principal Component Analysis for dimensionality reduction.', details: ['Click to expand and see clustering steps.'], icon: BarChart3, isExpanded: false, level: 2, imageUrl: 'https://placehold.co/600x400/E2E8F0/4A5568?text=PCA+Plot' },
  },
  // Children of 'pca'
  {
    id: 'clustering', type: 'methodology', position: { x: 900, y: 500 }, hidden: true,
    data: { parentId: 'pca', label: 'Clustering', description: 'Grouping countries based on PCA results.', details: ['Click to expand.'], icon: Users, isExpanded: false, level: 3 },
  },
  // Children of 'clustering'
  {
    id: 'kmeans', type: 'methodology', position: { x: 1350, y: 500 }, hidden: true,
    data: { parentId: 'clustering', label: 'K-means', description: 'Applying K-means algorithm to identify clusters.', details: ['Click to see manual vs auto results.'], icon: GitBranch, isExpanded: false, level: 4 },
  },
  // Children of 'kmeans' (Vertical Drill-down)
  {
    id: 'manual-clustering', type: 'methodology', position: { x: 1350, y: 750 }, hidden: true,
    data: { parentId: 'kmeans', label: 'Manual Clustering', description: 'Manual grouping based on visual inspection of PCA plot.', details: ['Group 1 (len=7): Brazil, China, China, mainland, India, Indonesia, Russian Federation, United States of America'], icon: Users, isExpanded: false, level: 5, imageUrl: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Manual+PCA' },
  },
  {
    id: 'auto-clustering', type: 'methodology', position: { x: 1350, y: 1050 }, hidden: true,
    data: { parentId: 'kmeans', label: 'Auto Clustering (K-means)', description: 'Automatic grouping using K-means algorithm.', details: ["Cluster 1 (len=5): Brazil, China, China, mainland, India, United States of America"], icon: Users, isExpanded: false, level: 5, imageUrl: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Auto+PCA' },
  },
];

const edgeStyle = { stroke: '#6B7280', strokeWidth: 2 };
const edgeMarker = { type: MarkerType.ArrowClosed, color: '#6B7280' };

// Define edges with handles corresponding to the new layout
const initialEdgesData: Edge[] = [
  // Pre-processing chain (Horizontal)
  { id: 'e-prep-1', source: 'preprocessing', target: 'loading-data', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-2', source: 'loading-data', target: 'merge-datasets', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-3', source: 'merge-datasets', target: 'normalize', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-4', source: 'normalize', target: 'clean', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-5', source: 'clean', target: 'complete-missing', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  // Clean sub-chain (Vertical)
  { id: 'e-clean-1', source: 'clean', target: 'drop-missing-rows', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
  { id: 'e-clean-2', source: 'drop-missing-rows', target: 'drop-missing-years', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
  { id: 'e-clean-3', source: 'drop-missing-years', target: 'remove-non-food', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
  { id: 'e-clean-4', source: 'remove-non-food', target: 'remove-outliers', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },

  // Prediction chain (Horizontal Branches)
  { id: 'e-pred-1', source: 'prediction', target: 'arima-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-pred-2', source: 'prediction', target: 'tabpfn-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  
  // ARIMA sub-chain (Horizontal)
  { id: 'e-arima-1', source: 'arima-model', target: 'select-order', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-arima-2', source: 'select-order', target: 'fit-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-arima-3', source: 'fit-model', target: 'add-to-history', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-arima-4', source: 'add-to-history', target: 'show-results', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-arima-loop', source: 'add-to-history', target: 'fit-model', type: 'bezier', animated: true, hidden: true, style: { ...edgeStyle, stroke: '#f59e0b' }, markerEnd: { ...edgeMarker, color: '#f59e0b' }, label: 'Walk-Forward', labelStyle: { fill: '#f59e0b', fontWeight: 'bold' }, sourceHandle: 'bottom', targetHandle: 'bottom' },
  
  // TabPFN sub-chain (Horizontal + Vertical)
  { id: 'e-tabpfn-1', source: 'tabpfn-model', target: 'tabpfn-table', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-tabpfn-2', source: 'tabpfn-table', target: 'tabpfn-run', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-tabpfn-3', source: 'tabpfn-run', target: 'tabpfn-predict', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-tabpfn-4', source: 'tabpfn-predict', target: 'y-test', type: 'smoothstep', animated: true, hidden: true, style: { ...edgeStyle, stroke: '#10b981' }, markerEnd: { ...edgeMarker, color: '#10b981' }, label: 'Validate', labelStyle: { fill: '#10b981', fontWeight: 'bold' }, sourceHandle: 'bottom', targetHandle: 'top' },
  
  // Analyse chain (Horizontal)
  { id: 'e-analyse-1', source: 'analyse', target: 'pca', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-pca-1', source: 'pca', target: 'clustering', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-cluster-1', source: 'clustering', target: 'kmeans', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  // K-means sub-chain (Vertical)
  { id: 'e-kmeans-1', source: 'kmeans', target: 'manual-clustering', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
  { id: 'e-kmeans-2', source: 'kmeans', target: 'auto-clustering', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
];


export const MethodologyMindmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesData);

  // This effect ensures that the view is reset to the initial state on mount
  useEffect(() => {
    setNodes(initialNodesData);
    setEdges(initialEdgesData);
  }, [setNodes, setEdges]);
  
  const onNodeClick = useCallback((event: React.MouseEvent, clickedNode: Node<MethodologyNodeData>) => {
    setNodes((currentNodes) => {
        const isExpanding = !clickedNode.data.isExpanded;

        // Find all descendants of the clicked node
        const findDescendantIds = (nodeId: string): Set<string> => {
            const descendants = new Set<string>();
            const queue: string[] = [nodeId];
            const visited = new Set<string>();

            while (queue.length > 0) {
                const currentId = queue.shift()!;
                if (visited.has(currentId)) continue;
                visited.add(currentId);

                currentNodes.forEach(n => {
                    if (n.data.parentId === currentId) {
                        descendants.add(n.id);
                        queue.push(n.id);
                    }
                });
            }
            return descendants;
        };
        
        const childrenIds = currentNodes.filter(n => n.data.parentId === clickedNode.id).map(n => n.id);
        const descendantsToCollapse = !isExpanding ? findDescendantIds(clickedNode.id) : new Set<string>();

        const newNodes = currentNodes.map(n => {
            // Toggle the clicked node's expanded state
            if (n.id === clickedNode.id) {
                return { ...n, data: { ...n.data, isExpanded: isExpanding } };
            }
            // Toggle visibility of direct children
            if (childrenIds.includes(n.id)) {
                return { ...n, hidden: !isExpanding };
            }
            // If we are collapsing, hide all descendants and reset their expanded state
            if (descendantsToCollapse.has(n.id)) {
                return { ...n, hidden: true, data: { ...n.data, isExpanded: false } };
            }
            return n;
        });

        // Update edges based on the new node visibility
        setEdges((currentEdges) => {
            return currentEdges.map(edge => {
                const sourceNode = newNodes.find(n => n.id === edge.source);
                const targetNode = newNodes.find(n => n.id === edge.target);
                const isHidden = !sourceNode || !targetNode || sourceNode.hidden || targetNode.hidden;
                return { ...edge, hidden: isHidden };
            });
        });

        return newNodes;
    });
  }, [setNodes, setEdges]);
  
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
    const newEdges = edges.map(e => ({ ...e, hidden: true }));
    setNodes(newNodes);
    setEdges(newEdges);
  };
  
  const customStyles = `
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fade-in 0.3s ease-out; }
    .react-flow__panel {
        bottom: 20px !important;
        right: auto !important;
        top: auto !important;
        left: 20px !important;
    }
  `;

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm overflow-hidden w-full h-full flex flex-col">
      <style>{customStyles}</style>
      <div className="flex justify-between items-center p-4 border-b border-gray-200 flex-shrink-0 bg-white">
        <h3 className="text-lg font-semibold text-gray-800">
          Research Methodology - Flow Diagram
        </h3>
        <div className="flex gap-2">
          <Button onClick={expandAll} className="bg-white text-gray-700 hover:bg-gray-100 border-gray-300">Expand All</Button>
          <Button onClick={collapseAll} className="bg-white text-gray-700 hover:bg-gray-100 border-gray-300">Collapse All</Button>
        </div>
      </div>
      <div className="flex-grow w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2, duration: 300 }}
          style={{ direction: 'ltr' }}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#e0e0e0" />
          <Controls />
        </ReactFlow>
      </div>
      <div className="p-3 text-center text-sm text-gray-500 border-t border-gray-200 flex-shrink-0 bg-gray-50">
        Click a node to expand its sub-steps • Drag to navigate • Zoom with mouse wheel
      </div>
    </div>
  );
};