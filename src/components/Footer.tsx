import { Mail, Linkedin, Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">על המחקר</h3>
            <p className="text-background/80 leading-relaxed">
              מחקר חדשני בתחום ניתוח וחיזוי מחירי המזון החקלאי 
              באמצעות טכנולוגיות למידת מכונה מתקדמות.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">נושאי מחקר</h3>
            <ul className="space-y-2 text-background/80">
              <li>• ניתוח נתוני ביג דאטה חקלאיים</li>
              <li>• למידת מכונה וחיזוי</li>
              <li>• ביטחון תזונתי עולמי</li>
              <li>• כלכלה חקלאית</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">צור קשר</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-background/10 rounded-lg hover:bg-background/20 transition-smooth">
                <Mail className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-lg hover:bg-background/20 transition-smooth">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background/10 rounded-lg hover:bg-background/20 transition-smooth">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
          <p>&copy; 2024 מחקר ניתוח וחיזוי מחירי המזון החקלאי. כל הזכויות שמורות.</p>
        </div>
      </div>
    </footer>
  );
};