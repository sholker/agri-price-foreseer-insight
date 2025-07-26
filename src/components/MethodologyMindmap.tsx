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
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Database, BarChart3, Brain, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Interface for the data structure of our custom node
interface MethodologyNodeData {
  label: string;
  description: string;
  details: string[];
  icon: React.ComponentType<any>;
  isExpanded: boolean;
}

// Custom Node Component
const MethodologyNode = ({ data }: { data: MethodologyNodeData }) => {
  const Icon = data.icon;
  
  return (
    // We target the source and target handles for custom positioning
    // to ensure the flow is always top-to-bottom.
    <Card className="p-4 w-[350px] bg-gradient-card shadow-space border border-primary/20 backdrop-blur-sm transition-all duration-300">
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

// Define initial nodes for the flowchart. 
// Y positions are set to 0 and will be calculated dynamically.
const initialNodes: Node<MethodologyNodeData>[] = [
  {
    id: 'data-collection',
    type: 'methodology',
    position: { x: 0, y: 0 },
    data: {
      label: 'שלב 1: איסוף וניקוי נתונים',
      description: 'איסוף נתונים מ-180+ מדינות מ-2000 עד 2024, כולל מדדי ייצור מזון, שימוש בחומרי הדברה, פליטות פחמן, נתוני אוכלוסייה ותעסוקה.',
      details: ['נרמול נתונים לפי Z-score', 'טיפול בערכים חסרים', 'סינון ותיקוף איכות הנתונים'],
      icon: Database,
      isExpanded: false,
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'pca-analysis',
    type: 'methodology',
    position: { x: 0, y: 0 },
    data: {
      label: 'שלב 2: ניתוח רכיבים עיקריים (PCA)',
      description: 'הפחתת מימד הנתונים לזיהוי הרכיבים המשפיעים ביותר על מחירי המזון ויצירת הדמיה תלת-ממדית של הנתונים.',
      details: ['הסבר 85% מהשונות', '3 רכיבים עיקריים', 'זיהוי קיבוצים גיאוגרפיים'],
      icon: BarChart3,
      isExpanded: false,
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'ml-prediction',
    type: 'methodology',
    position: { x: 0, y: 0 },
    data: {
      label: 'שלב 3: למידת מכונה וחיזוי',
      description: 'פיתוח מודלים מתקדמים לחיזוי מגמות מחירי המזון באמצעות אלגוריתמי Random Forest וטכניקות אנסמבל.',
      details: ['אימות צולב (Cross-validation)', 'אופטימיזציה של היפר-פרמטרים', 'הערכת דיוק המודל (R² score)'],
      icon: Brain,
      isExpanded: false,
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
  {
    id: 'validation',
    type: 'methodology',
    position: { x: 0, y: 0 },
    data: {
      label: 'שלב 4: אימות תוצאות',
      description: 'בדיקת מטריצות קורלציה, ניתוח חשיבות משתנים ואימות התוצאות מול נתונים היסטוריים ידועים.',
      details: ['מטריצת קורלציה', 'ניתוח רגישות המודל', 'בדיקת עקביות התוצאות'],
      icon: CheckCircle,
      isExpanded: false,
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  },
];

// Define edges connecting the nodes sequentially
const initialEdges: Edge[] = [
  { id: 'e1', source: 'data-collection', target: 'pca-analysis', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
  { id: 'e2', source: 'pca-analysis', target: 'ml-prediction', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
  { id: 'e3', source: 'ml-prediction', target: 'validation', type: 'smoothstep', animated: true, style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 } },
];

export const MethodologyMindmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Reusable function to calculate node positions for a vertical layout
  const layoutNodes = useCallback((nodesToLayout: Node<MethodologyNodeData>[]) => {
    const PADDING = 50;
    const COLLAPSED_HEIGHT = 100; // Estimated height for a collapsed node
    const EXPANDED_HEIGHT = 260;  // Estimated height for an expanded node
    let yOffset = 0;
    return nodesToLayout.map((node) => {
      const nodeHeight = node.data.isExpanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT;
      const updatedNode = { ...node, position: { ...node.position, y: yOffset } };
      yOffset += nodeHeight + PADDING;
      return updatedNode;
    });
  }, []);

  // Apply layout on initial render
  useEffect(() => {
    setNodes((nds) => layoutNodes(nds));
  }, [setNodes, layoutNodes]);


  // Callback to toggle node expansion on click and re-layout
  const onNodeClick = useCallback((event: React.MouseEvent, clickedNode: Node<MethodologyNodeData>) => {
    setNodes((nds) => {
      const toggledNodes = nds.map((n) => {
        if (n.id === clickedNode.id) {
          return { ...n, data: { ...n.data, isExpanded: !n.data.isExpanded } };
        }
        return n;
      });
      return layoutNodes(toggledNodes);
    });
  }, [setNodes, layoutNodes]);
  
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

  // Function to expand all nodes and re-layout
  const expandAll = () => {
    setNodes((nds) => {
      const expanded = nds.map((n) => ({ ...n, data: { ...n.data, isExpanded: true } }));
      return layoutNodes(expanded);
    });
  };

  // Function to collapse all nodes and re-layout
  const collapseAll = () => {
    setNodes((nds) => {
      const collapsed = nds.map((n) => ({ ...n, data: { ...n.data, isExpanded: false } }));
      return layoutNodes(collapsed);
    });
  };

  return (
    <div className="bg-gradient-card rounded-xl border border-primary/20 backdrop-blur-sm overflow-hidden w-full h-full flex flex-col">
      <style>{customStyles}</style>
      <div className="flex justify-between items-center p-4 border-b border-primary/20 flex-shrink-0">
        <h3 className="text-lg font-semibold text-card-foreground">
          מתודולוגיית המחקר - תרשים זרימה
        </h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={expandAll}>
            הרחב הכל
          </Button>
          <Button variant="outline" size="sm" onClick={collapseAll}>
            כווץ הכל
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
          fitViewOptions={{ padding: 0.1 }}
          style={{ direction: 'ltr' }}
          proOptions={{ hideAttribution: true }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="p-4 text-center text-sm text-muted-foreground border-t border-primary/20 flex-shrink-0">
        לחץ על כל שלב כדי לראות פרטים נוספים • גרור כדי לנווט • זום עם הגלגלת
      </div>
    </div>
  );
};