import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, BarChart3, Brain, CheckCircle } from "lucide-react";
import { MethodologyMindmap } from "./MethodologyMindmap";

export const Methodology = () => {
  const steps = [
    {
      icon: Database,
      title: "Data Collection and Cleaning",
      description: "Collection of data from 180+ countries from 2000 to 2024, including food production indices, pesticide use, carbon emissions, population and employment data.",
      details: ["Data normalization by Z-score", "Handling missing values", "Data quality filtering and validation"]
    },
    {
      icon: BarChart3,
      title: "Principal Component Analysis (PCA)",
      description: "Dimensionality reduction to identify the most influential components on food prices and create three-dimensional data visualization.",
      details: ["Explains 85% of variance", "3 main components", "Geographic clustering identification"]
    },
    {
      icon: Brain,
      title: "Machine Learning and Prediction",
      description: "Development of advanced models for predicting food price trends using Random Forest algorithms and ensemble techniques.",
      details: ["Cross-validation", "Hyperparameter optimization", "Model accuracy assessment"]
    },
    {
      icon: CheckCircle,
      title: "Results Validation",
      description: "Testing correlation matrices, variable importance analysis, and validating results against known historical data.",
      details: ["Correlation matrix", "Sensitivity analysis", "Consistency testing"]
    }
  ];

  return (
    <section id="methodology" className="py-20 bg-card relative overflow-hidden">
      {/* Background cosmic elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-24 h-24 bg-primary rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-accent rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
            Research Methodology
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive research process combining advanced big data and machine learning techniques
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <MethodologyMindmap />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, index) => (
              <Card 
                key={index}
                className="p-6 bg-gradient-card shadow-space hover:shadow-glow transition-smooth border border-primary/20 backdrop-blur-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-primary rounded-lg shrink-0 shadow-glow">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-card-foreground">
                        {step.title}
                      </h3>
                      <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                        Step {index + 1}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-glow"></div>
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-gradient-primary rounded-2xl p-8 text-center text-white shadow-space border border-primary/30">
            <h3 className="text-2xl font-semibold mb-4">
              82%+ Prediction Accuracy • Fast Processing Time • Real-time Analysis
            </h3>
            <p className="text-white/90 text-lg">
              The developed methodology enables accurate and fast predictions for policymakers
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};