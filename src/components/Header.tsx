
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coins } from 'lucide-react';
import { PointsModal } from './PointsModal';
import { usePoints } from '../contexts/PointsContext';

export const Header = () => {
  const [showPointsModal, setShowPointsModal] = useState(false);
  const { points } = usePoints();
  
  return (
    <header className="w-full px-6 py-4 flex justify-between items-center animate-fade-in bg-gradient-to-r from-blood/10 to-blood/5">
      <Link to="/" className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-blood flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-xl">G</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">GoodWill</h1>
      </Link>
      
      <button 
        onClick={() => setShowPointsModal(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full bg-blood/10 hover:bg-blood/20 transition-colors button-effect shadow-sm"
      >
        <Coins className="h-5 w-5 text-blood" />
        <span className="font-medium">{points} Points</span>
      </button>

      {showPointsModal && (
        <PointsModal onClose={() => setShowPointsModal(false)} />
      )}
    </header>
  );
};
