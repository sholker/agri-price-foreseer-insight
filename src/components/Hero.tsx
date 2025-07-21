import { Button } from "@/components/ui/button";
import { ArrowDown, BarChart3, TrendingUp } from "lucide-react";

export const Hero = () => {
  const scrollToResults = () => {
    const resultsSection = document.getElementById('results');
    resultsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-20 h-20 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-16 h-16 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-12 h-12 bg-white rounded-full animate-pulse delay-500"></div>
      </div>
      
      <div className="container mx-auto px-6 text-center text-white relative z-10">
        <div className="animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <BarChart3 className="w-12 h-12" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            ניתוח וניבוי
            <span className="block bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
              מדד מחירי המזון
            </span>
            החקלאי
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            מחקר מתקדם לחיזוי מגמות מחירי המזון החקלאי באמצעות ניתוח נתונים ולמידת מכונה
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="hero" 
              size="lg"
              onClick={scrollToResults}
              className="text-lg px-8 py-4"
            >
              <TrendingUp className="ml-2" />
              צפה בתוצאות המחקר
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              על המתודולוגיה
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-white/70" />
        </div>
      </div>
    </section>
  );
};