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

// Define initial nodes for the hierarchical methodology flowchart
const initialNodesData: Node<MethodologyNodeData>[] = [
  // Level 1 - Horizontal Layout
  {
    id: 'preprocessing', type: 'methodology', position: { x: 0, y: -900 },
    data: { label: 'Pre processing', description: 'Data collection, merging, normalization, and cleaning processes.', details: ['Click to see sub-steps'], icon: Database, isExpanded: false, level: 1 },
  },
  {
    id: 'prediction', type: 'methodology', position: { x: 0, y: -300 },
    data: { label: 'Prediction Food Production', description: 'Using machine learning models to forecast food production.', details: ['Click to see sub-steps'], icon: Brain, isExpanded: false, level: 1 },
  },
  {
    id: 'analyse', type: 'methodology', position: { x: 0, y: 0 },
    data: { label: 'Analyse', description: 'Data analysis using dimensionality reduction and clustering.', details: ['Click to see sub-steps'], icon: BarChart3, isExpanded: false, level: 1 },
  },

  // --- Preprocessing Vertical Flow ---
  // Level 2 (Children of Preprocessing)
  {
    id: 'loading-data', type: 'methodology', position: {x: 500, y: -900 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Loading Data', description: 'Loading various datasets from multiple sources.', details: ['FAO datasets', 'World Bank data'], icon: FileText, isExpanded: false, level: 2 },
  },
  {
    id: 'merge-datasets', type: 'methodology', position: { x: 1000, y: -900 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Merge Datasets', description: 'Combining all datasets into one unified dataset.', details: ['Joined by country and year'], icon: Merge, isExpanded: false, level: 2 },
  },
  {
    id: 'normalize', type: 'methodology', position: { x: 1300, y: -900 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Normalize by Z-score', description: 'z_scores = (data - mean) / std_dev', details: ['Scales all features uniformly'], icon: Calculator, isExpanded: false, level: 2 },
  },
  {
    id: 'clean', type: 'methodology', position: { x: 1800, y: -900 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Clean Data', description: 'Data cleaning and outlier removal processes.', details: ['Before: 257 Countries & 64 years', 'After: 193 Countries & 23 years', 'Click to see cleaning steps'], icon: Filter, isExpanded: false, level: 2 },
  },
    // Level 3 (Children of Clean)
  {
    id: 'drop-missing-rows', type: 'methodology', position: { x: 850, y: -850 }, hidden: true,
    data: { parentId: 'clean', label: 'Drop Rows', description: 'Drop area rows not having data for 2000-2024 for more than 20% of values.', details: ['Check data availability', 'Calculate missing percentage'], icon: Filter, isExpanded: false, level: 3 },
  },
  {
    id: 'drop-missing-years', type: 'methodology', position: { x: 1800, y: -500 }, hidden: true,
    data: { parentId: 'clean', label: 'Drop Missing Years', description: 'Drop areas missing values for years 2000-2024 where missing years > 40%.', details: ['Analyze temporal coverage', 'Remove incomplete time series'], icon: Filter, isExpanded: false, level: 3 },
  },
  {
    id: 'remove-non-food', type: 'methodology', position: { x: 1800, y: -400 }, hidden: true,
    data: { parentId: 'clean', label: 'Remove Non-Food Areas', description: 'Remove areas not present in food production datasets.', details: ['Cross-reference with food data', 'Ensure dataset consistency'], icon: Filter, isExpanded: false, level: 3 },
  },
  {
    id: 'remove-outliers', type: 'methodology', position: { x: 1800, y: -300 }, hidden: true,
    data: { parentId: 'clean', label: 'Remove Outliers', description: 'Remove outliers based on mean and standard deviation.', details: ['Calculate statistical thresholds', 'Identify and remove extreme values'], icon: Filter, isExpanded: false, level: 3 },
  },
  {
    id: 'complete-missing', type: 'methodology', position: { x: 2400, y: -900 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Complete Missing Values', description: 'Using Random Forest to impute missing data points. The feature importance plot is shown below.', details: ['Click image to enlarge.'], icon: Brain, isExpanded: false, level: 2, imageUrl: '/lovable-uploads/randomForest.png' },
  },

  // --- Prediction Vertical Flow ---
  // Level 2 (Children of Prediction)
  {
    id: 'arima-model', type: 'methodology', position: { x: 550, y: 250 }, hidden: true,
    data: { parentId: 'prediction', label: 'ARIMA Model', description: 'ARIMA runs on food production index data only. The prediction is based on historical data.', details: ['Univariate time series model.', 'Data range: 1961-2024.'], icon: Brain, isExpanded: false, level: 2 },
  },
    // Level 3 (Children of ARIMA Model)
  {
    id: 'select-order', type: 'methodology', position: { x: 550, y: 500 }, hidden: true,
    data: { parentId: 'arima-model', label: 'Select Order by auto_arima', description: 'Automatically discover the optimal order for the ARIMA model.', details: ['Finds best (p,d,q) values'], icon: GitBranch, isExpanded: false, level: 3 },
  },
  {
    id: 'fit-model', type: 'methodology', position: { x: 550, y: 750 }, hidden: true,
    data: { parentId: 'arima-model', label: 'Fit the Model', description: 'Train the ARIMA model on the historical time series data.', details: ['Uses the selected order'], icon: Brain, isExpanded: false, level: 3 },
  },
  {
    id: 'add-to-history', type: 'methodology', position: { x: 550, y: 1000 }, hidden: true,
    data: { parentId: 'arima-model', label: 'Prediction', description: 'For Walk-Forward validation, the prediction is added to the history for the next iteration.', details: ['Simulates real-world forecasting'], icon: FileText, isExpanded: false, level: 3 },
  },
  {
    id: 'tabpfn-model', type: 'methodology', position: { x: 550, y: 1500 }, hidden: true,
    data: { parentId: 'prediction', label: 'TabPFN Model', description: 'Prediction is based on a wide range of features from the years 2000-2024.', details: ['Features used:', '- Food production index', '- Food security', '- Employment indicators', '- Annual population', '- CO2 emissions', '- Temperature change', '- Pesticides use'], icon: Brain, isExpanded: false, level: 2 },
  },
    // Level 3 (Children of TabPFN Model)
  {
    id: 'tabpfn-table', type: 'methodology', position: { x: 550, y: 1750 }, hidden: true,
    data: { 
      parentId: 'tabpfn-model', 
      label: 'Plane Data', 
      description: 'Data is split into 80% training and 20% testing sets for the model.', 
      details: [], 
      icon: FileText, 
      isExpanded: false, 
      level: 3,
      tableData: {
        headers: ['Train Data', 'Test Data'],
        rows: [
          ['X_train, Y_train', 'X_test'],
          ['(features, target)', <span className="text-amber-400 font-bold text-lg">?</span>],
        ],
      }
    },
  },
  {
    id: 'tabpfn-run', type: 'methodology', position: { x: 550, y: 2000 }, hidden: true,
    data: { parentId: 'tabpfn-model', label: 'Run TabPFN Model', description: 'The model is trained on the (X_train, Y_train) data.', details: [], icon: Brain, isExpanded: false, level: 3 },
  },
  {
    id: 'tabpfn-predict', type: 'methodology', position: { x: 550, y: 2250 }, hidden: true,
    data: { parentId: 'tabpfn-model', label: 'Prediction', description: 'The trained model predicts the output for X_test, which is then validated.', details: [], icon: Brain, isExpanded: false, level: 3 },
  },
  {
    id: 'y-test', type: 'methodology', position: { x: 950, y: 2250 }, hidden: true,
    data: { parentId: 'tabpfn-model', label: 'Y_test', description: 'The actual values from the test set used for validation.', details: [], icon: GitBranch, isExpanded: false, level: 3 },
  },
  {
    id: 'blended-model', type: 'methodology', position: { x: 1100, y: 875 }, hidden: true,
    data: {
      parentId: 'prediction',
      label: 'Blended Model',
      description: "This meta-model learns the optimal weighting of ARIMA and TabPFN predictions by using them as inputs to forecast the 'Actual' food production values.",
      details: ['The result is a powerful formula, such as \nFinal Prediction = Intercept + (Coefficient_ARIMA * ARIMA) + (Coefficient_TabPFN * TabPFN), which precisely combines the strengths of both underlying models.'],
      icon: Merge,
      isExpanded: false,
      level: 2
    },
  },
  
  // --- Analyse Vertical Flow ---
  // Level 2 (Children of Analyse)
  {
    id: 'pca', type: 'methodology', position: { x: 1100, y: 250 }, hidden: true,
    data: { parentId: 'analyse', label: 'PCA', description: 'Principal Component Analysis for dimensionality reduction.', details: ['Click to expand and see clustering steps.'], icon: BarChart3, isExpanded: false, level: 2, imageUrl: '/lovable-uploads/PCA.png' },
  },
  // Level 3 (Children of PCA)
  {
    id: 'clustering', type: 'methodology', position: { x: 1100, y: 500 }, hidden: true,
    data: { parentId: 'pca', label: 'Clustering', description: 'Grouping countries based on PCA results.', details: ['Click to expand.'], icon: Users, isExpanded: false, level: 3 },
  },
  // Level 4 (Children of Clustering)
  {
    id: 'kmeans', type: 'methodology', position: { x: 1100, y: 750 }, hidden: true,
    data: { parentId: 'clustering', label: 'K-means', description: 'Applying K-means algorithm to identify clusters.', details: ['Click to see manual vs auto results.'], icon: GitBranch, isExpanded: false, level: 4 },
  },
  // Level 5 (Children of K-means)
  {
    id: 'manual-clustering', type: 'methodology', position: { x: 900, y: 1000 }, hidden: true,
    data: { parentId: 'kmeans', label: 'Manual Clustering', description: 'Manual grouping based on visual inspection of PCA plot.', details: ['Group 1 (len=7): Brazil, China, China, mainland, India, Indonesia, Russian Federation, United States of America'], icon: Users, isExpanded: false, level: 5, imageUrl: '/lovable-uploads/PCA_manually.png' },
  },
  {
    id: 'auto-clustering', type: 'methodology', position: { x: 1300, y: 1000 }, hidden: true,
    data: { parentId: 'kmeans', label: 'Auto Clustering (K-means)', description: 'Automatic grouping using K-means algorithm.', details: ["Cluster 1 (len=5): Brazil, China, China, mainland, India, United States of America"], icon: Users, isExpanded: false, level: 5, imageUrl: '/lovable-uploads/PCA_auto.png' },
  },
];

const edgeStyle = { stroke: 'hsl(var(--primary))', strokeWidth: 2 };
const edgeMarker = { type: MarkerType.ArrowClosed, color: 'hsl(var(--primary))' };

const initialEdgesData: Edge[] = [
  // Pre-processing chain
  { id: 'e-prep-1', source: 'preprocessing', target: 'loading-data', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-2', source: 'loading-data', target: 'merge-datasets', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-3', source: 'merge-datasets', target: 'normalize', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-4', source: 'normalize', target: 'clean', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-5', source: 'clean', target: 'complete-missing', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-7', source: 'drop-missing-rows', target: 'drop-missing-years', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-8', source: 'drop-missing-years', target: 'remove-non-food', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-prep-9', source: 'remove-non-food', target: 'remove-outliers', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },

  { id: 'e-prep-10', source: 'complete-missing', target: 'tabpfn-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },
  { id: 'e-prep-11', source: 'complete-missing', target: 'analyse', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-clean-1', source: 'clean', target: 'drop-missing-rows', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'top' },

  // Prediction chain
  { id: 'e-pred-1', source: 'prediction', target: 'arima-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-pred-2', source: 'prediction', target: 'tabpfn-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-arima-to-blend', source: 'tabpfn-predict', target: 'blended-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-tabpfn-to-blend', source: 'add-to-history', target: 'blended-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'buttom' },
  
  // ARIMA sub-chain
  { id: 'e-arima-1', source: 'arima-model', target: 'select-order', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-arima-2', source: 'select-order', target: 'fit-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-arima-3', source: 'fit-model', target: 'add-to-history', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'top' },

  { id: 'e-arima-5', source: 'add-to-history', target: 'fit-model', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'bottom', targetHandle: 'bottom' },
  { id: 'e-arima-loop', source: 'add-to-history', target: 'fit-model', type: 'smoothstep', animated: true, hidden: true, style: { ...edgeStyle, stroke: '#f6ad55' }, markerEnd: { ...edgeMarker, color: '#f6ad55' }, label: 'Walk-Forward Validation', labelStyle: { fill: '#f6ad55', fontWeight: 'bold' }, labelBgStyle: { fill: 'hsl(var(--card))', fillOpacity: 0.7, }, labelBgPadding: [8, 4], labelBgBorderRadius: 4, sourceHandle: 'bottom', targetHandle: 'left' },
  
  // TabPFN sub-chain
  { id: 'e-tabpfn-1', source: 'tabpfn-model', target: 'tabpfn-table', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-tabpfn-2', source: 'tabpfn-table', target: 'tabpfn-run', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'left' },
  { id: 'e-tabpfn-3', source: 'tabpfn-run', target: 'tabpfn-predict', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker, sourceHandle: 'right', targetHandle: 'top' },
  { id: 'e-tabpfn-4', source: 'tabpfn-predict', target: 'y-test', type: 'smoothstep', animated: true, hidden: true, style: { ...edgeStyle, stroke: '#f6ad55' }, markerEnd: { ...edgeMarker, color: '#f6ad55' }, label: 'Walk-Forward Validation', labelStyle: { fill: '#f6ad55', fontWeight: 'bold' }, labelBgStyle: { fill: 'hsl(var(--card))', fillOpacity: 0.7 }, labelBgPadding: [8, 4], labelBgBorderRadius: 4, sourceHandle: 'bottom', targetHandle: 'top' },
  { id: 'e-tabpfn-loop', source: 'y-test', target: 'tabpfn-table', type: 'smoothstep', animated: true, hidden: true, style: { ...edgeStyle, stroke: '#f655dbff' }, markerEnd: { ...edgeMarker, color: '#f655dbff' }, label: 'Walk-Forward Validation', labelStyle: { fill: '#f655dbff', fontWeight: 'bold' }, labelBgStyle: { fill: 'hsl(var(--card))', fillOpacity: 0.7 }, labelBgPadding: [8, 4], labelBgBorderRadius: 4, sourceHandle: 'bottom', targetHandle: 'left' },
  
  // Analyse chain
  { id: 'e-analyse-1', source: 'analyse', target: 'pca', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-pca-1', source: 'pca', target: 'clustering', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-cluster-1', source: 'clustering', target: 'kmeans', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-kmeans-1', source: 'kmeans', target: 'manual-clustering', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-kmeans-2', source: 'kmeans', target: 'auto-clustering', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
];


export const MethodologyMindmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdgesData);

  // Load saved positions on component mount
  useEffect(() => {
    const savedPositions = localStorage.getItem('methodology-node-positions');
    if (savedPositions) {
      try {
        const positions = JSON.parse(savedPositions);
        const updatedNodes = initialNodesData.map(node => ({
          ...node,
          position: positions[node.id] || node.position
        }));
        setNodes(updatedNodes);
      } catch (error) {
        console.error('Failed to load saved positions:', error);
      }
    }
  }, [setNodes]);

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

      if (edge.id.startsWith('e-prep-to-') || edge.id.startsWith('e-pred-to-')) {
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
      hidden: !(e.id.startsWith('e-prep-to-') || e.id.startsWith('e-pred-to-'))
    }));
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const saveAsDefault = () => {
    const positions: Record<string, { x: number; y: number }> = {};
    nodes.forEach(node => {
      positions[node.id] = node.position;
    });
    localStorage.setItem('methodology-node-positions', JSON.stringify(positions));
  };

  const resetToDefault = () => {
    localStorage.removeItem('methodology-node-positions');
    setNodes(initialNodesData);
    setEdges(initialEdgesData);
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
          <Button variant="outline" size="sm" onClick={saveAsDefault}>Save as Default</Button>
          <Button variant="outline" size="sm" onClick={resetToDefault}>Reset to Default</Button>
        </div>
      </div>
      <div className="flex-grow w-full" style={{ height: '1200px' }}>
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