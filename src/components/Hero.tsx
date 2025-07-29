import { Button } from "@/components/ui/button";
import { ArrowDown, BarChart3, TrendingUp } from "lucide-react";
export const Hero = () => {
  const scrollToResults = () => {
    const resultsSection = document.getElementById('results');
    resultsSection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  const scrollToMethodology = () => {
    const methodologySection = document.getElementById('methodology');
    methodologySection?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-space overflow-hidden">
      {/* Space Background with Stars */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        {/* Animated stars */}
        {Array.from({
        length: 100
      }).map((_, i) => <div key={i} className="absolute w-1 h-1 bg-white rounded-full animate-pulse" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }} />)}
        
        {/* Central Earth-like globe representing global food systems */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            <div className="w-96 h-96 lg:w-[500px] lg:h-[500px] rounded-full bg-gradient-earth opacity-30 blur-sm animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-earth opacity-20 animate-spin" style={{
            animationDuration: '120s'
          }}></div>
          </div>
        </div>

        {/* Glowing atmospheric effect */}
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 text-center text-white relative z-20">
        <div className="animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-card/20 backdrop-blur-md rounded-full border border-primary/30 shadow-glow">
              <BarChart3 className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight shadow-space">
            Analysis and Prediction
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              Agricultural Food
            </span>
            Food Production Index
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Advanced research for predicting agricultural food price trends using data analysis and machine learning
          </p>
          <p className="text-xl md:text-1xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">Ori Shai · Daniel Roei · Neta Tevet</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-[11px] mx-[488px] my-0 py-[31px]">
            <Button variant="space" size="lg" onClick={scrollToResults} className="text-lg px-8 py-4">
              <TrendingUp className="mr-2" />
              View Research Results
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToMethodology} className="text-lg px-8 py-4 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm">
              About Methodology
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-8 h-8 text-white/70" />
        </div>
      </div>

      {/* Floating Data Visualization Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 bg-card/20 rounded-lg backdrop-blur-md border border-primary/30 flex items-center justify-center shadow-glow">
            <span className="text-primary text-3xl">📊</span>
          </div>
        </div>
        <div className="absolute top-32 right-16 animate-float delay-1000">
          <div className="w-24 h-24 bg-card/15 rounded-full backdrop-blur-md border border-accent/30 flex items-center justify-center shadow-glow">
            <span className="text-accent text-3xl">🌾</span>
          </div>
        </div>
        <div className="absolute bottom-24 left-20 animate-float delay-500">
          <div className="w-16 h-16 bg-card/25 rounded-lg backdrop-blur-md border border-primary/40 flex items-center justify-center shadow-glow">
            <span className="text-primary text-2xl">💹</span>
          </div>
        </div>
        <div className="absolute top-1/2 right-8 animate-float delay-2000">
          <div className="w-18 h-18 bg-card/20 rounded-full backdrop-blur-md border border-accent/25 flex items-center justify-center shadow-glow">
            <span className="text-accent text-2xl">🌍</span>
          </div>
        </div>
      </div>
    </section>;
};
