import { Bell, Settings, User, Zap, Gauge, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

const DashboardHeader = () => {
  const [environment, setEnvironment] = useState<'sim' | 'live'>('sim');
  const [notifications, setNotifications] = useState(3);

  return (
    <header className="h-16 border-b border-panel-border bg-card/50 backdrop-blur-md">
      <div className="flex items-center justify-between h-full px-6">
        {/* Left side - Logo and System Status */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Traffic Control Center</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-status-good animate-pulse" />
                  <span>System Online</span>
                </div>
              </div>
            </div>
          </div>

          {/* System Status Indicators */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Wifi className="w-4 h-4 text-status-good" />
              <Badge variant="secondary" className="text-xs">Connected</Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Gauge className="w-4 h-4 text-status-warning" />
              <Badge variant="secondary" className="text-xs">94% Load</Badge>
            </div>
          </div>
        </div>

        {/* Center - Environment Switch */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Environment:</span>
          <div className="flex rounded-lg bg-muted p-1">
            <Button
              variant={environment === 'sim' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setEnvironment('sim')}
              className="text-xs"
            >
              Simulation
            </Button>
            <Button
              variant={environment === 'live' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setEnvironment('live')}
              className="text-xs"
            >
              Live
            </Button>
          </div>
          {environment === 'live' && (
            <Badge variant="destructive" className="text-xs animate-pulse">
              LIVE
            </Badge>
          )}
        </div>

        {/* Right side - Notifications and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 text-xs flex items-center justify-center bg-status-critical">
                {notifications}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span className="text-sm">Operator</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 panel-glass">
              <DropdownMenuLabel>Control Panel</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;