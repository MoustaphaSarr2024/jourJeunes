import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useFastingData } from '../hooks/useFastingData';

export default function CalendarTab() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { fastingData, toggleFast } = useFastingData();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  const [fastTypeSelector, setFastTypeSelector] = useState(null);
  const [removeConfirm, setRemoveConfirm] = useState(null); // day to confirm removal

  const handleCellClick = (day) => {
    const dateKey = format(day, 'yyyy-MM-dd');
    if (fastingData[dateKey]) {
      setRemoveConfirm(day); // show confirmation sheet
    } else {
      setFastTypeSelector(day);
    }
  };

  const confirmFastType = (type) => {
    if (fastTypeSelector) {
      toggleFast(format(fastTypeSelector, 'yyyy-MM-dd'), type);
      setFastTypeSelector(null);
    }
  };

  const fastOptions = [
    { type: 'ramadan-fasted', label: '🌙 Ramadan jeûné',           bg: '#10b981', color: '#fff' },
    { type: 'manque-ramadan', label: '❌ Jour manqué (à rattraper)', bg: '#ef4444', color: '#fff' },
    { type: 'ramadan-missed', label: '↩️ Rattrapage Ramadan',       bg: 'var(--primary)', color: '#fff' },
    { type: 'voluntary',      label: '✨ Volontaire',                bg: 'var(--secondary)', color: '#fff' },
    { type: 'white-days',     label: '⭐ Jours Blancs',              bg: 'var(--accent-gold)', color: '#000' },
  ];

  return (
    <div className="calendar-tab">
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <button onClick={prevMonth} className="icon-btn">{'<'}</button>
          <h2 style={{ textTransform: 'capitalize' }}>
            {format(currentDate, 'MMMM yyyy', { locale: fr })}
          </h2>
          <button onClick={nextMonth} className="icon-btn">{'>'}</button>
        </div>

        <div className="calendar-grid">
          {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
            <div key={i} className="calendar-day-header">{d}</div>
          ))}

          {Array.from({ length: (monthStart.getDay() + 6) % 7 }).map((_, i) => (
            <div key={`pad-${i}`} className="calendar-cell empty" />
          ))}

          {days.map((day, i) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const fastType = fastingData[dateKey];
            const isFasted = !!fastType;
            const isFuture = day > new Date() && !isSameDay(day, new Date());

            const colorMap = {
              'ramadan-fasted':  '#10b981',
              'manque-ramadan':  '#ef4444',
              'ramadan-missed':  'var(--primary)',
              'voluntary':       'var(--secondary)',
              'white-days':      'var(--accent-gold)',
              'monday-thursday': '#22d3ee',
            };

            return (
              <div
                key={i}
                className={`calendar-cell ${isSameDay(day, new Date()) ? 'today' : ''} ${isFasted ? 'fasted' : ''} ${isFuture ? 'future' : ''}`}
                style={{
                  ...(isFasted ? { background: colorMap[fastType] || 'var(--primary)' } : {}),
                  ...(isFuture ? { opacity: 0.3, cursor: 'default', pointerEvents: 'none' } : {}),
                }}
                onClick={() => !isFuture && handleCellClick(day)}
              >
                <span>{format(day, 'd')}</span>
              </div>
            );
          })}
        </div>
      </div>




      {/* Bottom sheet overlay */}
      {fastTypeSelector && (
        <>
          <div
            onClick={() => setFastTypeSelector(null)}
            onTouchEnd={() => setFastTypeSelector(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1500, cursor: 'pointer' }}
          />
          <div
            className="bottom-sheet"
            onClick={e => e.stopPropagation()}
            onTouchEnd={e => e.stopPropagation()}
            style={{
              position: 'fixed',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(100% - 32px)',
              maxWidth: 'calc(var(--max-width) - 32px)',
              zIndex: 1600,
              background: 'rgba(20, 21, 50, 0.98)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '24px 20px 24px',
            }}
          >
            {/* Handle bar */}
            <div style={{ width: 40, height: 4, background: 'var(--glass-border)', borderRadius: 4, margin: '0 auto 20px' }} />
            <h3 style={{ marginBottom: '6px', textAlign: 'center' }}>Quel type de jeûne ?</h3>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', textTransform: 'capitalize' }}>
              {format(fastTypeSelector, 'EEEE d MMMM yyyy', { locale: fr })}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {fastOptions.map(o => (
                <button
                  key={o.type}
                  className="type-btn"
                  style={{ background: o.bg, color: o.color }}
                  onClick={() => confirmFastType(o.type)}
                >
                  {o.label}
                </button>
              ))}
              <button
                className="type-btn"
                style={{ background: 'transparent', border: '1px solid var(--glass-border)', marginTop: '4px' }}
                onClick={() => setFastTypeSelector(null)}
              >
                Annuler
              </button>
            </div>
          </div>
        </>
      )}

      {/* Remove confirmation sheet */}
      {removeConfirm && (
        <>
          <div
            onClick={() => setRemoveConfirm(null)}
            onTouchEnd={() => setRemoveConfirm(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1500, cursor: 'pointer' }}
          />
          <div
            className="bottom-sheet"
            onClick={e => e.stopPropagation()}
            onTouchEnd={e => e.stopPropagation()}
            style={{
              position: 'fixed',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'calc(100% - 32px)',
              maxWidth: 'calc(var(--max-width) - 32px)',
              zIndex: 1600,
              background: 'rgba(20, 21, 50, 0.98)',
              border: '1px solid var(--glass-border)',
              borderRadius: '24px',
              padding: '24px 20px 24px',
            }}
          >
            <div style={{ width: 40, height: 4, background: 'var(--glass-border)', borderRadius: 4, margin: '0 auto 20px' }} />
            <h3 style={{ marginBottom: '6px', textAlign: 'center' }}>Modifier ce jour</h3>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px', textTransform: 'capitalize' }}>
              {format(removeConfirm, 'EEEE d MMMM yyyy', { locale: fr })}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                className="type-btn"
                style={{ background: '#ef4444', color: '#fff' }}
                onClick={() => { toggleFast(format(removeConfirm, 'yyyy-MM-dd')); setRemoveConfirm(null); }}
              >
                🗑️ Retirer ce jour
              </button>
              <button
                className="type-btn"
                style={{ background: 'transparent', border: '1px solid var(--glass-border)' }}
                onClick={() => { setFastTypeSelector(removeConfirm); setRemoveConfirm(null); }}
              >
                ✏️ Modifier le type
              </button>
              <button
                className="type-btn"
                style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.05)', marginTop: '4px' }}
                onClick={() => setRemoveConfirm(null)}
              >
                Annuler
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
