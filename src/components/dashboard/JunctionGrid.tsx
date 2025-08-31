import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Users, Car } from "lucide-react";

// Mock junction data
const junctions = [
  {
    id: 'J001',
    name: 'Main St & 1st Ave',
    status: 'good',
    volume: 247,
    avgDelay: 18,
    queueLength: 3,
    pedestrianCalls: 12,
    trend: 'up'
  },
  {
    id: 'J002', 
    name: 'Broadway & 2nd St',
    status: 'warning',
    volume: 189,
    avgDelay: 45,
    queueLength: 8,
    pedestrianCalls: 6,
    trend: 'down'
  },
  {
    id: 'J003',
    name: 'Park Ave & 3rd St',
    status: 'critical',
    volume: 312,
    avgDelay: 78,
    queueLength: 15,
    pedestrianCalls: 23,
    trend: 'up'
  },
  {
    id: 'J004',
    name: '4th St & Oak Rd',
    status: 'good',
    volume: 156,
    avgDelay: 12,
    queueLength: 2,
    pedestrianCalls: 4,
    trend: 'stable'
  },
];

const JunctionGrid = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <Badge className="status-good text-xs">OPTIMAL</Badge>;
      case 'warning':
        return <Badge className="status-warning text-xs">WARNING</Badge>;
      case 'critical':
        return <Badge className="status-critical text-xs">CRITICAL</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">UNKNOWN</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-status-critical" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-status-good" />;
      default:
        return <Minus className="w-3 h-3 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold flex items-center space-x-2">
          <Car className="w-5 h-5 text-primary" />
          <span>Junction Status</span>
        </h3>
        <Badge variant="secondary" className="text-xs">
          {junctions.length} Active
        </Badge>
      </div>
      
      <div className="grid gap-3">
        {junctions.map((junction) => (
          <Card key={junction.id} className="metric-card">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="font-medium text-sm">{junction.name}</div>
                <div className="text-xs text-muted-foreground">ID: {junction.id}</div>
              </div>
              {getStatusBadge(junction.status)}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Volume</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-medium">{junction.volume}</span>
                    {getTrendIcon(junction.trend)}
                  </div>
                </div>
                <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      junction.volume > 250 ? 'bg-status-critical' :
                      junction.volume > 200 ? 'bg-status-warning' : 'bg-status-good'
                    }`}
                    style={{ width: `${Math.min((junction.volume / 350) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avg Delay</span>
                  <span className="font-medium">{junction.avgDelay}s</span>
                </div>
                <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      junction.avgDelay > 60 ? 'bg-status-critical' :
                      junction.avgDelay > 30 ? 'bg-status-warning' : 'bg-status-good'
                    }`}
                    style={{ width: `${Math.min((junction.avgDelay / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Queue Length</span>
                <span className="font-medium">{junction.queueLength} vehicles</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Users className="w-3 h-3" />
                  <span>Pedestrian</span>
                </div>
                <span className="font-medium">{junction.pedestrianCalls}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JunctionGrid;