import { Hero } from "@/components/Hero";
import { ResearchOverview } from "@/components/ResearchOverview";
import { ResearchResults } from "@/components/ResearchResults";
import { Methodology } from "@/components/Methodology";
import { Footer } from "@/components/Footer";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      <Hero />
      <ResearchOverview />
      <ResearchResults />
      <Methodology />
      <Footer />
    </div>
  );
};

export default Index;
