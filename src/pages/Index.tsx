import React from 'react';
import MainAppLayout from '../components/layout/MainAppLayout';
import FunnelStats from '../components/Dashboard/FunnelStats';
import SourceChart from '../components/Dashboard/SourceChart';
import LeadsTrackingGraph from '../components/Dashboard/LeadsTrackingGraph';
import ReasonsLostGrid from '../components/Dashboard/ReasonsLostGrid';
import OtherDataOverview from '../components/Dashboard/OtherDataOverview';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
// cn utility might be useful for more complex conditional styling in the future
// import { cn } from '@/lib/utils';

const LeadsDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');

  return (
    <MainAppLayout>
      {/* Page Title and Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4 sm:mt-0">
          <TabsList>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Conditional rendering based on activeTab */}
      {activeTab === 'leads' && (
        <>
          {/* Row 1: FunnelStats and SourceChart */}
          {/* This div will have a gap-6 applied by MainAppLayout's children container if it's a direct child */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FunnelStats className="lg:col-span-2" />
            <SourceChart className="lg:col-span-1" />
          </div>

          {/* Row 2: LeadsTrackingGraph */}
          {/* This component will also have a gap-6 applied if it's a direct child */}
          <LeadsTrackingGraph />

          {/* Row 3: ReasonsLostGrid and OtherDataOverview */}
          {/* This div will also have a gap-6 applied if it's a direct child */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <ReasonsLostGrid className="md:col-span-2" />
            <OtherDataOverview className="md:col-span-3" />
          </div>
        </>
      )}

      {activeTab === 'sales' && (
        <div className="flex items-center justify-center h-96 rounded-lg border border-dashed shadow-sm">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-foreground">Sales Data</h2>
            <p className="mt-2 text-muted-foreground">Sales-specific components and data would be displayed here.</p>
          </div>
        </div>
      )}
    </MainAppLayout>
  );
};

export default LeadsDashboardPage;
