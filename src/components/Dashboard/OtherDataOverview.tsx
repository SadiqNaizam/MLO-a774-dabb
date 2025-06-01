import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface OtherDataItem {
  value: string;
  label: string;
  tooltipText?: string;
}

const otherData: OtherDataItem[] = [
  { value: '900', label: 'total leads count' },
  { value: '12', label: 'days in average to convert lead' },
  { value: '30', label: 'inactive leads', tooltipText: 'Leads that have not shown activity in the last 30 days.' },
];

const OtherDataOverview: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Other data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
          {otherData.map((item, index) => (
            <div key={index} className="flex flex-col">
              <p className="text-4xl font-bold text-foreground">{item.value}</p>
              <div className="flex items-center mt-1">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                {item.tooltipText && (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Info className="h-3.5 w-3.5 text-muted-foreground/80 ml-1.5 cursor-pointer flex-shrink-0" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <p>{item.tooltipText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OtherDataOverview;
