import { useState } from "react";
import { Siren, Route, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const EmergencyPreemption = () => {
  const [activePreemption, setActivePreemption] = useState<any>(null);
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { toast } = useToast();

  const routes = [
    { id: 'route-1', name: 'Main St Northbound', junctions: ['J001', 'J002', 'J005'], priority: 'high' },
    { id: 'route-2', name: 'Broadway Eastbound', junctions: ['J002', 'J003'], priority: 'medium' },
    { id: 'route-3', name: '1st Ave Corridor', junctions: ['J001', 'J004'], priority: 'high' },
    { id: 'route-4', name: 'Emergency Bypass', junctions: ['J003', 'J004', 'J005'], priority: 'critical' }
  ];

  const vehicleTypes = [
    { id: 'ambulance', name: 'Ambulance', icon: '🚑', priority: 'critical' },
    { id: 'fire', name: 'Fire Truck', icon: '🚒', priority: 'critical' },
    { id: 'police', name: 'Police', icon: '🚓', priority: 'high' },
    { id: 'transit', name: 'Emergency Transit', icon: '🚌', priority: 'medium' }
  ];

  const activatePreemption = (routeId: string, vehicleType: string) => {
    const route = routes.find(r => r.id === routeId);
    const vehicle = vehicleTypes.find(v => v.id === vehicleType);
    
    if (!route || !vehicle) return;

    const estimatedTime = route.junctions.length * 45; // 45 seconds per junction
    
    setActivePreemption({
      route,
      vehicle,
      startTime: Date.now(),
      estimatedDuration: estimatedTime
    });
    
    setTimeRemaining(estimatedTime);

    toast({
      title: "Emergency Preemption Activated",
      description: `${vehicle.name} granted priority on ${route.name}`,
      variant: "default"
    });

    // Simulate preemption countdown
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActivePreemption(null);
          toast({
            title: "Preemption Completed",
            description: "Emergency vehicle has cleared the route. Normal operations resumed.",
            variant: "default"
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelPreemption = () => {
    setActivePreemption(null);
    setTimeRemaining(0);
    toast({
      title: "Preemption Cancelled",
      description: "Emergency preemption cancelled. Normal operations resumed.",
      variant: "destructive"
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'status-critical';
      case 'high': return 'status-warning';
      case 'medium': return 'bg-primary';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Siren className="w-5 h-5 text-status-critical" />
          <h3 className="font-semibold">Emergency Preemption</h3>
        </div>
        {activePreemption && (
          <Badge className="status-critical animate-pulse">
            PREEMPTION ACTIVE
          </Badge>
        )}
      </div>

      {/* Active Preemption Display */}
      {activePreemption && (
        <div className="mb-4 p-4 rounded-lg bg-status-critical/10 border border-status-critical/30">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{activePreemption.vehicle.icon}</div>
              <div>
                <div className="font-semibold text-sm">{activePreemption.vehicle.name}</div>
                <div className="text-xs text-muted-foreground">{activePreemption.route.name}</div>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={cancelPreemption}
              className="text-xs border-status-critical text-status-critical hover:bg-status-critical/10"
            >
              Cancel
            </Button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-status-critical" />
                <span>Time Remaining: {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
              </div>
              <Badge className={`${getPriorityColor(activePreemption.vehicle.priority)} text-xs`}>
                {activePreemption.vehicle.priority.toUpperCase()}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div 
                className="h-full bg-status-critical transition-all duration-1000 ease-linear"
                style={{ 
                  width: `${100 - (timeRemaining / activePreemption.estimatedDuration) * 100}%` 
                }}
              />
            </div>

            {/* Affected Junctions */}
            <div className="flex items-center space-x-2">
              <Route className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Junctions:</span>
              <div className="flex space-x-1">
                {activePreemption.route.junctions.map((junction: string, index: number) => (
                  <Badge key={junction} variant="outline" className="text-xs">
                    {junction}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preemption Controls */}
      {!activePreemption && (
        <div className="space-y-4">
          <div className="grid gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Vehicle Type</label>
              <div className="grid grid-cols-2 gap-2">
                {vehicleTypes.map((vehicle) => (
                  <Button
                    key={vehicle.id}
                    variant="outline"
                    size="sm"
                    className="h-auto p-3 flex flex-col items-center space-y-1"
                    onClick={() => {
                      // Auto-select first available route for demo
                      if (routes.length > 0) {
                        setSelectedRoute(routes[0].id);
                      }
                    }}
                  >
                    <div className="text-lg">{vehicle.icon}</div>
                    <div className="text-xs">{vehicle.name}</div>
                    <Badge className={`${getPriorityColor(vehicle.priority)} text-xs`}>
                      {vehicle.priority}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground mb-2 block">Route Selection</label>
              <Select value={selectedRoute} onValueChange={setSelectedRoute}>
                <SelectTrigger>
                  <SelectValue placeholder="Select emergency route" />
                </SelectTrigger>
                <SelectContent className="panel-glass">
                  {routes.map((route) => (
                    <SelectItem key={route.id} value={route.id}>
                      <div className="flex items-center justify-between w-full">
                        <span>{route.name}</span>
                        <Badge className={`ml-2 ${getPriorityColor(route.priority)} text-xs`}>
                          {route.priority}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  size="sm"
                  disabled={!selectedRoute}
                  className="w-full control-button glow-primary"
                >
                  <Siren className="w-4 h-4 mr-2" />
                  Activate Emergency Preemption
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="panel-glass">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-status-critical" />
                    <span>Activate Emergency Preemption</span>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will grant priority signal control to the emergency vehicle on the selected route.
                    <br /><br />
                    <strong>Route:</strong> {routes.find(r => r.id === selectedRoute)?.name}
                    <br />
                    <strong>Affected Junctions:</strong> {routes.find(r => r.id === selectedRoute)?.junctions.join(', ')}
                    <br /><br />
                    Normal traffic operations will be temporarily disrupted.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => activatePreemption(selectedRoute, 'ambulance')}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Activate Preemption
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}

      {/* Recovery Plan */}
      {activePreemption && (
        <div className="mt-4 p-3 rounded-lg bg-muted/20 border border-panel-border/30">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-4 h-4 text-status-good" />
            <span className="text-sm font-medium">Recovery Plan Active</span>
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>• Gradual phase transition back to normal timing</div>
            <div>• Queue discharge optimization enabled</div>
            <div>• Pedestrian phase recovery in 2 minutes</div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default EmergencyPreemption;