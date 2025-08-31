import { useState, useEffect } from "react";
import { AlertTriangle, Camera, WifiOff, TrendingUp, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: 'incident' | 'camera' | 'threshold' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  junction?: string;
  acknowledged: boolean;
}

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'incident',
      severity: 'critical',
      title: 'Traffic Incident Detected',
      message: 'Collision detected at Main St & 1st Ave intersection',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      junction: 'J001',
      acknowledged: false
    },
    {
      id: '2',
      type: 'camera',
      severity: 'medium',
      title: 'Camera Offline',
      message: 'Junction camera at Broadway & 2nd St is not responding',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      junction: 'J002',
      acknowledged: false
    },
    {
      id: '3',
      type: 'threshold',
      severity: 'high',
      title: 'Queue Length Exceeded',
      message: 'Vehicle queue at Park Ave exceeds threshold (15+ vehicles)',
      timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      junction: 'J003',
      acknowledged: false
    }
  ]);

  const { toast } = useToast();

  // Simulate new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly generate new alerts (for demo purposes)
      if (Math.random() > 0.95) {
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: ['incident', 'camera', 'threshold', 'system'][Math.floor(Math.random() * 4)] as any,
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          title: 'New Alert Generated',
          message: 'This is a simulated alert for demonstration purposes',
          timestamp: new Date(),
          junction: ['J001', 'J002', 'J003', 'J004', 'J005'][Math.floor(Math.random() * 5)],
          acknowledged: false
        };

        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep only 10 most recent
        
        toast({
          title: newAlert.title,
          description: newAlert.message,
          variant: newAlert.severity === 'critical' ? "destructive" : "default"
        });
      }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [toast]);

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'incident': return AlertTriangle;
      case 'camera': return Camera;
      case 'threshold': return TrendingUp;
      case 'system': return WifiOff;
      default: return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'status-critical';
      case 'high': return 'status-warning';
      case 'medium': return 'bg-primary';
      case 'low': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    return timestamp.toLocaleDateString();
  };

  const unacknowledgedCount = alerts.filter(alert => !alert.acknowledged).length;
  const criticalCount = alerts.filter(alert => alert.severity === 'critical' && !alert.acknowledged).length;

  return (
    <Card className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-status-warning" />
          <h3 className="font-semibold">System Alerts</h3>
        </div>
        <div className="flex items-center space-x-2">
          {criticalCount > 0 && (
            <Badge className="status-critical animate-pulse text-xs">
              {criticalCount} CRITICAL
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs">
            {unacknowledgedCount} Active
          </Badge>
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <div className="text-sm">No active alerts</div>
          </div>
        ) : (
          alerts.map((alert) => {
            const IconComponent = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  alert.acknowledged 
                    ? 'bg-muted/20 border-panel-border/30 opacity-60' 
                    : 'bg-card border-panel-border hover:shadow-md'
                } ${
                  alert.severity === 'critical' && !alert.acknowledged
                    ? 'ring-1 ring-status-critical/50 animate-pulse'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`mt-0.5 p-1 rounded ${
                      alert.acknowledged ? 'bg-muted' : `${getSeverityColor(alert.severity)}/20`
                    }`}>
                      <IconComponent 
                        className={`w-3 h-3 ${
                          alert.acknowledged 
                            ? 'text-muted-foreground' 
                            : getSeverityColor(alert.severity).startsWith('status') 
                              ? `text-${getSeverityColor(alert.severity)}` 
                              : 'text-primary'
                        }`} 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="font-medium text-sm truncate">{alert.title}</div>
                        {alert.junction && (
                          <Badge variant="outline" className="text-xs">
                            {alert.junction}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {alert.message}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground">
                          {formatTimestamp(alert.timestamp)}
                        </div>
                        <div className="flex items-center space-x-1">
                          {!alert.acknowledged && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => acknowledgeAlert(alert.id)}
                              className="text-xs h-6 px-2"
                            >
                              Acknowledge
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dismissAlert(alert.id)}
                            className="text-xs h-6 w-6 p-0"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Alert Summary */}
      {alerts.length > 0 && (
        <div className="mt-4 pt-4 border-t border-panel-border/30">
          <div className="grid grid-cols-4 gap-3 text-center text-xs">
            <div>
              <div className="text-muted-foreground">Critical</div>
              <div className="font-semibold text-status-critical">
                {alerts.filter(a => a.severity === 'critical').length}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">High</div>
              <div className="font-semibold text-status-warning">
                {alerts.filter(a => a.severity === 'high').length}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Medium</div>
              <div className="font-semibold text-primary">
                {alerts.filter(a => a.severity === 'medium').length}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Low</div>
              <div className="font-semibold text-muted-foreground">
                {alerts.filter(a => a.severity === 'low').length}
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AlertSystem;