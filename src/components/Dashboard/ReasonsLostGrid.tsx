import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ReasonLost {
  percentage: string;
  description: string;
}

const reasonsLostData: ReasonLost[] = [
  { percentage: '40%', description: 'The proposal is unclear' },
  { percentage: '20%', description: 'However venture pursuit' },
  { percentage: '10%', description: 'Other' },
  { percentage: '30%', description: 'The proposal is unclear' }, 
];

const ReasonsLostGrid: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {reasonsLostData.map((reason, index) => (
            <div key={index}>
              <p className="text-4xl font-bold text-foreground">{reason.percentage}</p>
              <p className="text-sm text-muted-foreground mt-1">{reason.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReasonsLostGrid;
