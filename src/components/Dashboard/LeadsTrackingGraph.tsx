import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CalendarDays, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from 'recharts';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'March', closedWon: 65, closedLost: 85 },
  { month: 'April', closedWon: 40, closedLost: 60 },
  { month: 'May', closedWon: 80, closedLost: 30 },
  { month: 'June', closedWon: 65, closedLost: 5 },
  { month: 'July', closedWon: 85, closedLost: 40 },
  { month: 'August', closedWon: 30, closedLost: 95 },
];

const LeadsTrackingGraph: React.FC<{ className?: string }> = ({ className }) => {
  const [selectedTimeframe, setSelectedTimeframe] = React.useState<string>('last 6 months');
  const [activeTab, setActiveTab] = React.useState<string>('leadsConverted');

  const closedWonColor = "#14B8A6"; // Tailwind teal-500
  const closedLostColor = "hsl(10 85.9% 61.2%)"; // Destructive red

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4">
        <div>
          <CardTitle className="text-lg font-semibold text-foreground">Leads tracking</CardTitle>
          <div className="mt-1.5 flex items-baseline space-x-4">
            <div>
              <span className="text-3xl font-bold text-foreground">680</span>
              <span className="ml-1 text-sm text-muted-foreground">total closed</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-foreground">70</span>
              <span className="ml-1 text-sm text-muted-foreground">total lost</span>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-sm text-muted-foreground font-normal mt-4 sm:mt-0 w-full sm:w-auto">
              <CalendarDays className="mr-1.5 h-4 w-4" />
              {selectedTimeframe}
              <ChevronDown className="ml-1.5 h-4 w-4 opacity-70" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setSelectedTimeframe('last 30 days')}>Last 30 days</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedTimeframe('last 3 months')}>Last 3 months</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedTimeframe('last 6 months')}>Last 6 months</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedTimeframe('last 12 months')}>Last 12 months</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-1 sm:mb-2">
          <TabsList className="grid w-full grid-cols-3 sm:w-auto sm:inline-flex h-auto sm:h-10">
            <TabsTrigger value="leadsCame" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">Leads came</TabsTrigger>
            <TabsTrigger value="leadsConverted" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">Leads Converted</TabsTrigger>
            <TabsTrigger value="totalDealsSize" className="text-xs sm:text-sm px-2 sm:px-3 py-1.5 sm:py-2">Total deals size</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="h-[300px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsTrackingData} margin={{ top: 5, right: 5, left: -25, bottom: 20 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={closedWonColor} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={closedWonColor} stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={closedLostColor} stopOpacity={0.2}/>
                  <stop offset="95%" stopColor={closedLostColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} domain={[0, 'dataMax + 15']}/>
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{ color: 'hsl(var(--card-foreground))', fontWeight: '600', marginBottom: '4px' }}
                itemStyle={{}}
              />
              <Legend
                verticalAlign="bottom"
                align="left"
                wrapperStyle={{ paddingTop: '20px', paddingLeft: '10px' }}
                iconType=" Wassenburg" 
                iconSize={10}
                formatter={(value, entry) => {
                    const color = entry.color === closedWonColor ? 'text-teal-600' : 'text-red-600';
                    return <span className={cn('text-sm ml-1', color)}>{value}</span>;
                }}
              />
              <Area
                type="monotone"
                dataKey="closedWon"
                stroke={closedWonColor}
                fillOpacity={1}
                fill="url(#colorClosedWon)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: closedWonColor, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                activeDot={{ r: 6, fill: closedWonColor, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                name="Closed won"
              />
              <Area
                type="monotone"
                dataKey="closedLost"
                stroke={closedLostColor}
                fillOpacity={1}
                fill="url(#colorClosedLost)"
                strokeWidth={2.5}
                dot={{ r: 4, fill: closedLostColor, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                activeDot={{ r: 6, fill: closedLostColor, strokeWidth: 2, stroke: 'hsl(var(--card))' }}
                name="Closed lost"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingGraph;
