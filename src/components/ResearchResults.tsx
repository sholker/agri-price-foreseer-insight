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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Database, Brain, FileText, Merge, Calculator, Filter, BarChart3, Users, GitBranch, Link } from 'lucide-react';
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
  linkToTab?: string;
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

  const handleLinkClick = () => {
    if (!data.linkToTab) return;

    // Construct the URL with a query parameter for the tab.
    // The target page would need logic to read this parameter and set the active tab.
    const targetUrl = `https://preview--food-production-research.lovable.app/?tab=${data.linkToTab}#results`;
    
    // Open the URL in a new tab.
    window.open(targetUrl, '_blank');
  };

  return (
    <>
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
                <div key={index} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <span>{detail}</span>
                </div>
              ))}
            </div>
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
            {data.linkToTab && (
              <div className="mt-4">
                <Button variant="outline" size="sm" onClick={handleLinkClick}>
                  <Link className="mr-2 h-4 w-4" />
                  View PCA in Results
                </Button>
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
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking on the image
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
  // Level 1
  {
    id: 'preprocessing', type: 'methodology', position: { x: 0, y: 0 },
    data: { label: 'Pre processing', description: 'Data collection, merging, normalization, and cleaning processes.', details: ['Click to see sub-steps'], icon: Database, isExpanded: false, level: 1 },
  },
  {
    id: 'prediction', type: 'methodology', position: { x: 450, y: 0 },
    data: { label: 'Prediction Food Production', description: 'Using machine learning models to forecast food production.', details: ['Advanced ML algorithms', 'Model validation', 'Performance evaluation'], icon: Brain, isExpanded: false, level: 1 },
  },
  {
    id: 'analyse', type: 'methodology', position: { x: 900, y: 0 },
    data: { label: 'Analyse', description: 'Data analysis using dimensionality reduction and clustering.', details: ['Click to see sub-steps'], icon: BarChart3, isExpanded: false, level: 1 },
  },
  // Level 2 (Children of Preprocessing)
  {
    id: 'loading-data', type: 'methodology', position: { x: 0, y: 200 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Loading Data', description: 'Loading various datasets from multiple sources.', details: ['FAO datasets', 'World Bank data'], icon: FileText, isExpanded: false, level: 2 },
  },
  {
    id: 'merge-datasets', type: 'methodology', position: { x: 0, y: 400 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Merge Datasets', description: 'Combining all datasets into one unified dataset.', details: ['Joined by country and year'], icon: Merge, isExpanded: false, level: 2 },
  },
  {
    id: 'normalize', type: 'methodology', position: { x: 0, y: 600 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Normalize by Z-score', description: 'z_scores = (data - mean) / std_dev', details: ['Scales all features uniformly'], icon: Calculator, isExpanded: false, level: 2 },
  },
  {
    id: 'clean', type: 'methodology', position: { x: 0, y: 800 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Clean Data', description: 'Data cleaning and outlier removal processes.', details: ['Before: 257 Countries & 64 years', 'After: 193 Countries & 23 years', 'Click to see cleaning steps'], icon: Filter, isExpanded: false, level: 2 },
  },
  {
    id: 'complete-missing', type: 'methodology', position: { x: 0, y: 1000 }, hidden: true,
    data: { parentId: 'preprocessing', label: 'Complete Missing Values', description: 'Using Random Forest to impute missing data points. The feature importance plot is shown below.', details: ['Click image to enlarge.'], icon: Brain, isExpanded: false, level: 2, imageUrl: '/lovable-uploads/randomForest.png' },
  },
  // Level 3 (Children of Clean)
  {
    id: 'drop-missing-rows', type: 'methodology', position: { x: 450, y: 800 }, hidden: true,
    data: { parentId: 'clean', label: 'Drop Rows', description: 'Drop area rows not having data for 2000-2024 for more than 20% of values.', details: ['Check data availability', 'Calculate missing percentage'], icon: Filter, isExpanded: false, level: 3 },
  },
  {
    id: 'drop-missing-years', type: 'methodology', position: { x: 450, y: 1000 }, hidden: true,
    data: { parentId: 'clean', label: 'Drop Missing Years', description: 'Drop areas missing values for years 2000-2024 where missing years > 40%.', details: ['Analyze temporal coverage', 'Remove incomplete time series'], icon: Filter, isExpanded: false, level: 3 },
  },
  {
    id: 'remove-non-food', type: 'methodology', position: { x: 450, y: 1200 }, hidden: true,
    data: { parentId: 'clean', label: 'Remove Non-Food Areas', description: 'Remove areas not present in food production datasets.', details: ['Cross-reference with food data', 'Ensure dataset consistency'], icon: Filter, isExpanded: false, level: 3 },
  },
  {
    id: 'remove-outliers', type: 'methodology', position: { x: 450, y: 1400 }, hidden: true,
    data: { parentId: 'clean', label: 'Remove Outliers', description: 'Remove outliers based on mean and standard deviation.', details: ['Calculate statistical thresholds', 'Identify and remove extreme values'], icon: Filter, isExpanded: false, level: 3 },
  },
  // Level 2 (Children of Analyse)
  {
    id: 'pca', type: 'methodology', position: { x: 900, y: 200 }, hidden: true,
    data: { parentId: 'analyse', label: 'PCA', description: 'Principal Component Analysis for dimensionality reduction.', details: ['Click to expand and see clustering steps.'], icon: BarChart3, isExpanded: false, level: 2, imageUrl: '/lovable-uploads/PCA.png', linkToTab: 'pca' },
  },
  // Level 3 (Children of PCA)
  {
    id: 'clustering', type: 'methodology', position: { x: 1100, y: 700 }, hidden: true,
    data: { parentId: 'pca', label: 'Clustering', description: 'Grouping countries based on PCA results.', details: ['Click to expand.'], icon: Users, isExpanded: false, level: 3 },
  },
  // Level 4 (Children of Clustering)
  {
    id: 'kmeans', type: 'methodology', position: { x: 1100, y: 900 }, hidden: true,
    data: { parentId: 'clustering', label: 'K-means', description: 'Applying K-means algorithm to identify clusters.', details: ['Click to see manual vs auto results.'], icon: GitBranch, isExpanded: false, level: 4 },
  },
  // Level 5 (Children of K-means)
  {
    id: 'manual-clustering', type: 'methodology', position: { x: 900, y: 1100 }, hidden: true,
    data: { parentId: 'kmeans', label: 'Manual Clustering', description: 'Manual grouping based on visual inspection of PCA plot.', details: ['Group 1 (len=7): Brazil, China, China, mainland, India, Indonesia, Russian Federation, United States of America'], icon: Users, isExpanded: false, level: 5, imageUrl: '/lovable-uploads/PCA_manually.png' },
  },
  {
    id: 'auto-clustering', type: 'methodology', position: { x: 1300, y: 1100 }, hidden: true,
    data: { parentId: 'kmeans', label: 'Auto Clustering (K-means)', description: 'Automatic grouping using K-means algorithm.', details: ["Cluster 1 (len=5): Brazil, China, China, mainland, India, United States of America"], icon: Users, isExpanded: false, level: 5, imageUrl: '/lovable-uploads/PCA_auto.png' },
  },
];

const edgeStyle = { stroke: 'hsl(var(--primary))', strokeWidth: 2 };
const edgeMarker = { type: MarkerType.ArrowClosed, color: 'hsl(var(--primary))' };

const initialEdgesData: Edge[] = [
  // Pre-processing chain
  { id: 'e-prep-1', source: 'preprocessing', target: 'loading-data', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-prep-2', source: 'loading-data', target: 'merge-datasets', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-prep-3', source: 'merge-datasets', target: 'normalize', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-prep-4', source: 'normalize', target: 'clean', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-prep-5', source: 'clean', target: 'complete-missing', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  // Cleaning chain
  { id: 'e-clean-1', source: 'clean', target: 'drop-missing-rows', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-clean-2', source: 'drop-missing-rows', target: 'drop-missing-years', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-clean-3', source: 'drop-missing-years', target: 'remove-non-food', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
  { id: 'e-clean-4', source: 'remove-non-food', target: 'remove-outliers', type: 'smoothstep', animated: true, hidden: true, style: edgeStyle, markerEnd: edgeMarker },
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

  const onNodeClick = useCallback((event: React.MouseEvent, clickedNode: Node<MethodologyNodeData>) => {
    setNodes(currentNodes => {
      const isExpanding = !clickedNode.data.isExpanded;

      const findDescendantIds = (nodeId: string, allNodes: Node<MethodologyNodeData>[]): Set<string> => {
        const descendants = new Set<string>();
        const queue: string[] = [nodeId];
        while (queue.length > 0) {
          const currentId = queue.shift()!;
          const children = allNodes.filter(n => n.data.parentId === currentId);
          for (const child of children) {
            descendants.add(child.id);
            queue.push(child.id);
          }
        }
        return descendants;
      };

      const descendantsToCollapse = !isExpanding ? findDescendantIds(clickedNode.id, currentNodes) : new Set<string>();

      return currentNodes.map(n => {
        if (n.id === clickedNode.id) {
          return { ...n, data: { ...n.data, isExpanded: isExpanding } };
        }
        if (n.data.parentId === clickedNode.id) {
          return { ...n, hidden: !isExpanding };
        }
        if (descendantsToCollapse.has(n.id)) {
          return { ...n, hidden: true, data: { ...n.data, isExpanded: false } };
        }
        return n;
      });
    });
  }, [setNodes]);

  useEffect(() => {
    setEdges(currentEdges =>
      currentEdges.map(edge => {
        const sourceNode = nodes.find(n => n.id === edge.source);
        const targetNode = nodes.find(n => n.id === edge.target);
        return { ...edge, hidden: !sourceNode || !targetNode || sourceNode.hidden || targetNode.hidden };
      })
    );
  }, [nodes, setEdges]);

  const expandAll = () => {
    setNodes(nds => nds.map(n => ({ ...n, hidden: false, data: { ...n.data, isExpanded: true } })));
  };

  const collapseAll = () => {
    setNodes(nds => nds.map(n => ({
      ...n,
      hidden: n.data.level > 1,
      data: { ...n.data, isExpanded: false },
    })));
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
      <div className="flex-grow w-full" style={{ height: '800px' }}>
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