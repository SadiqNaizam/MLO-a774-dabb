import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  name: string;
  count: number;
  value: number;
  duration: string;
  color: string; 
  widthPercentage: number;
  isAverageTimeStage?: boolean;
}

const rawFunnelData: Omit<FunnelStage, 'widthPercentage'>[] = [
  { name: 'Discovery', count: 200, value: 200, duration: '2 days', color: 'bg-red-500' },
  { name: 'Qualified', count: 100, value: 100, duration: '2 days', color: 'bg-yellow-400' },
  { name: 'In conversation', count: 50, value: 100, duration: 'average time on this stage', color: 'bg-slate-700', isAverageTimeStage: true },
  { name: 'Negotiations', count: 20, value: 50, duration: '8 days', color: 'bg-green-500' },
  { name: 'Closed won', count: 20, value: 50, duration: '10 days', color: 'bg-purple-500' },
];

const totalStageCountForBar = rawFunnelData.reduce((sum, stage) => sum + stage.count, 0);

const funnelData: FunnelStage[] = rawFunnelData.map(stage => ({
    ...stage,
    widthPercentage: (stage.count / totalStageCountForBar) * 100
}));

const FunnelStats: React.FC<{ className?: string }> = ({ className }) => {
  const totalActiveLeads = 600;

  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <span className="text-5xl font-bold text-foreground">{totalActiveLeads}</span>
          <span className="ml-2 text-muted-foreground">active leads</span>
        </div>

        <div className="w-full h-3 flex rounded-full overflow-hidden mb-6 bg-gray-200">
          {funnelData.map((stage) => (
            <TooltipProvider key={stage.name}>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div
                    className={cn('h-full transition-all duration-300', stage.color)}
                    style={{ width: `${stage.widthPercentage}%` }}
                    aria-label={`${stage.name}: ${stage.count} leads`}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-medium">{stage.name}</p>
                  <p>{stage.count} leads</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <ul className="space-y-3.5">
          {rawFunnelData.map((stage) => (
            <li key={stage.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <span className={cn('w-2.5 h-2.5 rounded-sm mr-2.5 flex-shrink-0', stage.color)} />
                <span className="text-foreground whitespace-nowrap">{stage.name}</span>
              </div>
              <div className="flex items-center space-x-4 sm:space-x-6 text-right ml-2">
                <span className="w-8 sm:w-10 text-foreground tabular-nums">{stage.count}</span>
                <span className="w-12 sm:w-16 text-muted-foreground tabular-nums">${stage.value.toLocaleString()}</span>
                {stage.isAverageTimeStage ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <span className="w-auto sm:w-36 text-muted-foreground cursor-default text-right">{stage.duration}</span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>This is the average time leads spend in this stage.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <span className="w-auto sm:w-36 text-muted-foreground text-right">{stage.duration}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default FunnelStats;
