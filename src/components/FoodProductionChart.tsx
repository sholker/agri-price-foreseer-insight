import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";

// Sample data structure - in a real app this would come from an API
const sampleData = {
  "Israel": [
    { year: 2000, value: 89.2 },
    { year: 2001, value: 91.5 },
    { year: 2002, value: 93.1 },
    { year: 2003, value: 95.8 },
    { year: 2004, value: 98.2 },
    { year: 2005, value: 100.4 },
    { year: 2006, value: 102.1 },
    { year: 2007, value: 104.5 },
    { year: 2008, value: 106.8 },
    { year: 2009, value: 108.2 },
    { year: 2010, value: 110.6 },
    { year: 2011, value: 112.3 },
    { year: 2012, value: 114.8 },
    { year: 2013, value: 116.9 },
    { year: 2014, value: 118.5 },
    { year: 2015, value: 120.1 },
    { year: 2016, value: 122.4 },
    { year: 2017, value: 124.7 },
    { year: 2018, value: 126.8 },
    { year: 2019, value: 128.9 },
    { year: 2020, value: 130.2 },
    { year: 2021, value: 132.1 },
    { year: 2022, value: 134.5 },
    { year: 2023, value: 136.2 },
    { year: 2024, value: 138.1 }
  ],
  "United States": [
    { year: 2000, value: 95.1 },
    { year: 2001, value: 96.8 },
    { year: 2002, value: 98.4 },
    { year: 2003, value: 100.2 },
    { year: 2004, value: 102.8 },
    { year: 2005, value: 105.1 },
    { year: 2006, value: 107.3 },
    { year: 2007, value: 109.8 },
    { year: 2008, value: 112.2 },
    { year: 2009, value: 114.5 },
    { year: 2010, value: 116.9 },
    { year: 2011, value: 119.2 },
    { year: 2012, value: 121.8 },
    { year: 2013, value: 124.1 },
    { year: 2014, value: 126.5 },
    { year: 2015, value: 128.9 },
    { year: 2016, value: 131.2 },
    { year: 2017, value: 133.6 },
    { year: 2018, value: 135.8 },
    { year: 2019, value: 138.1 },
    { year: 2020, value: 140.3 },
    { year: 2021, value: 142.7 },
    { year: 2022, value: 145.2 },
    { year: 2023, value: 147.8 },
    { year: 2024, value: 150.1 }
  ],
  "China": [
    { year: 2000, value: 78.5 },
    { year: 2001, value: 81.2 },
    { year: 2002, value: 84.8 },
    { year: 2003, value: 88.9 },
    { year: 2004, value: 93.2 },
    { year: 2005, value: 97.8 },
    { year: 2006, value: 102.5 },
    { year: 2007, value: 107.3 },
    { year: 2008, value: 112.8 },
    { year: 2009, value: 118.4 },
    { year: 2010, value: 124.2 },
    { year: 2011, value: 130.1 },
    { year: 2012, value: 136.5 },
    { year: 2013, value: 142.8 },
    { year: 2014, value: 149.2 },
    { year: 2015, value: 155.7 },
    { year: 2016, value: 162.3 },
    { year: 2017, value: 168.9 },
    { year: 2018, value: 175.6 },
    { year: 2019, value: 182.1 },
    { year: 2020, value: 188.8 },
    { year: 2021, value: 195.4 },
    { year: 2022, value: 202.3 },
    { year: 2023, value: 209.1 },
    { year: 2024, value: 216.2 }
  ],
  "Brazil": [
    { year: 2000, value: 85.3 },
    { year: 2001, value: 88.7 },
    { year: 2002, value: 92.1 },
    { year: 2003, value: 95.8 },
    { year: 2004, value: 99.4 },
    { year: 2005, value: 103.2 },
    { year: 2006, value: 107.1 },
    { year: 2007, value: 111.5 },
    { year: 2008, value: 115.8 },
    { year: 2009, value: 120.3 },
    { year: 2010, value: 124.9 },
    { year: 2011, value: 129.4 },
    { year: 2012, value: 134.2 },
    { year: 2013, value: 138.8 },
    { year: 2014, value: 143.5 },
    { year: 2015, value: 148.1 },
    { year: 2016, value: 152.9 },
    { year: 2017, value: 157.6 },
    { year: 2018, value: 162.4 },
    { year: 2019, value: 167.2 },
    { year: 2020, value: 172.1 },
    { year: 2021, value: 177.0 },
    { year: 2022, value: 182.1 },
    { year: 2023, value: 187.3 },
    { year: 2024, value: 192.5 }
  ],
  "India": [
    { year: 2000, value: 82.1 },
    { year: 2001, value: 84.9 },
    { year: 2002, value: 87.8 },
    { year: 2003, value: 90.7 },
    { year: 2004, value: 93.8 },
    { year: 2005, value: 97.1 },
    { year: 2006, value: 100.5 },
    { year: 2007, value: 104.2 },
    { year: 2008, value: 108.1 },
    { year: 2009, value: 112.3 },
    { year: 2010, value: 116.7 },
    { year: 2011, value: 121.4 },
    { year: 2012, value: 126.3 },
    { year: 2013, value: 131.5 },
    { year: 2014, value: 136.9 },
    { year: 2015, value: 142.6 },
    { year: 2016, value: 148.5 },
    { year: 2017, value: 154.7 },
    { year: 2018, value: 161.2 },
    { year: 2019, value: 167.9 },
    { year: 2020, value: 174.8 },
    { year: 2021, value: 182.1 },
    { year: 2022, value: 189.6 },
    { year: 2023, value: 197.4 },
    { year: 2024, value: 205.5 }
  ]
};

const countryColors = {
  "Israel": "#2563eb",
  "United States": "#dc2626",
  "China": "#ea580c",
  "Brazil": "#16a34a",
  "India": "#9333ea"
};

export const FoodProductionChart = () => {
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["Israel", "United States", "China"]);
  
  const availableCountries = Object.keys(sampleData);
  
  const handleCountryToggle = (country: string, checked: boolean) => {
    if (checked) {
      setSelectedCountries(prev => [...prev, country]);
    } else {
      setSelectedCountries(prev => prev.filter(c => c !== country));
    }
  };

  // Combine data for selected countries
  const chartData = React.useMemo(() => {
    const years = Array.from(new Set(
      Object.values(sampleData).flat().map(d => d.year)
    )).sort();
    
    return years.map(year => {
      const dataPoint: any = { year };
      selectedCountries.forEach(country => {
        const countryData = sampleData[country as keyof typeof sampleData];
        const yearData = countryData?.find(d => d.year === year);
        dataPoint[country] = yearData?.value || null;
      });
      return dataPoint;
    });
  }, [selectedCountries]);

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-card/80 backdrop-blur-md border border-primary/20">
        <h4 className="font-semibold text-card-foreground mb-3">Select Countries</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableCountries.map(country => (
            <div key={country} className="flex items-center space-x-2">
              <Checkbox
                id={country}
                checked={selectedCountries.includes(country)}
                onCheckedChange={(checked) => handleCountryToggle(country, checked as boolean)}
              />
              <label 
                htmlFor={country}
                className="text-sm font-medium text-card-foreground cursor-pointer"
              >
                {country}
              </label>
            </div>
          ))}
        </div>
      </Card>
      
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="year" 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
            />
            <YAxis 
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              label={{ 
                value: 'Food Production Index', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: 'hsl(var(--muted-foreground))' }
              }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--card-foreground))'
              }}
            />
            <Legend />
            {selectedCountries.map(country => (
              <Line
                key={country}
                type="monotone"
                dataKey={country}
                stroke={countryColors[country as keyof typeof countryColors]}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                connectNulls={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};