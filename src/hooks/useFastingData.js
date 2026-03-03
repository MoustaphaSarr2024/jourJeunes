import { useState, useEffect } from 'react';

// Hook to manage fasting data in LocalStorage
export function useFastingData() {
  const [fastingData, setFastingData] = useState(() => {
    try {
      const item = window.localStorage.getItem('fasting_data');
      return item ? JSON.parse(item) : {};
    } catch (error) {
      console.error(error);
      return {};
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('fasting_data', JSON.stringify(fastingData));
    } catch (error) {
      console.error(error);
    }
  }, [fastingData]);

  // Fasting types: 'ramadan-fasted', 'ramadan-missed', 'white-days', 'voluntary', 'monday-thursday', 'manque-ramadan'
  
  const toggleFast = (dateKey, type = 'ramadan-missed') => {
    setFastingData(prev => {
      const newData = { ...prev };
      if (newData[dateKey]) {
        delete newData[dateKey]; // remove if exists
      } else {
        newData[dateKey] = type;
      }
      return newData;
    });
  };

  const getStats = () => {
    let ramadanMissed = 0;
    let voluntary = 0;
    let whiteDays = 0;
    let ramadanFasted = 0;
    let manqueRamadan = 0;
    
    Object.values(fastingData).forEach(type => {
      if (type === 'ramadan-missed') ramadanMissed++;
      if (type === 'voluntary' || type === 'monday-thursday') voluntary++;
      if (type === 'white-days') whiteDays++;
      if (type === 'ramadan-fasted') ramadanFasted++;
      if (type === 'manque-ramadan') manqueRamadan++;
    });

    // Jours restants à rattraper = jours manqués - jours déjà rattrapés
    const aRattraper = Math.max(manqueRamadan - ramadanMissed, 0);

    return { ramadanMissed, voluntary, whiteDays, ramadanFasted, manqueRamadan, aRattraper, total: Object.keys(fastingData).length };
  };

  return { fastingData, toggleFast, getStats };
}
