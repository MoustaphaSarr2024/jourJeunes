import React from 'react';
import { useFastingData } from '../hooks/useFastingData';

const RAMADAN_TOTAL = 30;

function ProgressBar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 99, height: 10, overflow: 'hidden', marginTop: 10 }}>
      <div
        style={{
          width: `${pct}%`,
          height: '100%',
          background: color,
          borderRadius: 99,
          transition: 'width 0.8s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: `0 0 8px ${color}88`,
        }}
      />
    </div>
  );
}

export default function StatsTab() {
  const { getStats } = useFastingData();
  const stats = getStats();

  const ramadanDone = stats.ramadanFasted;
  const manqueRamadan = stats.manqueRamadan || 0;
  const ramadanMissed = stats.ramadanMissed; // jours rattrapés
  const aRattraper = stats.aRattraper ?? Math.max(manqueRamadan - ramadanMissed, 0);

  return (
    <div className="stats-tab" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

      {/* Ramadan Progress */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: '1.4rem' }}>🌙</span>
          <h2 style={{ fontSize: '1.1rem' }}>Progression Ramadan</h2>
        </div>
        <p className="subtitle" style={{ marginBottom: 16 }}>
          Ramadan 1447 · 30 jours au total
        </p>

        {/* Fasted */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Jeûnés</span>
            <span style={{ fontWeight: 700, color: '#10b981' }}>{ramadanDone} / {RAMADAN_TOTAL}</span>
          </div>
          <ProgressBar value={ramadanDone} max={RAMADAN_TOTAL} color="#10b981" />
        </div>

        {/* Made up */}
        {manqueRamadan > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Rattrapés</span>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{ramadanMissed} / {manqueRamadan}</span>
          </div>
          <ProgressBar value={ramadanMissed} max={manqueRamadan || 1} color="var(--primary)" />
        </div>
        )}
      </div>

      {/* Days to make up */}
      {manqueRamadan > 0 && (
        <div className="glass-panel" style={{
          padding: '20px',
          borderLeft: '4px solid #ef4444',
          background: 'rgba(239,68,68,0.07)',
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 8 }}>Jours Ramadan manqués</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Manqués marqués</span>
            <span style={{ fontWeight: 700, color: '#ef4444' }}>{manqueRamadan}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Déjà rattrapés</span>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{ramadanMissed}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--glass-border)', paddingTop: 8 }}>
            <span style={{ fontWeight: 600 }}>À rattraper encore</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: aRattraper > 0 ? 'var(--accent-gold)' : '#10b981' }}>
              {aRattraper === 0 ? '✅' : aRattraper}
            </span>
          </div>
          {aRattraper > 0 && (
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 8 }}>
              💡 Il est recommandé de rattraper avant le prochain Ramadan
            </p>
          )}
        </div>
      )}
      {manqueRamadan === 0 && ramadanDone > 0 && (
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center', background: 'rgba(16,185,129,0.1)' }}>
          <span style={{ fontSize: '2rem' }}>🎉</span>
          <p style={{ marginTop: 8, fontWeight: 600, color: '#10b981' }}>Ramadan complet ! Macha'Allah !</p>
        </div>
      )}

      {/* Other stats */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '1rem', marginBottom: 16, color: 'var(--text-muted)' }}>Autres jeûnes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>✨ Volontaires</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--secondary)' }}>{stats.voluntary}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>⭐ Jours Blancs</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-gold)' }}>{stats.whiteDays}</span>
          </div>
          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600 }}>Total</span>
            <span style={{ fontSize: '1.6rem', fontWeight: 700 }}>{stats.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

