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
import MapApp from "./dashboard/MapApp";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="p-6 space-y-6">
        {/* Top Row - Metrics, Map, and Alerts */}
        <div className="grid grid-cols-3 grid-rows-2 gap-x-6 gap-y-2">
          {/* MetricsStrip: spans 2 columns, 1 row */}
          <div className="col-span-2 row-span-1">
            <MetricsStrip />
          </div>
          {/* MapApp: spans 1 column, 2 rows */}
          <div className="col-span-1 row-span-2 flex flex-col">
            <MapApp />
          </div>
          {/* AlertSystem: spans 2 columns, 1 row */}
          <div className="col-span-2 row-span-1">
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