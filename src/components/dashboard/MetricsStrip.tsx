import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Gauge, 
  Clock, 
  Car, 
  Users, 
  TrendingUp, 
  Zap,
  BarChart3,
  Timer
} from "lucide-react";

const MetricsStrip = () => {
  const metrics = [
    {
      label: "Flow Rate",
      value: "247",
      unit: "veh/min",
      status: "good",
      icon: Car,
      trend: "+12%"
    },
    {
      label: "Occupancy", 
      value: "68%",
      unit: "",
      status: "warning", 
      icon: BarChart3,
      trend: "+5%"
    },
    {
      label: "Avg Speed",
      value: "32",
      unit: "km/h",
      status: "good",
      icon: Gauge,
      trend: "-2%"
    },
    {
      label: "Queue Length",
      value: "8.2",
      unit: "vehicles",
      status: "warning",
      icon: TrendingUp,
      trend: "+18%"
    },
    {
      label: "Pedestrian Wait",
      value: "45",
      unit: "seconds",
      status: "critical",
      icon: Users,
      trend: "+23%"
    },
    {
      label: "RL Action",
      value: "Extend",
      unit: "Green",
      status: "good",
      icon: Zap,
      trend: "Active"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-status-good';
      case 'warning': return 'text-status-warning'; 
      case 'critical': return 'text-status-critical';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'good': return 'bg-status-good/10';
      case 'warning': return 'bg-status-warning/10';
      case 'critical': return 'bg-status-critical/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <Card className="metric-card">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Real-Time Metrics</h3>
        <Badge variant="secondary" className="text-xs animate-pulse">LIVE</Badge>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div 
              key={index} 
              className={`p-3 rounded-lg ${getStatusBg(metric.status)} 
                         border border-panel-border/30 transition-all duration-200 
                         hover:shadow-lg hover:shadow-primary/5`}
            >
              <div className="flex items-center justify-between mb-2">
                <IconComponent className={`w-4 h-4 ${getStatusColor(metric.status)}`} />
                <Badge variant="outline" className="text-xs">
                  {metric.trend}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground font-medium">
                  {metric.label}
                </div>
                <div className="flex items-baseline space-x-1">
                  <span className={`text-lg font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value}
                  </span>
                  {metric.unit && (
                    <span className="text-xs text-muted-foreground">
                      {metric.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* System Performance Summary */}
      <div className="mt-4 pt-4 border-t border-panel-border/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Timer className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">System Performance:</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-status-good" />
              <span className="text-xs">Efficiency: 94%</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-status-warning" />
              <span className="text-xs">Load: 68%</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Optimal Range
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MetricsStrip;