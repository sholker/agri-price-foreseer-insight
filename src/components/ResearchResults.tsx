import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PCAChart } from "./PCAChart";

export const ResearchResults = () => {
  return (
    <section id="results" className="py-20 bg-gradient-space relative">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-primary rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6">
            תוצאות המחקר
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            ניתוח מעמיק של נתונים עולמיים חושף דפוסים מרתקים ומאפשר חיזויים מדויקים
          </p>
        </div>

        <Tabs defaultValue="pca" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-card/50 backdrop-blur-md border border-primary/20">
            <TabsTrigger value="pca" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">ניתוח PCA תלת-ממדי</TabsTrigger>
            <TabsTrigger value="production" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">מדד ייצור מזון</TabsTrigger>
            <TabsTrigger value="correlation" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">מטריצת קורלציה</TabsTrigger>
          </TabsList>

          <TabsContent value="pca" className="space-y-6">
            <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <PCAChart />
                </div>
                <div className="lg:w-1/3 space-y-4">
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    ניתוח רכיבים עיקריים (PCA)
                  </h3>
                  <Badge variant="secondary" className="text-sm bg-primary/20 text-primary border-primary/30">
                    3 רכיבים ראשיים
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    הגרף התלת-ממדי מציג את התפלגות המדינות במרחב הרכיבים העיקריים, 
                    כאשר כל צבע מייצג אזור גיאוגרפי שונה. ניתן לראות קיבוצים ברורים 
                    המצביעים על דמיון בדפוסי ייצור ושימוש במשאבים חקלאיים.
                  </p>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 backdrop-blur-sm">
                    <p className="text-sm text-primary font-medium">
                      💡 תובנה מרכזית: מדינות באזורים גיאוגרפיים דומים מציגות דפוסים דומים בפרמטרים החקלאיים
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="production" className="space-y-6">
            <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <img 
                    src="/lovable-uploads/f0e8c07e-0aa6-439a-a925-4c53e14bb8c9.png" 
                    alt="Food Production Index Over Time by Area"
                    className="w-full rounded-lg shadow-glow border border-primary/20"
                  />
                </div>
                <div className="lg:w-1/3 space-y-4">
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    מדד ייצור מזון לאורך זמן
                  </h3>
                  <Badge variant="secondary" className="text-sm bg-accent/20 text-accent border-accent/30">
                    2000-2024
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    הגרף מציג את השינויים במדד ייצור המזון ברחבי העולם לאורך 24 שנים. 
                    ניתן לזהות מגמות עלייה בכמות המדינות, אירועים חריגים כמו משבר המזון 
                    באפגניסטן ב-2004, ושינויים דרמטיים במדינות ספציפיות.
                  </p>
                  <div className="bg-accent/10 p-4 rounded-lg border border-accent/20 backdrop-blur-sm">
                    <p className="text-sm text-accent-foreground font-medium">
                      📈 עיקר הממצאים: עלייה כללית בייצור המזון העולמי עם תנודות משמעותיות במדינות מסוימות
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>


          <TabsContent value="correlation" className="space-y-6">
            <Card className="p-6 bg-card/80 backdrop-blur-md shadow-space border border-primary/30">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-2/3">
                  <img 
                    src="/lovable-uploads/421b06d1-9f47-400c-a0b3-ff2786ec527d.png" 
                    alt="Correlation Matrix of Normalized Features"
                    className="w-full rounded-lg shadow-glow border border-primary/20"
                  />
                </div>
                <div className="lg:w-1/3 space-y-4">
                  <h3 className="text-2xl font-semibold text-card-foreground">
                    מטריצת קורלציה
                  </h3>
                  <Badge variant="secondary" className="text-sm bg-accent/20 text-accent border-accent/30">
                    7 משתנים
                  </Badge>
                  <p className="text-muted-foreground leading-relaxed">
                    המטריצה חושפת קשרים חזקים בין משתנים שונים: קורלציה גבוהה (0.92) 
                    בין תעסוקה לאוכלוסייה, קשר חזק (0.86) בין אוכלוסייה לאמיסות, 
                    וקשרים מתונים בין שימוש בחומרי הדברה למשתנים אחרים.
                  </p>
                  <div className="bg-primary/10 p-4 rounded-lg border border-primary/20 backdrop-blur-sm">
                    <p className="text-sm text-primary font-medium">
                      🔗 תובנה מרכזית: קיימים קשרים חזקים בין גורמים דמוגרפיים, כלכליים וסביבתיים
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};