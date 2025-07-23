import { Mail, Linkedin, Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="contact" className="bg-gradient-space relative overflow-hidden py-12 border-t border-primary/20">
      {/* Subtle starfield background */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">על המחקר</h3>
            <p className="text-muted-foreground leading-relaxed">
              מחקר חדשני בתחום ניתוח וחיזוי מחירי המזון החקלאי 
              באמצעות טכנולוגיות למידת מכונה מתקדמות בסביבה גלובלית.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">נושאי מחקר</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• ניתוח נתוני ביג דאטה חקלאיים</li>
              <li>• למידת מכונה וחיזוי</li>
              <li>• ביטחון תזונתי עולמי</li>
              <li>• כלכלה חקלאית</li>
            </ul>
          </div>
          
          </div>
        </div>
        
        <div className="border-t border-primary/30 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 מחקר ניתוח וחיזוי מחירי המזון החקלאי. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};
