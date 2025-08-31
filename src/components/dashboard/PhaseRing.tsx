import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";

const PhaseRing = () => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(25);
  const [isActive, setIsActive] = useState(true);

  // Mock phase data
  const phases = [
    { id: 1, name: 'Outer Ring Road', duration: 45, color: 'bg-status-good' },
    { id: 2, name: 'MG Road', duration: 20, color: 'bg-status-warning' },
    { id: 3, name: 'Bhagwaan Mahavir Maarg', duration: 40, color: 'bg-status-good' },
    { id: 4, name: 'Sardar Patel Marg', duration: 15, color: 'bg-status-warning' },
    { id: 5, name: 'Pedestrian All-Way', duration: 25, color: 'bg-primary' },
  ];

  // Simulate phase timing
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          const nextPhase = currentPhase >= phases.length ? 1 : currentPhase + 1;
          setCurrentPhase(nextPhase);
          return phases.find(p => p.id === nextPhase)?.duration || 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPhase, isActive, phases]);

  const currentPhaseData = phases.find(p => p.id === currentPhase);
  const nextPhaseData = phases.find(p => p.id === (currentPhase >= phases.length ? 1 : currentPhase + 1));
  
  // Calculate progress percentage
  const progress = currentPhaseData ? ((currentPhaseData.duration - timeRemaining) / currentPhaseData.duration) * 100 : 0;

  return (
    <Card className="metric-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">Signal Timing</h3>
        </div>
        <Badge className={isActive ? "status-good" : "bg-muted"}>
          {isActive ? "ACTIVE" : "INACTIVE"}
        </Badge>
      </div>

      {/* Phase Ring Visualization */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          {/* Outer Ring */}
          <svg width="160" height="160" className="transform -rotate-90">
            {/* Background Ring */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-muted/20"
            />
            {/* Progress Ring */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - progress / 100)}`}
              className="text-status-good transition-all duration-1000 ease-linear"
              strokeLinecap="round"
            />
            
            {/* Phase Segments */}
            {phases.map((phase, index) => {
              const segmentAngle = (360 / phases.length);
              const startAngle = index * segmentAngle;
              const isCurrentPhase = phase.id === currentPhase;
              
              return (
                <g key={phase.id}>
                  {/* Phase Indicator Dot */}
                  <circle
                    cx={80 + 65 * Math.cos((startAngle - 90) * Math.PI / 180)}
                    cy={80 + 65 * Math.sin((startAngle - 90) * Math.PI / 180)}
                    r={isCurrentPhase ? "6" : "4"}
                    className={`${isCurrentPhase ? phase.color : 'fill-muted'} transition-all duration-200`}
                    style={{
                      filter: isCurrentPhase ? 'drop-shadow(0 0 8px currentColor)' : 'none'
                    }}
                  />
                </g>
              );
            })}
          </svg>
          
          {/* Center Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground">
                {timeRemaining}
              </div>
              <div className="text-xs text-muted-foreground">seconds</div>
            </div>
          </div>
        </div>
      </div>

      {/* Phase Information */}
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-status-good/10 border border-status-good/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">CURRENT PHASE</span>
            <Badge className="status-good text-xs">#{currentPhase}</Badge>
          </div>
          <div className="font-medium text-sm">{currentPhaseData?.name}</div>
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className="text-muted-foreground">Duration: {currentPhaseData?.duration}s</span>
            <span className="text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-muted/20 border border-panel-border/30">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">NEXT PHASE</span>
            <ArrowRight className="w-3 h-3 text-muted-foreground" />
          </div>
          <div className="font-medium text-sm text-muted-foreground">
            {nextPhaseData?.name}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Duration: {nextPhaseData?.duration}s
          </div>
        </div>
      </div>

      {/* Cycle Information */}
      <div className="mt-4 pt-4 border-t border-panel-border/30">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-xs text-muted-foreground">Cycle Time</div>
            <div className="font-semibold text-sm">
              {phases.reduce((sum, phase) => sum + phase.duration, 0)}s
            </div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Total Phases</div>
            <div className="font-semibold text-sm">{phases.length}</div>
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Efficiency</div>
            <div className="font-semibold text-sm text-status-good">94%</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PhaseRing;