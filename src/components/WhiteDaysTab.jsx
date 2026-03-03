import React, { useState, useEffect } from 'react';
import { addDays, format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function WhiteDaysTab() {
  const [upcomingWhiteDays, setUpcomingWhiteDays] = useState([]);

  useEffect(() => {
    // A simple heuristic to find the next White Days (13, 14, 15 of Hijri month)
    // We scan the next 60 days to find dates that map to 13, 14, or 15 in the Islamic calendar
    const today = new Date();
    const formatter = new Intl.DateTimeFormat('fr-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const daysList = [];
    let currentBlock = [];

    for (let i = 0; i < 60; i++) {
        const checkDate = addDays(today, i);
        const parts = formatter.formatToParts(checkDate);
        const dayPart = parts.find(p => p.type === 'day');
        const monthPart = parts.find(p => p.type === 'month');
        
        if (dayPart) {
            const hijriDay = parseInt(dayPart.value, 10);
            if (hijriDay === 13 || hijriDay === 14 || hijriDay === 15) {
                currentBlock.push({
                    gregorian: checkDate,
                    hijriDay,
                    hijriMonth: monthPart ? monthPart.value : ''
                });
            } else if (currentBlock.length > 0 && hijriDay > 15) {
                // We've passed a block of white days
                daysList.push([...currentBlock]);
                currentBlock = [];
            }
        }
    }
    
    // Push the last block if it was active at the end of the 60 days scan
    if (currentBlock.length > 0) {
        daysList.push([...currentBlock]);
    }

    setUpcomingWhiteDays(daysList);
  }, []);

  return (
    <div className="whitedays-tab">
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h2 style={{ marginBottom: '15px', color: 'var(--accent-gold)' }}>Jours Blancs 🌙</h2>
        <p className="subtitle" style={{ marginBottom: '20px' }}>
          Il est fortement recommandé de jeûner les 13ème, 14ème et 15ème jours de chaque mois lunaire islamique.
        </p>
        
        <div className="whitedays-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {upcomingWhiteDays.length === 0 ? (
            <p style={{ color: 'var(--text-muted)' }}>Calcul en cours...</p>
          ) : (
            upcomingWhiteDays.map((block, i) => (
              <div key={i} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '15px', borderLeft: '4px solid var(--accent-gold)' }}>
                <h4 style={{ margin: '0 0 10px 0', textTransform: 'capitalize' }}>
                  {block[0]?.hijriMonth}
                </h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {block.map((day, j) => (
                    <li key={j} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: j < block.length - 1 ? '1px solid var(--glass-border)' : 'none' }}>
                       <span>{day.hijriDay}ème jour</span>
                       <span style={{ color: 'var(--text-muted)' }}>{format(day.gregorian, 'EEEE d MMMM', { locale: fr })}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
