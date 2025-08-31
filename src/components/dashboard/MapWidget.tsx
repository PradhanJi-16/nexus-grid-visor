import { useState } from "react";
import { Map, Layers, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// Mock junction data
const junctions = [
  { id: 'J001', x: 30, y: 20, status: 'good', name: 'Main St & 1st Ave' },
  { id: 'J002', x: 60, y: 40, status: 'warning', name: 'Broadway & 2nd St' },
  { id: 'J003', x: 80, y: 60, status: 'critical', name: 'Park Ave & 3rd St' },
  { id: 'J004', x: 20, y: 70, status: 'good', name: '4th St & Oak Rd' },
  { id: 'J005', x: 70, y: 25, status: 'good', name: 'Elm St & 5th Ave' },
];

const MapWidget = () => {
  const [heatmapEnabled, setHeatmapEnabled] = useState(false);
  const [hoveredJunction, setHoveredJunction] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-status-good';
      case 'warning': return 'bg-status-warning';
      case 'critical': return 'bg-status-critical';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="metric-card h-[400px] relative overflow-hidden">
      {/* Map Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Map className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Network Overview</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={heatmapEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setHeatmapEnabled(!heatmapEnabled)}
            className="text-xs"
          >
            <Layers className="w-3 h-3 mr-1" />
            Heatmap
          </Button>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-80 bg-gradient-to-br from-muted/20 to-muted/5 rounded-lg border border-panel-border">
        {/* Heatmap Overlay */}
        {heatmapEnabled && (
          <div className="absolute inset-0 opacity-40">
            <div className="w-full h-full bg-gradient-to-r from-status-critical/30 via-status-warning/30 to-status-good/30 rounded-lg" />
          </div>
        )}

        {/* Junction Markers */}
        {junctions.map((junction) => (
          <div
            key={junction.id}
            className={`absolute w-4 h-4 rounded-full ${getStatusColor(junction.status)} 
                       border-2 border-card shadow-lg cursor-pointer 
                       transform -translate-x-2 -translate-y-2 
                       hover:scale-125 transition-all duration-200
                       ${junction.status === 'critical' ? 'animate-pulse' : ''}`}
            style={{ 
              left: `${junction.x}%`, 
              top: `${junction.y}%` 
            }}
            onMouseEnter={() => setHoveredJunction(junction.id)}
            onMouseLeave={() => setHoveredJunction(null)}
          />
        ))}

        {/* Tooltip */}
        {hoveredJunction && (
          <div className="absolute bottom-4 left-4 panel-glass rounded-lg p-3 z-10">
            {junctions.find(j => j.id === hoveredJunction) && (
              <div className="space-y-1">
                <div className="font-medium text-sm">
                  {junctions.find(j => j.id === hoveredJunction)?.name}
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Badge 
                    className={`text-xs ${
                      junctions.find(j => j.id === hoveredJunction)?.status === 'good' ? 'status-good' :
                      junctions.find(j => j.id === hoveredJunction)?.status === 'warning' ? 'status-warning' :
                      'status-critical'
                    }`}
                  >
                    {junctions.find(j => j.id === hoveredJunction)?.status?.toUpperCase()}
                  </Badge>
                  <span>ID: {hoveredJunction}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="absolute top-4 right-4 panel-glass rounded-lg p-3 space-y-2">
          <div className="text-xs font-medium text-muted-foreground mb-2">Status</div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-status-good" />
            <span>Optimal</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-status-warning" />
            <span>Warning</span>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-status-critical animate-pulse" />
            <span>Critical</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MapWidget;