import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, BarChart3, Brain, CheckCircle, ChevronDown } from "lucide-react";
import { MethodologyMindmap } from "./MethodologyMindmap";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Methodology = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const steps = [
    {
      icon: Database,
      title: "איסוף וניקוי נתונים",
      description: "איסוף נתונים מ-180+ מדינות מ-2000 עד 2024, כולל מדדי ייצור מזון, שימוש בחומרי הדברה, אמיסות פחמן, נתוני אוכלוסייה ותעסוקה.",
      details: ["נרמול נתונים לפי Z-score", "טיפול בערכים חסרים", "סינון ותיקוף איכות הנתונים"]
    },
    {
      icon: BarChart3,
      title: "ניתוח רכיבים עיקריים (PCA)",
      description: "הפחתת מימד הנתונים לזיהוי הרכיבים המשפיעים ביותר על מחירי המזון ויצירת הדמיה תלת-ממדית של הנתונים.",
      details: ["הסבר 85% מהשונות", "3 רכיבים עיקריים", "זיהוי קיבוצים גיאוגרפיים"]
    },
    {
      icon: Brain,
      title: "למידת מכונה וחיזוי",
      description: "פיתוח מודלים מתקדמים לחיזוי מגמות מחירי המזון באמצעות אלגוריתמי Random Forest וטכניקות אנסמבל.",
      details: ["אימות צולב", "אופטימיזציה של היפר-פרמטרים", "הערכת דיוק המודל"]
    },
    {
      icon: CheckCircle,
      title: "אימות תוצאות",
      description: "בדיקת מטריצות קורלציה, ניתוח חשיבות משתנים ואימות התוצאות מול נתונים היסטוריים ידועים.",
      details: ["מטריצת קורלציה", "ניתוח רגישות", "בדיקת עקביות"]
    }
  ];

  return (
    <section id="methodology" className="py-20 bg-card relative overflow-hidden">
      {/* Background cosmic elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-24 h-24 bg-primary rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-accent rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
            מתודולוגיית המחקר
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            תהליך מחקר מקיף המשלב טכניקות מתקדמות בביג דאטה ולמידת מכונה
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="bg-gradient-card shadow-space hover:shadow-glow transition-smooth border border-primary/20 backdrop-blur-sm overflow-hidden">
            <div 
              className="p-6 cursor-pointer flex justify-between items-center"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <h3 className="text-2xl font-semibold text-card-foreground">
                הצג את תהליך המחקר האינטראקטיבי
              </h3>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-6 h-6 text-primary" />
              </motion.div>
            </div>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  key="methodology-content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1, transition: { height: { duration: 0.4 }, opacity: { duration: 0.3, delay: 0.1 } } }}
                  exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.4 }, opacity: { duration: 0.2 } } }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t border-primary/20">
                    <div className="mb-12">
                      <p className="text-center text-muted-foreground mb-4">זוהי מפת חשיבה אינטראקטיבית המציגה את הקשרים בין שלבי המחקר. ניתן ללחוץ, לגרור ולהתמקד בכל שלב.</p>
                      <MethodologyMindmap />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {steps.map((step, index) => (
                        <Card 
                          key={index}
                          className="p-6 bg-gradient-card shadow-inner-glow border border-primary/10"
                        >
                          <div className="flex items-start gap-4">
                            <div className="p-3 bg-gradient-primary rounded-lg shrink-0 shadow-glow">
                              <step.icon className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3 className="text-xl font-semibold text-card-foreground">
                                  {step.title}
                                </h3>
                                <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                                  שלב {index + 1}
                                </Badge>
                              </div>
                              <p className="text-muted-foreground mb-4 leading-relaxed">
                                {step.description}
                              </p>
                              <div className="space-y-2">
                                {step.details.map((detail, detailIndex) => (
                                  <div key={detailIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-glow"></div>
                                    {detail}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          <div className="mt-12 bg-gradient-primary rounded-2xl p-8 text-center text-white shadow-space border border-primary/30">
            <h3 className="text-2xl font-semibold mb-4">
              דיוק חיזוי של 82%+ • זמן עיבוד מהיר • ניתוח זמן אמת
            </h3>
            <p className="text-white/90 text-lg">
              המתודולוגיה שפותחה מאפשרת חיזויים מדויקים ומהירים לקובעי מדיניות
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
