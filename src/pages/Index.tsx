import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { VideoExplanation } from "@/components/VideoExplanation";
import { ResearchOverview } from "@/components/ResearchOverview";
import { ResearchResults } from "@/components/ResearchResults";
import { Methodology } from "@/components/Methodology";
import { Footer } from "@/components/Footer";
import Navigation from "@/components/Navigation";

const Index = () => {
  useEffect(() => {
    document.title = "Food Production Index Research";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <VideoExplanation />
      <ResearchOverview />
      <ResearchResults />
      <Methodology />
      <Footer />
    </div>
  );
};

export default Index;
