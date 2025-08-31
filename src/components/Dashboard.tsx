import DashboardHeader from "./dashboard/DashboardHeader";
import MapWidget from "./dashboard/MapWidget";
import JunctionGrid from "./dashboard/JunctionGrid";
import CameraPanel from "./dashboard/CameraPanel";
import MetricsStrip from "./dashboard/MetricsStrip";
import ManualOverride from "./dashboard/ManualOverride";
import PhaseRing from "./dashboard/PhaseRing";
import EmergencyPreemption from "./dashboard/EmergencyPreemption";
import ChartsPanel from "./dashboard/ChartsPanel";
import AlertSystem from "./dashboard/AlertSystem";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="p-6 space-y-6">
        {/* Top Row - Metrics and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MetricsStrip />
          </div>
          <div className="lg:col-span-1">
            <AlertSystem />
          </div>
        </div>

        {/* Second Row - Map and Controls */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-2">
            <MapWidget />
          </div>
          <div className="xl:col-span-1">
            <PhaseRing />
          </div>
          <div className="xl:col-span-1">
            <CameraPanel />
          </div>
        </div>

        {/* Third Row - Junction Data and Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <JunctionGrid />
          </div>
          <div className="lg:col-span-1">
            <ManualOverride />
          </div>
          <div className="lg:col-span-1 xl:col-span-1">
            <EmergencyPreemption />
          </div>
          <div className="lg:col-span-1 xl:col-span-1">
            <ChartsPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;