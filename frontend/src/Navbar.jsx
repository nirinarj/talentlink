export default function Navbar({ activeTab, setActiveTab, onLogout }) {
  const navItems = [
    { id: 'jobs', label: "Offres d'emplois" },
    { id: 'applications', label: 'Candidatures' },
    { id: 'tracking', label: 'Suivi de recrutement' },
    { id: 'interviews', label: 'Entretiens' },
    { id: 'dashboard', label: 'Tableau de bord' },
  ];

  return (
    <header style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      
      {/* Logo et Nom de la plateforme */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', letterSpacing: '-0.5px' }}>
          Talent<span style={{ color: '#2563eb' }}>Link</span>
        </span>
      </div>

      {/* Liens de navigation */}
      <nav style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '15px',
                fontWeight: isActive ? '600' : '400',
                color: isActive ? '#2563eb' : '#64748b',
                cursor: 'pointer',
                padding: '6px 0',
                borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Bouton de déconnexion */}
      <div>
        <button 
          onClick={onLogout}
          style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
        >
          Déconnexion
        </button>
      </div>

    </header>
  );
}