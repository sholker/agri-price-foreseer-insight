import { Card } from "@/components/ui/card";
import { Target, TrendingUp, Globe, Brain } from "lucide-react";

export const ResearchOverview = () => {
  const objectives = [
    {
      icon: Target,
      title: "מטרת המחקר",
      description: "ניתוח מעמיק של מגמות מחירי המזון החקלאי העולמיים ופיתוח מודלים לחיזוי מדויק של שינויים עתידיים במחירים."
    },
    {
      icon: Globe,
      title: "חשיבות עולמית",
      description: "הבנת מגמות מחירי המזון קריטית לביטחון תזונתי עולמי, תכנון חקלאי ויציבות כלכלית במדינות מתפתחות."
    },
    {
      icon: Brain,
      title: "טכנולוגיה מתקדמת",
      description: "שימוש באלגוריתמי למידת מכונה מתקדמים וניתוח רב-משתני לזיהוי דפוסים מורכבים בנתוני המזון העולמיים."
    },
    {
      icon: TrendingUp,
      title: "השפעה מעשית",
      description: "התוצאות מסייעות לקובעי מדיניות, חקלאים וארגונים בינלאומיים בקבלת החלטות מושכלות ומבוססות נתונים."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            על המחקר
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            מחקר חדשני המשלב ניתוח נתונים מתקדם עם טכנולוגיות למידת מכונה 
            לחיזוי מגמות מחירי המזון החקלאי ברחבי העולם
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {objectives.map((objective, index) => (
            <Card 
              key={index} 
              className="p-8 bg-gradient-card border-0 shadow-soft hover:shadow-medium transition-smooth animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-primary rounded-lg shrink-0">
                  <objective.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
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

        <div className="mt-16 bg-gradient-primary rounded-2xl p-8 text-center text-white shadow-glow">
          <h3 className="text-2xl font-semibold mb-4">
            נתונים מ-180+ מדינות • 2000-2024 • 7 משתנים מרכזיים
          </h3>
          <p className="text-white/90 text-lg">
            ניתוח מקיף של נתוני ייצור מזון, שימוש בחומרי הדברה, אמיסות, אוכלוסייה ועוד
          </p>
        </div>
      </div>
    </section>
  );
};