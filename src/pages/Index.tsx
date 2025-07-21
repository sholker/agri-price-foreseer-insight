import { Hero } from "@/components/Hero";
import { ResearchOverview } from "@/components/ResearchOverview";
import { ResearchResults } from "@/components/ResearchResults";
import { Methodology } from "@/components/Methodology";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ResearchOverview />
      <ResearchResults />
      <Methodology />
      <Footer />
    </div>
  );
};

export default Index;
