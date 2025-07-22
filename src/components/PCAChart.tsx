import { useEffect, useRef } from 'react';
// @ts-ignore
import Plotly from 'plotly.js-dist';

const rawPcaData = `Area,Year,food_value,food_security_value,employment_value,annual_population_value,emissions_value,temperatur_change_value,pesticides_use_value,PC1,PC2,PC3
Afghanistan,2001,-0.3195157391933882,-0.7695248674319167,-0.1661533189402647,-0.1073677693314176,-0.2317456324382323,1.0514458532527309,0.0381223299649134,-0.24363421044351252,-0.6131919643924317,0.10778204892864479
Afghanistan,2002,-0.0789773280636554,-0.7302922595490579,-0.1722673936658763,-0.09973612743635,-0.2315357274443953,1.1687811424732213,0.0381223299649134,-0.2402344452151709,-0.5414737258865305,0.076757159282718`;

interface PCAData {
  pc1: number[];
  pc2: number[];
  pc3: number[];
  area: string[];
  hovertext: string[];
}

export const PCAChart = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  function parsePCAData(csvData: string): PCAData {
    const lines = csvData.trim().split('\n');
    const data: PCAData = {
      pc1: [],
      pc2: [],
      pc3: [],
      area: [],
      hovertext: []
    };

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const area = values[0];
      const year = values[1];
      data.pc1.push(parseFloat(values[8])); // PC1 is at index 8
      data.pc2.push(parseFloat(values[9])); // PC2 is at index 9
      data.pc3.push(parseFloat(values[10])); // PC3 is at index 10
      data.area.push(area);
      data.hovertext.push(`${area} - ${year}`);
    }
    return data;
  }

  useEffect(() => {
    if (!chartRef.current) return;

    const pcaData3D = parsePCAData(rawPcaData);
    
    const pcaTrace = {
      x: pcaData3D.pc1,
      y: pcaData3D.pc2,
      z: pcaData3D.pc3,
      text: pcaData3D.hovertext,
      hoverinfo: 'text',
      mode: 'markers',
      type: 'scatter3d',
      marker: {
        size: 6,
        color: pcaData3D.pc1,
        colorscale: 'Viridis',
        opacity: 0.8,
        colorbar: {
          title: 'PC1 Value',
          titlefont: {
            color: '#ffffff'
          },
          tickfont: {
            color: '#ffffff'
          }
        }
      }
    };

    const pcaLayout = {
      title: {
        text: 'ניתוח רכיבים עיקריים תלת-ממדי',
        font: {
          family: 'Inter, sans-serif',
          size: 18,
          color: '#ffffff'
        },
        y: 0.95
      },
      scene: {
        xaxis: { 
          title: 'PC1', 
          range: [-1, 1],
          titlefont: { color: '#ffffff' },
          tickfont: { color: '#ffffff' },
          gridcolor: '#444444'
        },
        yaxis: { 
          title: 'PC2', 
          range: [-1, 1],
          titlefont: { color: '#ffffff' },
          tickfont: { color: '#ffffff' },
          gridcolor: '#444444'
        },
        zaxis: { 
          title: 'PC3', 
          range: [-1, 1],
          titlefont: { color: '#ffffff' },
          tickfont: { color: '#ffffff' },
          gridcolor: '#444444'
        },
        bgcolor: '#0f0f23',
        camera: {
          eye: { x: 1.5, y: 1.5, z: 1.5 }
        }
      },
      margin: { l: 0, r: 0, b: 0, t: 50 },
      paper_bgcolor: 'transparent',
      plot_bgcolor: 'transparent',
      font: {
        family: 'Inter, sans-serif',
        color: '#ffffff'
      }
    };

    const config = {
      responsive: true,
      displayModeBar: true,
      modeBarButtonsToRemove: ['pan2d', 'lasso2d'],
      displaylogo: false
    };

    Plotly.newPlot(chartRef.current, [pcaTrace], pcaLayout, config);

    return () => {
      if (chartRef.current) {
        Plotly.purge(chartRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={chartRef} 
      className="w-full h-[500px] rounded-lg border border-primary/20 bg-card/50 backdrop-blur-md"
      style={{ direction: 'ltr' }}
    />
  );
};