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
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">About the Research</h3>
            <p className="text-muted-foreground leading-relaxed">
              Innovative research in the field of agricultural food production analysis and prediction 
              using advanced machine learning technologies in a global environment.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Research Topics</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Agricultural Big Data Analysis</li>
              <li>• Machine Learning and Prediction</li>
              <li>• Global Food Security</li>
              <li>• Agricultural Economics</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-card-foreground">Article Authors</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Ori Shai</li>
              <li>• Daniel Roei</li>
              <li>• Neta Tevet</li>
              <li>• Supervised by Dr. Abraham Yosipof</li>
              <li>• Final Project - Academic Center for Law and Business</li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-primary/30 mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Agricultural Food Production Analysis and Prediction Research. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
