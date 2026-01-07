import { useState } from 'react';
import { MapPin, Home, Building2, LogIn, LogOut, ArrowLeft } from 'lucide-react';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const LOCATIONS = [
  'Punjabi Bagh',
  'Hauz Khas',
  'South Delhi',
  'Noida Sector 62',
  'Gurugram Cyber City',
  'Connaught Place',
  'Dwarka Sector 21',
  'Rohini Sector 7',
  'Vasant Kunj',
  'Greater Kailash',
  'Nehru Place',
  'Karol Bagh',
  'Lajpat Nagar',
  'Saket',
  'Janakpuri',
];

interface VisitProps {
  onBackClick: () => void;
}

export function Visit({ onBackClick }: VisitProps) {
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [showCheckInOutModal, setShowCheckInOutModal] = useState(false);
  const [showCheckInConfirm, setShowCheckInConfirm] = useState(false);
  const [showCheckOutForm, setShowCheckOutForm] = useState(false);
  const [visitType, setVisitType] = useState<'home' | 'station' | null>(null);
  const [currentStation, setCurrentStation] = useState('');
  const [nextStation, setNextStation] = useState('');

  const handleLocationClick = (location: string) => {
    setSelectedLocation(location);
    setShowTypeModal(true);
  };

  const handleTypeSelection = (type: 'home' | 'station') => {
    setVisitType(type);
    setShowTypeModal(false);
    setShowCheckInOutModal(true);
  };

  const handleCheckIn = async () => {
    if (!selectedLocation || !visitType || !user) return;

    try {
      await supabase.from('visits').insert({
        user_id: user.id,
        location: selectedLocation,
        visit_type: visitType,
        check_in_time: new Date().toISOString(),
      });

      setShowCheckInOutModal(false);
      setShowCheckInConfirm(true);
    } catch (error) {
      console.error('Error checking in:', error);
    }
  };

  const handleCheckOut = async () => {
    setShowCheckInOutModal(false);
    setShowCheckOutForm(true);
  };

  const handleCheckOutConfirm = () => {
    setShowCheckOutForm(false);
    setCurrentStation('');
    setNextStation('');
    setSelectedLocation(null);
    setVisitType(null);
  };

  const closeAllModals = () => {
    setShowTypeModal(false);
    setShowCheckInOutModal(false);
    setShowCheckInConfirm(false);
    setShowCheckOutForm(false);
    setSelectedLocation(null);
    setVisitType(null);
    setCurrentStation('');
    setNextStation('');
  };

  return (
    <div className="min-h-[calc(100vh-200px)] px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={onBackClick}
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Select Location</h1>
          <p className="text-gray-600 text-lg">Choose a station to visit</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATIONS.map((location) => (
            <button
              key={location}
              onClick={() => handleLocationClick(location)}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 text-left border-2 border-transparent hover:border-blue-500 group"
            >
              <div className="flex items-start space-x-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{location}</h3>
                  <p className="text-sm text-gray-600">Click to visit</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Modal
        isOpen={showTypeModal}
        onClose={closeAllModals}
        title="Select Visit Type"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">
            You are visiting <span className="font-semibold">{selectedLocation}</span>
          </p>
          <Button
            onClick={() => handleTypeSelection('home')}
            fullWidth
            className="flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Button>
          <Button
            onClick={() => handleTypeSelection('station')}
            fullWidth
            variant="secondary"
            className="flex items-center justify-center space-x-2"
          >
            <Building2 className="w-5 h-5" />
            <span>Station</span>
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={showCheckInOutModal}
        onClose={closeAllModals}
        title="Check In / Check Out"
      >
        <div className="space-y-4">
          <p className="text-gray-600 mb-6">
            Location: <span className="font-semibold">{selectedLocation}</span><br />
            Type: <span className="font-semibold capitalize">{visitType}</span>
          </p>
          <Button
            onClick={handleCheckIn}
            fullWidth
            className="flex items-center justify-center space-x-2"
          >
            <LogIn className="w-5 h-5" />
            <span>Check In</span>
          </Button>
          <Button
            onClick={handleCheckOut}
            fullWidth
            variant="secondary"
            className="flex items-center justify-center space-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Check Out</span>
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={showCheckInConfirm}
        onClose={closeAllModals}
        title="Check In Successful"
      >
        <div className="text-center py-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <LogIn className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-lg text-gray-900 mb-2">
            You are checked in at
          </p>
          <p className="text-xl font-bold text-blue-600 mb-6">{selectedLocation}</p>
          <Button onClick={closeAllModals} fullWidth>
            Close
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={showCheckOutForm}
        onClose={closeAllModals}
        title="Check Out Details"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Station
            </label>
            <input
              type="text"
              value={currentStation}
              onChange={(e) => setCurrentStation(e.target.value)}
              placeholder="Enter current station"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Next Station
            </label>
            <input
              type="text"
              value={nextStation}
              onChange={(e) => setNextStation(e.target.value)}
              placeholder="Enter next station"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button
            onClick={handleCheckOutConfirm}
            fullWidth
            disabled={!currentStation || !nextStation}
          >
            Confirm Check Out
          </Button>
        </div>
      </Modal>
    </div>
  );
}
