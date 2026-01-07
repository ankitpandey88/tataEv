import { MapPin, Settings } from 'lucide-react';

interface DashboardProps {
  onVisitClick: () => void;
  onSetupClick: () => void;
}

export function Dashboard({ onVisitClick, onSetupClick }: DashboardProps) {
  return (
    <div className="min-h-[calc(100vh-200px)] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Dashboard</h1>
          <p className="text-gray-600 text-lg">Choose an option to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <button
            onClick={onVisitClick}
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-left border-2 border-transparent hover:border-blue-500"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
              <MapPin className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Visit</h2>
            <p className="text-gray-600">
              Manage your location visits and check-ins at various stations
            </p>
          </button>

          <button
            onClick={onSetupClick}
            className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-left border-2 border-transparent hover:border-blue-500"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 group-hover:bg-blue-200 transition-colors">
              <Settings className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Setup</h2>
            <p className="text-gray-600">
              Train AI models to analyze EV charging station images
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
