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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Database, BarChart3, Brain, CheckCircle, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface MethodologyNodeData {
  label: string;
  description: string;
  details: string[];
  icon: React.ComponentType<any>;
  isExpanded: boolean;
}

const MethodologyNode = ({ data }: { data: MethodologyNodeData }) => {
  const Icon = data.icon;
  
  return (
    <Card className="p-4 min-w-[300px] bg-gradient-card shadow-space border border-primary/20 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-card-foreground">{data.label}</h3>
      </div>
      
      {data.isExpanded && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {data.description}
          </p>
          <div className="space-y-2">
            {data.details.map((detail, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1 h-1 bg-primary rounded-full"></div>
                {detail}
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

const nodeTypes: NodeTypes = {
  methodology: MethodologyNode,
};

// Updated node positions for a mind-map layout
const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'methodology',
    position: { x: 350, y: 250 },
    data: {
      label: 'מחקר מחירי מזון עולמיים',
      description: 'מחקר מקיף על השפעת גורמים סביבתיים וכלכליים על מחירי המזון ברחבי העולם',
      details: ['180+ מדינות', '2000-2024', 'ביג דאטה ו-AI'],
      icon: Target,
      isExpanded: false,
    },
  },
  {
    id: 'data-collection',
    type: 'methodology',
    position: { x: 350, y: 50 },
    data: {
      label: 'איסוף וניקוי נתונים',
      description: 'איסוף נתונים מ-180+ מדינות מ-2000 עד 2024, כולל מדדי ייצור מזון, שימוש בחומרי הדברה, אמיסות פחמן, נתוני אוכלוסייה ותעסוקה.',
      details: ['נרמול נתונים לפי Z-score', 'טיפול בערכים חסרים', 'סינון ותיקוף איכות הנתונים'],
      icon: Database,
      isExpanded: false,
    },
  },
  {
    id: 'pca-analysis',
    type: 'methodology',
    position: { x: 50, y: 250 },
    data: {
      label: 'ניתוח רכיבים עיקריים (PCA)',
      description: 'הפחתת מימד הנתונים לזיהוי הרכיבים המשפיעים ביותר על מחירי המזון ויצירת הדמיה תלת-ממדית של הנתונים.',
      details: ['הסבר 85% מהשונות', '3 רכיבים עיקריים', 'זיהוי קיבוצים גיאוגרפיים'],
      icon: BarChart3,
      isExpanded: false,
    },
  },
  {
    id: 'ml-prediction',
    type: 'methodology',
    position: { x: 650, y: 250 },
    data: {
      label: 'למידת מכונה וחיזוי',
      description: 'פיתוח מודלים מתקדמים לחיזוי מגמות מחירי המזון באמצעות אלגוריתמי Random Forest וטכניקות אנסמבל.',
      details: ['אימות צולב', 'אופטימיזציה של היפר-פרמטרים', 'הערכת דיוק המודל'],
      icon: Brain,
      isExpanded: false,
    },
  },
  {
    id: 'validation',
    type: 'methodology',
    position: { x: 350, y: 450 },
    data: {
      label: 'אימות תוצאות',
      description: 'בדיקת מטריצות קורלציה, ניתוח חשיבות משתנים ואימות התוצאות מול נתונים היסטוריים ידועים.',
      details: ['מטריצת קורלציה', 'ניתוח רגישות', 'בדיקת עקביות'],
      icon: CheckCircle,
      isExpanded: false,
    },
  },
];

// Updated edges to connect from the central node
const initialEdges: Edge[] = [
  { id: 'e1', source: 'start', target: 'data-collection', type: 'smoothstep', style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, },
  { id: 'e2', source: 'start', target: 'pca-analysis', type: 'smoothstep', style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, },
  { id: 'e3', source: 'start', target: 'ml-prediction', type: 'smoothstep', style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, },
  { id: 'e4', source: 'start', target: 'validation', type: 'smoothstep', style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 }, },
];

export const MethodologyMindmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          return {
            ...n,
            data: {
              ...n.data,
              isExpanded: !n.data.isExpanded,
            },
          };
        }
        return n;
      })
    );
  }, [setNodes]);

  const expandAll = () => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, isExpanded: true },
      }))
    );
  };

  const collapseAll = () => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: { ...n.data, isExpanded: false },
      }))
    );
  };

  return (
    <div className="bg-gradient-card rounded-xl border border-primary/20 backdrop-blur-sm overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b border-primary/20">
        <h3 className="text-lg font-semibold text-card-foreground">
          תרשים זרימה אינטרקטיבי - מתודולוגיית המחקר
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
      <div style={{ height: '600px', width: '100%' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          style={{ direction: 'ltr' }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      <div className="p-4 text-center text-sm text-muted-foreground border-t border-primary/20">
        לחץ על כל שלב כדי לראות פרטים נוספים • גרור כדי לנווט • זום עם הגלגלת
      </div>
    </div>
  );
};