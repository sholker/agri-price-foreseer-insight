import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Globe, Brain } from "lucide-react";

export const ResearchOverview = () => {
  const objectives = [
    {
      icon: Target,
      title: "Research Objective",
      description: "In-depth analysis of global agricultural food price trends and development of models for accurate prediction of future price changes."
    },
    {
      icon: Globe,
      title: "Global Importance",
      description: "Understanding food price trends is critical for global food security, agricultural planning, and economic stability in developing countries."
    },
    {
      icon: Brain,
      title: "Advanced Technology",
      description: "Using advanced machine learning algorithms and multivariate analysis to identify complex patterns in global food data."
    },
    {
      icon: TrendingUp,
      title: "Practical Impact",
      description: "Results help policymakers, farmers, and international organizations make informed and data-driven decisions."
    }
  ];

  return (
    <section id="overview" className="py-20 bg-card relative overflow-hidden">
      {/* Subtle space-themed background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
            About the Research
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Innovative research combining advanced data analysis with machine learning technologies 
            to predict agricultural food price trends worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {objectives.map((objective, index) => (
            <Card 
              key={index} 
              className="p-8 bg-gradient-card shadow-space hover:shadow-glow transition-smooth border border-primary/20 backdrop-blur-sm animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-primary rounded-lg shrink-0 shadow-glow">
                  <objective.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    {objective.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {objective.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-primary rounded-2xl p-8 text-center text-white shadow-space border border-primary/30">
          <h3 className="text-2xl font-semibold mb-4">
            Data from 180+ Countries • 2000-2024 • 7 Key Variables
          </h3>
          <p className="text-white/90 text-lg">
            Comprehensive analysis of food production data, pesticide use, carbon emissions, population density and more
          </p>
        </div>
      </div>
    </section>
  );
};
