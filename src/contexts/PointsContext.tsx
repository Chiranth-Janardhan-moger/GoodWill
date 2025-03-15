
import React, { createContext, useContext, useState, useEffect } from 'react';

interface PointsContextType {
  points: number;
  addPoints: (amount: number) => void;
}

const PointsContext = createContext<PointsContextType>({
  points: 0,
  addPoints: () => {},
});

export const usePoints = () => useContext(PointsContext);

export const PointsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState<number>(() => {
    // Load points from localStorage on initial render
    const savedPoints = localStorage.getItem('goodwill-points');
    return savedPoints ? parseInt(savedPoints, 10) : 0;
  });

  // Save points to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('goodwill-points', points.toString());
  }, [points]);

  const addPoints = (amount: number) => {
    setPoints((prev) => prev + amount);
  };

  return (
    <PointsContext.Provider value={{ points, addPoints }}>
      {children}
    </PointsContext.Provider>
  );
};
