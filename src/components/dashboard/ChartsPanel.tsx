import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, LineChart, PieChart, TrendingUp } from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  Pie
} from 'recharts';

// Mock data
const delayData = [
  { time: '14:00', delay: 25, queue: 4 },
  { time: '14:15', delay: 32, queue: 6 },
  { time: '14:30', delay: 28, queue: 5 },
  { time: '14:45', delay: 45, queue: 9 },
  { time: '15:00', delay: 38, queue: 7 },
  { time: '15:15', delay: 42, queue: 8 },
  { time: '15:30', delay: 35, queue: 6 },
  { time: '15:45', delay: 29, queue: 4 },
];

const throughputData = [
  { junction: 'J001', vehicles: 247, pedestrians: 156 },
  { junction: 'J002', vehicles: 189, pedestrians: 98 },
  { junction: 'J003', vehicles: 312, pedestrians: 203 },
  { junction: 'J004', vehicles: 156, pedestrians: 87 },
  { junction: 'J005', vehicles: 198, pedestrians: 134 },
];

const greenSplitData = [
  { phase: 'Main NS', duration: 45, percentage: 35, fill: 'hsl(var(--status-good))' },
  { phase: 'Main LT', duration: 20, percentage: 15, fill: 'hsl(var(--status-warning))' },
  { phase: '1st EW', duration: 40, percentage: 31, fill: 'hsl(var(--primary))' },
  { phase: '1st LT', duration: 15, percentage: 12, fill: 'hsl(var(--status-warning))' },
  { phase: 'Ped All', duration: 9, percentage: 7, fill: 'hsl(var(--accent))' },
];

const ChartsPanel = () => {
  const [activeChart, setActiveChart] = useState<'delay' | 'throughput' | 'splits' | 'savings'>('delay');

  const chartTypes = [
    { id: 'delay', label: 'Delay & Queues', icon: LineChart },
    { id: 'throughput', label: 'Throughput', icon: BarChart3 },
    { id: 'splits', label: 'Green Splits', icon: PieChart },
    { id: 'savings', label: 'Savings', icon: TrendingUp }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'delay':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <RechartsLineChart data={delayData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="delay" 
                stroke="hsl(var(--status-warning))" 
                strokeWidth={2}
                name="Avg Delay (s)"
              />
              <Line 
                type="monotone" 
                dataKey="queue" 
                stroke="hsl(var(--status-critical))" 
                strokeWidth={2}
                name="Queue Length"
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        );

      case 'throughput':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <RechartsBarChart data={throughputData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="junction" 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <YAxis 
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
              <Legend />
              <Bar 
                dataKey="vehicles" 
                fill="hsl(var(--primary))" 
                name="Vehicles/hr"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="pedestrians" 
                fill="hsl(var(--status-good))" 
                name="Pedestrians/hr"
                radius={[2, 2, 0, 0]}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        );

      case 'splits':
        return (
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={greenSplitData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name}: ${percentage}%`}
                outerRadius={60}
                fill="hsl(var(--primary))"
                dataKey="percentage"
              >
                {greenSplitData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '6px'
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        );

      case 'savings':
        const savingsData = [
          { metric: 'Fuel Saved', value: '12.3L', change: '+8%' },
          { metric: 'CO₂ Reduced', value: '28.7kg', change: '+12%' },
          { metric: 'Time Saved', value: '156min', change: '+15%' },
          { metric: 'Efficiency', value: '94%', change: '+3%' }
        ];
        
        return (
          <div className="h-[200px] flex flex-col justify-center space-y-3">
            {savingsData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-status-good/5">
                <div>
                  <div className="text-sm font-medium">{item.metric}</div>
                  <div className="text-xs text-muted-foreground">Daily Total</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-status-good">{item.value}</div>
                  <Badge className="status-good text-xs">{item.change}</Badge>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Performance Analytics</h3>
        </div>
        <Badge variant="secondary" className="text-xs">Real-time</Badge>
      </div>

      {/* Chart Type Selector */}
      <div className="flex space-x-1 mb-4 p-1 bg-muted rounded-lg">
        {chartTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <Button
              key={type.id}
              variant={activeChart === type.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveChart(type.id as any)}
              className="flex-1 text-xs h-8"
            >
              <IconComponent className="w-3 h-3 mr-1" />
              {type.label}
            </Button>
          );
        })}
      </div>

      {/* Chart Content */}
      <div className="min-h-[200px]">
        {renderChart()}
      </div>

      {/* Chart Summary */}
      <div className="mt-4 pt-4 border-t border-panel-border/30">
        <div className="grid grid-cols-3 gap-3 text-xs">
          {activeChart === 'delay' && (
            <>
              <div className="text-center">
                <div className="text-muted-foreground">Peak Delay</div>
                <div className="font-semibold text-status-warning">45s</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Avg Queue</div>
                <div className="font-semibold">6.1 veh</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Trend</div>
                <div className="font-semibold text-status-good">Improving</div>
              </div>
            </>
          )}
          
          {activeChart === 'throughput' && (
            <>
              <div className="text-center">
                <div className="text-muted-foreground">Total Vehicles</div>
                <div className="font-semibold text-primary">1,102</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Pedestrians</div>
                <div className="font-semibold text-status-good">678</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Peak Junction</div>
                <div className="font-semibold">J003</div>
              </div>
            </>
          )}

          {activeChart === 'splits' && (
            <>
              <div className="text-center">
                <div className="text-muted-foreground">Cycle Time</div>
                <div className="font-semibold">129s</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Green Ratio</div>
                <div className="font-semibold text-status-good">0.73</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Efficiency</div>
                <div className="font-semibold text-primary">94%</div>
              </div>
            </>
          )}

          {activeChart === 'savings' && (
            <>
              <div className="text-center">
                <div className="text-muted-foreground">Total Savings</div>
                <div className="font-semibold text-status-good">$2,340</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">vs Yesterday</div>
                <div className="font-semibold text-primary">+15%</div>
              </div>
              <div className="text-center">
                <div className="text-muted-foreground">Ranking</div>
                <div className="font-semibold text-status-warning">Top 5%</div>
              </div>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ChartsPanel;