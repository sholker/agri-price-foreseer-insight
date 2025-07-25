import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";

export const VideoExplanation = () => {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            סרטון הסבר
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            צפו בסרטון ההסבר המפרט על המחקר ותוצאותיו
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-6 bg-gradient-card shadow-space border border-primary/20">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                src="https://drive.google.com/file/d/1lE6Clf-sJA_Qyvl7c5juEJj2AQt8y8TX/preview"
                width="100%"
                height="100%"
                className="absolute inset-0"
                allow="autoplay"
                title="סרטון הסבר המחקר"
              ></iframe>
            </div>
            
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <Play className="w-4 h-4" />
                <span>סרטון הסבר על מחקר חיזוי מחירי המזון החקלאי</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
