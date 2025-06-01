import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SourceDataItem {
  name: string;
  value: number; // monetary value for pie chart calculation
  displayValue: number; // monetary value for legend display (can be different)
  percentage: number; // percentage for legend display
  color: string; // hex color
}

const sourceChartData: SourceDataItem[] = [
  { name: 'Clutch', value: 3000, displayValue: 3000, percentage: 50, color: 'hsl(10 85.9% 61.2%)' }, // destructive red
  { name: 'Behance', value: 2400, displayValue: 1000, percentage: 40, color: 'hsl(38 100% 70.2%)' }, // prd-accent-yellow. Value adjusted for pie if total is 6000 and 40%
  { name: 'Instagram', value: 600, displayValue: 1000, percentage: 10, color: '#4FD1C5' }, // Teal. Value adjusted for pie.
  { name: 'Dribbble', value: 600, displayValue: 1000, percentage: 10, color: 'hsl(122 39.4% 49.2%)' }, // prd-accent-green. Value adjusted for pie.
];
// Note: Image percentages (50,40,10,10) sum to 110%. For pie chart, 'value' must be proportional.
// Assuming total value of $6000 for pie. Then 50%=$3000, 40%=$2400, 10%=$600, 10%=$600. 'displayValue' from image.

const RADIAN = Math.PI / 180;
interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const SourceChart: React.FC<{ className?: string }> = ({ className }) => {

  const CustomLegend = () => (
    <ul className="space-y-2.5 text-sm mt-6">
      {sourceChartData.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center justify-between">
          <div className="flex items-center">
            <span style={{ backgroundColor: entry.color }} className="w-2.5 h-2.5 rounded-sm mr-2.5 flex-shrink-0" />
            <span className="text-foreground">{entry.name}</span>
          </div>
          <div className="flex items-center ml-2">
            <span className="text-muted-foreground w-16 sm:w-20 text-right tabular-nums">${entry.displayValue.toLocaleString()}</span>
            <span className="text-foreground w-10 sm:w-12 text-right tabular-nums">{entry.percentage}%</span>
            {entry.name === 'Dribbble' && (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <span className="ml-1.5 text-xs bg-slate-700 text-white px-1.5 py-0.5 rounded-sm cursor-default whitespace-nowrap">
                      from leads total
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Percentage based on total leads from this source.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </li>
      ))}
    </ul>
  );

  return (
    <Card className={cn("shadow-sm w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full flex justify-center items-center"> 
          <ResponsiveContainer width="80%" height="100%"> 
            <PieChart>
              <RechartsTooltip
                formatter={(value: number, name: string, props: any) => {
                  const originalItem = sourceChartData.find(d => d.name === props.payload.name);
                  return [`$${originalItem?.displayValue.toLocaleString()} (${originalItem?.percentage}%)`, originalItem?.name];
                }}
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                labelStyle={{ color: 'hsl(var(--card-foreground))' }}
              />
              <Pie
                data={sourceChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={90}
                innerRadius={60} 
                fill="#8884d8"
                dataKey="value" 
                nameKey="name"
                paddingAngle={1}
              >
                {sourceChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <CustomLegend />
      </CardContent>
    </Card>
  );
};

export default SourceChart;
