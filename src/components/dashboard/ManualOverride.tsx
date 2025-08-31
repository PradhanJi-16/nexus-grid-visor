import { useState } from "react";
import { AlertTriangle, Play, Pause, SkipForward, Square, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const ManualOverride = () => {
  const [activeOverride, setActiveOverride] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { toast } = useToast();

  const executeOverride = (action: string, duration: number = 30) => {
    setActiveOverride(action);
    setTimeRemaining(duration);
    
    toast({
      title: "Manual Override Activated",
      description: `${action} command executed. Auto-timeout in ${duration}s`,
      variant: "default"
    });

    // Simulate countdown
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setActiveOverride(null);
          toast({
            title: "Override Completed",
            description: "System returned to automatic control",
            variant: "default"
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelOverride = () => {
    setActiveOverride(null);
    setTimeRemaining(0);
    toast({
      title: "Override Cancelled",
      description: "System returned to automatic control",
      variant: "default"
    });
  };

  const overrideActions = [
    {
      id: 'hold',
      label: 'Hold Current Phase',
      icon: Pause,
      description: 'Maintain current signal phase',
      variant: 'secondary' as const,
      duration: 60
    },
    {
      id: 'skip',
      label: 'Skip to Next Phase',
      icon: SkipForward, 
      description: 'Force transition to next phase',
      variant: 'default' as const,
      duration: 30
    },
    {
      id: 'force-off',
      label: 'Force All Red',
      icon: Square,
      description: 'Set all signals to red immediately',
      variant: 'destructive' as const,
      duration: 45
    },
    {
      id: 'extend',
      label: 'Extend Green',
      icon: Play,
      description: 'Extend current green phase',
      variant: 'default' as const,
      duration: 40
    }
  ];

  return (
    <Card className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="w-5 h-5 text-status-warning" />
          <h3 className="font-semibold">Manual Override</h3>
        </div>
        {activeOverride && (
          <Badge className="status-warning animate-pulse">
            OVERRIDE ACTIVE
          </Badge>
        )}
      </div>

      {/* Active Override Display */}
      {activeOverride && (
        <div className="mb-4 p-3 rounded-lg bg-status-warning/10 border border-status-warning/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-status-warning" />
              <span className="text-sm font-medium">
                Active: {overrideActions.find(a => a.id === activeOverride)?.label}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-xs">
                {timeRemaining}s remaining
              </Badge>
              <Button 
                variant="outline" 
                size="sm"
                onClick={cancelOverride}
                className="text-xs"
              >
                Cancel
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
              <div 
                className="h-full bg-status-warning transition-all duration-1000 ease-linear"
                style={{ 
                  width: `${timeRemaining > 0 ? (timeRemaining / (overrideActions.find(a => a.id === activeOverride)?.duration || 30)) * 100 : 0}%` 
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Override Controls */}
      <div className="grid grid-cols-2 gap-3">
        {overrideActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <AlertDialog key={action.id}>
              <AlertDialogTrigger asChild>
                <Button
                  variant={action.variant}
                  size="sm"
                  className="h-auto p-3 flex flex-col items-center space-y-2 control-button"
                  disabled={activeOverride !== null}
                >
                  <IconComponent className="w-5 h-5" />
                  <div className="text-center">
                    <div className="text-xs font-medium">{action.label}</div>
                  </div>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="panel-glass">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-status-warning" />
                    <span>Confirm Manual Override</span>
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to execute "{action.label}"? 
                    <br />
                    <br />
                    {action.description}
                    <br />
                    <br />
                    <span className="font-medium text-foreground">
                      Auto-timeout: {action.duration} seconds
                    </span>
                    <br />
                    This action will be logged and may affect traffic flow.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={() => executeOverride(action.label, action.duration)}
                    className={action.variant === 'destructive' ? 'bg-destructive hover:bg-destructive/90' : ''}
                  >
                    Execute Override
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          );
        })}
      </div>

      {/* Override Log */}
      <div className="mt-4 pt-4 border-t border-panel-border/30">
        <div className="text-xs text-muted-foreground mb-2">Recent Actions</div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">14:23:45</span>
            <span>Extend Green - Completed</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">14:15:12</span>
            <span>Hold Phase - Completed</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">14:08:33</span>
            <span>Skip Phase - Completed</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ManualOverride;