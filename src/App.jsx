import { useState, useMemo } from 'react'
import './App.css'
import CalendarTab from './components/CalendarTab'
import StatsTab from './components/StatsTab'
import WhiteDaysTab from './components/WhiteDaysTab'

function getRamadanInfo() {
  try {
    const today = new Date();
    const parts = new Intl.DateTimeFormat('fr-TN-u-ca-islamic', {
      month: 'numeric',
      day: 'numeric',
    }).formatToParts(today);
    const month = parseInt(parts.find(p => p.type === 'month')?.value);
    const day = parseInt(parts.find(p => p.type === 'day')?.value);
    return { isRamadan: month === 9, day };
  } catch {
    return { isRamadan: false, day: 0 };
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('calendar');
  const ramadan = useMemo(() => getRamadanInfo(), []);

  const renderTab = () => {
    switch (activeTab) {
      case 'calendar': return <CalendarTab />;
      case 'stats': return <StatsTab />;
      case 'whitedays': return <WhiteDaysTab />;
      default: return <CalendarTab />;
    }
  };

  return (
    <div className="app-container">
      {/* Ramadan Banner */}
      {ramadan.isRamadan && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(251,191,36,0.25), rgba(251,191,36,0.08))',
          border: '1px solid rgba(251,191,36,0.4)',
          borderRadius: '16px',
          padding: '12px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '1.6rem' }}>🌙</span>
          <div>
            <p style={{ fontWeight: 700, color: 'var(--accent-gold)', fontSize: '0.95rem', marginBottom: 2 }}>
              Ramadan Moubarak 🌟
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              Jour {ramadan.day} du Ramadan 1447
            </p>
          </div>
        </div>
      )}

      <header className="app-header">
        <h1 className="title">Jours Jeûnés</h1>
        <p className="subtitle">Suivi de jeûne islamique</p>
      </header>

      <main className="tab-content animate-in">
        {renderTab()}
      </main>

      <nav className="bottom-nav glass-panel">
        <button 
          className={`nav-item ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <span className="icon">📊</span>
          <span className="label">Historique</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'calendar' ? 'active' : ''}`}
          onClick={() => setActiveTab('calendar')}
        >
          <span className="icon">📅</span>
          <span className="label">Calendrier</span>
        </button>
        <button 
          className={`nav-item ${activeTab === 'whitedays' ? 'active' : ''}`}
          onClick={() => setActiveTab('whitedays')}
        >
          <span className="icon">🌙</span>
          <span className="label">Jours Blancs</span>
        </button>
      </nav>
    </div>
  )
}

export default App
