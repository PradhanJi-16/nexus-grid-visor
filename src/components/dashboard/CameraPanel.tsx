import { useState } from "react";
import { Camera, Eye, EyeOff, Square, Users, Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CameraPanel = () => {
  const [showROI, setShowROI] = useState(true);
  const [cameraOnline, setCameraOnline] = useState(true);

  const counts = {
    vehicles: 12,
    pedestrians: 4,
    cyclists: 2
  };

  return (
    <Card className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Junction Camera</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            className={cameraOnline ? "status-good" : "status-critical"}
            onClick={() => setCameraOnline(!cameraOnline)}
          >
            {cameraOnline ? "ONLINE" : "OFFLINE"}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowROI(!showROI)}
            className="text-xs"
          >
            {showROI ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
            ROI
          </Button>
        </div>
      </div>

      {/* Camera View */}
      <div className="relative w-full h-48 bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg border border-panel-border mb-4 overflow-hidden">
        {cameraOnline ? (
          <>
            {/* Simulated camera feed with grid pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
            
            {/* ROI Overlays */}
            {showROI && (
              <>
                {/* Vehicle detection zones */}
                <div className="absolute border-2 border-status-good/60 bg-status-good/10 rounded"
                     style={{ top: '20%', left: '15%', width: '30%', height: '25%' }} />
                <div className="absolute border-2 border-status-good/60 bg-status-good/10 rounded"
                     style={{ top: '20%', right: '15%', width: '30%', height: '25%' }} />
                
                {/* Pedestrian crossing zones */}
                <div className="absolute border-2 border-primary/60 bg-primary/10 rounded"
                     style={{ bottom: '20%', left: '20%', width: '60%', height: '15%' }} />
              </>
            )}

            {/* Vehicle indicators */}
            <div className="absolute top-4 left-4 space-y-1">
              {Array.from({length: counts.vehicles}).map((_, i) => (
                <div key={i} className="w-3 h-2 bg-status-good/80 rounded animate-pulse" 
                     style={{ animationDelay: `${i * 0.2}s` }} />
              ))}
            </div>

            {/* Status indicator */}
            <div className="absolute top-2 right-2 w-3 h-3 bg-status-good rounded-full animate-pulse" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
            <div className="text-center space-y-2">
              <Camera className="w-8 h-8 text-muted-foreground mx-auto" />
              <div className="text-sm text-muted-foreground">Camera Offline</div>
            </div>
          </div>
        )}
      </div>

      {/* Live Counts */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-2 rounded-lg bg-muted/20">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground mb-1">
            <Car className="w-3 h-3" />
            <span>Vehicles</span>
          </div>
          <div className="text-lg font-bold text-status-good">{counts.vehicles}</div>
        </div>
        
        <div className="text-center p-2 rounded-lg bg-muted/20">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground mb-1">
            <Users className="w-3 h-3" />
            <span>Pedestrians</span>
          </div>
          <div className="text-lg font-bold text-primary">{counts.pedestrians}</div>
        </div>
        
        <div className="text-center p-2 rounded-lg bg-muted/20">
          <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground mb-1">
            <Square className="w-3 h-3" />
            <span>Cyclists</span>
          </div>
          <div className="text-lg font-bold text-status-warning">{counts.cyclists}</div>
        </div>
      </div>
    </Card>
  );
};

export default CameraPanel;