import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PCAChart } from "./PCAChart";
import { FoodProductionChart } from "./FoodProductionChart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ResearchResults = () => {
  const [areas, setAreas] = useState([]);
  const [predictionData, setPredictionData] = useState([]);
  const [selectedArea, setSelectedArea] = useState('Israel');

  useEffect(() => {
    // Fetch and parse the prediction data from the CSV file
    fetch('/lovable-uploads/df_predictions_2026.csv')
      .then(response => response.text())
      .then(csvText => {
        const lines = csvText.trim().split('\n');
        // Skip header line and parse data
        const data = lines.slice(1).map(line => {
          const parts = line.split(',');
          const area = parts[0];
          const prediction = parseFloat(parts[1]);
          const formula = parts.slice(2).join(',');
          return {
            Area: area,
            Prediction_2026: prediction,
            Formula: formula,
          };
        }).filter(item => item.Area); // Filter out any empty lines

        setPredictionData(data);
        const sortedAreas = data.map(d => d.Area).sort();
        setAreas(sortedAreas);
        
        // Set default selected area if Israel exists
        if (!sortedAreas.includes('Israel') && sortedAreas.length > 0) {
          setSelectedArea(sortedAreas[0]);
        }
      });
  }, []);

  const handleAreaChange = (value) => {
    setSelectedArea(value);
  };

  const selectedAreaData = predictionData.find(d => d.Area === selectedArea);
  
  // Construct image paths based on the selected area
  const arimaImgPath = `/lovable-uploads/results/ARIMA/${selectedArea}.png`;
  const tabpfnImgPath = `/lovable-uploads/results/tabpFN/${selectedArea}.png`;
  const blendedImgPath = `/lovable-uploads/results/blanded/${selectedArea}.png`;

  return (
    <section id="results" className="py-20 bg-gradient-space relative">
      {/* Animated background particles */}
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

        <Tabs defaultValue="production" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-card/50 backdrop-blur-md border border-primary/20">
            <TabsTrigger value="production" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Food Production Index</TabsTrigger>
            <TabsTrigger value="correlation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Correlation Matrix</TabsTrigger>
            <TabsTrigger value="pca" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">3D PCA Analysis</TabsTrigger>
            <TabsTrigger value="ml" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Food Production Index Prediction</TabsTrigger>
          </TabsList>

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
                  <Select onValueChange={handleAreaChange} defaultValue={selectedArea}>
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
              <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30">
                <div className="space-y-4">
                  <div className="text-center">
                    <img src={arimaImgPath} alt={`ARIMA Forecast for ${selectedArea}`} className="w-full rounded-lg shadow-glow border border-primary/20 mb-4" />
                    <h3 className="text-xl font-semibold text-card-foreground">ARIMA Model</h3>
                    <Badge variant="secondary" className="text-sm bg-blue-100 text-blue-800 border-blue-300">{selectedArea}</Badge>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex justify-between items-center"><span className="font-semibold text-blue-800">RMSE:</span><span className="font-bold text-lg text-blue-900">2.15</span></div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">ARIMA (1,1,1) model based on historical data provides linear short-term forecasting.</p>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30">
                <div className="space-y-4">
                  <div className="text-center">
                    <img src={tabpfnImgPath} alt={`TabPFN Food Value Prediction for ${selectedArea}`} className="w-full rounded-lg shadow-glow border border-primary/20 mb-4" />
                    <h3 className="text-xl font-semibold text-card-foreground">TabPFN Model</h3>
                    <Badge variant="secondary" className="text-sm bg-green-100 text-green-800 border-green-300">{selectedArea}</Badge>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center"><span className="font-semibold text-green-800">RMSE:</span><span className="font-bold text-lg text-green-900">0.0386</span></div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">TabPFN model shows exceptionally high accuracy thanks to advanced learning methods and optimization.</p>
                </div>
              </Card>

              <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30">
                <div className="space-y-4">
                  <div className="text-center">
                    <img src={blendedImgPath} alt={`Model Prediction Comparison for ${selectedArea}`} className="w-full rounded-lg shadow-glow border border-primary/20 mb-4" />
                    <h3 className="text-xl font-semibold text-card-foreground">Blended Model</h3>
                    <Badge variant="secondary" className="text-sm bg-purple-100 text-purple-800 border-purple-300">{selectedArea}</Badge>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <div className="flex justify-between items-center"><span className="font-semibold text-purple-800">RMSE:</span><span className="font-bold text-lg text-purple-900">0.1155</span></div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">Combination of ARIMA and TabPFN that balances stability and accuracy for optimal prediction.</p>
                </div>
              </Card>
            </div>

             {selectedAreaData && (
                <Card className="mt-8 p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30">
                    <h3 className="text-2xl font-semibold text-card-foreground text-center mb-4">
                        2026 Prediction for {selectedArea}
                    </h3>
                    <div className="text-center mb-4">
                        <p className="text-5xl font-bold text-primary">{selectedAreaData.Prediction_2026.toFixed(4)}</p>
                        <p className="text-sm text-muted-foreground">Predicted Food Production Index</p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 backdrop-blur-sm">
                        <p className="text-xs text-primary font-mono text-center break-words">
                           <strong>Formula:</strong> {selectedAreaData.Formula}
                        </p>
                  </div>
                </Card>
            )}

          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
