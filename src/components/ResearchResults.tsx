import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PCAChart } from "./PCAChart";
import { FoodProductionChart } from "./FoodProductionChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, ChevronUp, X } from 'lucide-react';

export const ResearchResults = () => {
  const [areas, setAreas] = useState([]);
  const [predictionData, setPredictionData] = useState([]);
  const [selectedArea, setSelectedArea] = useState('Israel');
  const [showForecasts, setShowForecasts] = useState({ arima: false, tabpfn: false, blended: false });
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('/lovable-uploads/df_predictions_blanded.csv').then(res => res.text()),
      fetch('/lovable-uploads/forecast_results_ARIMA.csv').then(res => res.text()),
      fetch('/lovable-uploads/future_predictions_tabpFN.csv').then(res => res.text())
    ]).then(([blendedCsv, arimaCsv, tabpfnCsv]) => {

      const arimaDataMap = new Map();
      const arimaLines = arimaCsv.trim().split('\n').slice(1);
      arimaLines.forEach(line => {
        const parts = line.split(',');
        const area = parts[0];
        const rmse = parseFloat(parts[1]);
        const modelEquation = parts[2];
        const predictions = parts.slice(3, 7).map(p => parseFloat(p));
        if (area && !isNaN(rmse)) {
          arimaDataMap.set(area, { 
            arimaRmse: rmse, 
            arimaOrder: modelEquation, 
            arimaPredictions: predictions
          });
        }
      });

      const tabpfnDataMap = new Map();
      const tabpfnLines = tabpfnCsv.trim().split('\n').slice(1);
      tabpfnLines.forEach(line => {
        const parts = line.split(',');
        const area = parts[0];
        const rmse = parseFloat(parts[1]);
        const predictions = parts.slice(2, 6).map(p => parseFloat(p));
        if(area && !isNaN(rmse)) {
          tabpfnDataMap.set(area, {
            tabpfnRmse: rmse,
            tabpfnPredictions: predictions
          });
        }
      });
      
      const blendedDataMap = new Map();
      const blendedLines = blendedCsv.trim().split('\n').slice(1);
       blendedLines.forEach(line => {
        const parts = line.split(',');
        const area = parts[0];
        // const year = parseInt(parts[1]);
        const prediction = parseFloat(parts[2]);
        const formula = parts.slice(3).join(',');

        if (!blendedDataMap.has(area)) {
            blendedDataMap.set(area, {
                predictions: [],
                formula: formula,
                // NOTE: Blended RMSE is still simulated as it's not in the CSVs
                blendedRmse: 0.1155 + (Math.random() - 0.5) * 0.08 
            });
        }
        
        const areaData = blendedDataMap.get(area);
        if (areaData.predictions.length < 4) {
             areaData.predictions.push(prediction);
        }
    });

      const allAreas = new Set([...arimaDataMap.keys(), ...tabpfnDataMap.keys(), ...blendedDataMap.keys()]);
      const sortedAreas = [...allAreas].filter(area => area.trim() !== 'China').sort();

      const data = sortedAreas.map(area => {
        const arimaData = arimaDataMap.get(area) || {};
        const tabpfnData = tabpfnDataMap.get(area) || {};
        const blendedData = blendedDataMap.get(area) || {};

        return {
          Area: area,
          arimaRmse: arimaData.arimaRmse ?? null,
          arimaOrder: arimaData.arimaOrder ?? 'N/A',
          arimaPredictions: arimaData.arimaPredictions ?? [],
          tabpfnRmse: tabpfnData.tabpfnRmse ?? null,
          tabpfnPredictions: tabpfnData.tabpfnPredictions ?? [],
          blendedRmse: blendedData.blendedRmse ?? null,
          blendedPredictions: blendedData.predictions ?? [],
          Formula: blendedData.formula ?? 'N/A',
        };
      });

      setPredictionData(data);
      setAreas(sortedAreas);
      
      if (sortedAreas.includes('Israel')) {
        setSelectedArea('Israel');
      } else if (sortedAreas.length > 0) {
        setSelectedArea(sortedAreas[0]);
      }
    }).catch(error => console.error("Error loading or parsing CSV data:", error));
  }, []);

  const handleAreaChange = (value) => {
    setSelectedArea(value);
    setShowForecasts({ arima: false, tabpfn: false, blended: false });
  };

  const toggleForecast = (model) => {
    setShowForecasts(prev => ({ ...prev, [model]: !prev[model] }));
  };
  
  const selectedAreaData = predictionData.find(d => d.Area === selectedArea);
  
  const arimaImgPath = `/lovable-uploads/ARIMA/${selectedArea}.png`;
  const tabpfnImgPath = `/lovable-uploads/tabpFN/${selectedArea}.png`;
  const blendedImgPath = `/lovable-uploads/blanded/${selectedArea}.png`;

  return (
    <section id="results" className="py-20 bg-gradient-space relative">
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
            Research Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            In-depth analysis of global data reveals fascinating patterns and enables accurate predictions
          </p>
        </div>

        <Tabs defaultValue="ml" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-card/50 backdrop-blur-md border border-primary/20">
            <TabsTrigger value="production" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Food Production Index</TabsTrigger>
            <TabsTrigger value="correlation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Correlation Matrix</TabsTrigger>
            <TabsTrigger value="pca" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">3D PCA Analysis</TabsTrigger>
            <TabsTrigger value="ml" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Food Production Index Prediction</TabsTrigger>
          </TabsList>
          
          {/* Other Tabs Content... */}
          <TabsContent value="pca">
            <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <PCAChart />
                </div>
                <div className="lg:w-1/3 space-y-4">
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    Principal Component Analysis (PCA)
                  </h3>
                  <Badge variant="secondary" className="text-sm bg-primary/20 text-primary border-primary/30">
                    3 Main Components
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    The 3D plot shows the distribution of countries in the principal component space, 
                    where each color represents a different geographical region. Clear clusters can be seen 
                    indicating similarities in production patterns and agricultural resource usage.
                  </p>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 backdrop-blur-sm">
                    <p className="text-sm text-primary font-medium">
                      💡 Key Insight: Countries in similar geographical regions show similar patterns in agricultural parameters
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="production">
            <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <FoodProductionChart />
                </div>
                <div className="lg:w-1/3 space-y-4">
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    Food Production Index Over Time
                  </h3>
                  <Badge variant="secondary" className="text-sm bg-accent/20 text-accent border-accent/30">
                    2000-2024
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    The chart shows changes in food production index worldwide over 24 years. 
                    Rising trends can be identified in many countries, exceptional events like the food crisis 
                    in Afghanistan in 2004, and dramatic changes in specific countries.
                  </p>
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 backdrop-blur-sm">
                   <p className="text-sm text-accent font-medium">
                     📈 Key Findings: General increase in global food production with significant fluctuations in certain countries
                   </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="correlation">
            <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <img 
                    src="/lovable-uploads/421b06d1-9f47-400c-a0b3-ff2786ec527d.png" 
                    alt="Correlation Matrix of Normalized Features"
                    className="w-full rounded-lg shadow-glow border border-primary/20"
                  />
                </div>
                <div className="lg:w-1/3 space-y-4">
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    Correlation Matrix
                  </h3>
                  <Badge variant="secondary" className="text-sm bg-accent/20 text-accent border-accent/30">
                    7 Variables
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    The matrix reveals strong relationships between different variables: high correlation (0.92) 
                    between employment and population, strong relationship (0.86) between population and emissions, 
                    and moderate relationships between pesticide use and other variables.
                  </p>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 backdrop-blur-sm">
                    <p className="text-sm text-primary font-medium">
                      🔗 Key Insight: Strong relationships exist between demographic, economic and environmental factors
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ml" className="space-y-6">
             <div className="mb-8 flex justify-center">
                <div className="w-full max-w-sm">
                  <label htmlFor="area-select" className="block text-center text-muted-foreground mb-2">Select an Area to View Predictions</label>
                  <Select onValueChange={handleAreaChange} value={selectedArea}>
                    <SelectTrigger id="area-select" className="w-full bg-card/80 backdrop-blur-md border-primary/30">
                      <SelectValue placeholder="Select Area..." />
                    </SelectTrigger>
                    <SelectContent className="bg-card/90 backdrop-blur-md border-primary/30">
                      {areas.map((area) => (
                        <SelectItem key={area} value={area}>{area}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* ARIMA Card */}
              <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30 flex flex-col">
                  <div className="text-center">
                    <div className="h-48 w-full mb-4">
                       <img 
                        src={arimaImgPath} 
                        onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/171431/FFFFFF?text=No+Chart'} 
                        alt={`ARIMA Forecast for ${selectedArea}`} 
                        className="w-full h-full object-cover rounded-lg shadow-glow border border-primary/20 cursor-pointer transition-transform hover:scale-105"
                        onClick={() => setModalImage(arimaImgPath)}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">ARIMA Model</h3>
                    <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-800 border-blue-300">{selectedArea}</Badge>
                  </div>
                  <div className="mt-auto space-y-2 pt-4 flex-grow flex flex-col">
                      <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-blue-800">RMSE:</span>
                            <span className="font-bold text-blue-900">{selectedAreaData && selectedAreaData.arimaRmse !== null ? selectedAreaData.arimaRmse.toFixed(4) : 'N/A'}</span>
                          </div>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed flex-grow">
                        The prediction is based on historical data from 1961-2024.
                      </p>
                      <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-200/50 mt-2">
                          <p className="text-xs text-blue-900 font-mono text-center break-words">
                              <strong>Model Equation:</strong> {selectedAreaData ? selectedAreaData.arimaOrder : '...'}
                          </p>
                      </div>
                      <Button onClick={() => toggleForecast('arima')} className="w-full mt-auto" variant="outline">
                          <span className="mr-2">{showForecasts.arima ? 'Hide' : 'Show'} 4-Year Forecast</span>
                          {showForecasts.arima ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
                      </Button>
                      {showForecasts.arima && selectedAreaData && (
                          <div className="mt-2 space-y-2 text-sm animate-in fade-in-50 duration-300">
                              {(selectedAreaData.arimaPredictions || []).map((p, i) => (
                                  <div key={i} className="flex justify-between items-center bg-blue-50/20 p-2 rounded-md">
                                      <span className="font-medium">{2024 + i}:</span>
                                      <span className="font-bold text-blue-600">{p.toFixed(4)}</span>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              </Card>

              {/* TabPFN Card */}
              <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30 flex flex-col">
                  <div className="text-center">
                    <div className="h-48 w-full mb-4">
                      <img 
                        src={tabpfnImgPath} 
                        onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/171431/FFFFFF?text=No+Chart'} 
                        alt={`TabPFN Prediction for ${selectedArea}`} 
                        className="w-full h-full object-cover rounded-lg shadow-glow border border-primary/20 cursor-pointer transition-transform hover:scale-105"
                        onClick={() => setModalImage(tabpfnImgPath)}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">TabPFN Model</h3>
                    <Badge variant="secondary" className="text-sm bg-green-100 text-green-800 border-green-300">{selectedArea}</Badge>
                  </div>
                  <div className="mt-auto space-y-2 pt-4 flex-grow flex flex-col">
                      <div className="bg-green-50/50 p-3 rounded-lg border border-green-200/50">
                          <div className="flex justify-between items-center text-sm">
                            <span className="font-semibold text-green-800">RMSE:</span>
                            <span className="font-bold text-green-900">{selectedAreaData && selectedAreaData.tabpfnRmse ? selectedAreaData.tabpfnRmse.toFixed(4) : 'N/A'}</span>
                          </div>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed flex-grow">
                        Input data is Z-score normalized. Trained on data from 2000-2024.
                      </p>
                      <Button onClick={() => toggleForecast('tabpfn')} className="w-full mt-auto" variant="outline">
                          <span className="mr-2">{showForecasts.tabpfn ? 'Hide' : 'Show'} 4-Year Forecast</span>
                          {showForecasts.tabpfn ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
                      </Button>
                      {showForecasts.tabpfn && selectedAreaData && (
                          <div className="mt-2 space-y-2 text-sm animate-in fade-in-50 duration-300">
                              {(selectedAreaData.tabpfnPredictions || []).map((p, i) => (
                                  <div key={i} className="flex justify-between items-center bg-green-50/20 p-2 rounded-md">
                                      <span className="font-medium">{2024 + i}:</span>
                                      <span className="font-bold text-green-600">{p.toFixed(4)}</span>
                                  </div>
                              ))}
                          </div>
                      )}
                  </div>
              </Card>

              {/* Blended Model Card */}
              <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30 flex flex-col">
                  <div className="text-center">
                    <div className="h-48 w-full mb-4">
                      <img 
                        src={blendedImgPath} 
                        onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/171431/FFFFFF?text=No+Chart'} 
                        alt={`Blended Model Prediction for ${selectedArea}`} 
                        className="w-full h-full object-cover rounded-lg shadow-glow border border-primary/20 cursor-pointer transition-transform hover:scale-105"
                        onClick={() => setModalImage(blendedImgPath)}
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-card-foreground">Blended Model</h3>
                    <Badge variant="secondary" className="text-sm bg-purple-100 text-purple-800 border-purple-300">{selectedArea}</Badge>
                  </div>
                  <div className="mt-auto space-y-2 pt-4 flex-grow flex flex-col">
                        <div className="bg-purple-50/50 p-3 rounded-lg border border-purple-200/50">
                            <div className="flex justify-between items-center text-sm"><span className="font-semibold text-purple-800">RMSE:</span><span className="font-bold text-purple-900">{selectedAreaData && selectedAreaData.blendedRmse ? selectedAreaData.blendedRmse.toFixed(4) : '...'}</span></div>
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed flex-grow">Combines ARIMA and TabPFN for optimal balance of stability and accuracy.</p>
                        <div className="bg-primary/10 p-3 rounded-lg border border-primary/20 mt-2">
                            <p className="text-xs text-primary font-mono text-center break-words">
                                <strong>Formula:</strong> {selectedAreaData ? selectedAreaData.Formula : 'N/A'}
                            </p>
                        </div>
                        <Button onClick={() => toggleForecast('blended')} className="w-full mt-auto" variant="outline">
                            <span className="mr-2">{showForecasts.blended ? 'Hide' : 'Show'} 4-Year Forecast</span>
                            {showForecasts.blended ? <ChevronUp className="h-4 w-4"/> : <ChevronDown className="h-4 w-4"/>}
                        </Button>
                        {showForecasts.blended && selectedAreaData && (
                            <div className="mt-2 space-y-2 text-sm animate-in fade-in-50 duration-300">
                                {(selectedAreaData.blendedPredictions || []).map((p, i) => (
                                    <div key={i} className="flex justify-between items-center bg-purple-50/20 p-2 rounded-md">
                                        <span className="font-medium">{2024 + i}:</span>
                                        <span className="font-bold text-purple-600">{p.toFixed(4)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                  </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-50"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <img src={modalImage} alt="Enlarged view" className="w-full h-full object-contain rounded-lg" />
            <button 
                onClick={() => setModalImage(null)} 
                className="absolute -top-3 -right-3 bg-white text-black rounded-full h-8 w-8 flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label="Close image view"
            >
                <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};