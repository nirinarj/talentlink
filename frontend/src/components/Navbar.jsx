import { Briefcase, FileText, Activity, Calendar, LayoutDashboard, Users, LogOut } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onLogout, userRole }) {
  // Définir les onglets selon le rôle de l'utilisateur
  let navItems = [];

  if (userRole === 'admin') {
    navItems = [
      { id: 'dashboard', label: 'Administration', icon: LayoutDashboard },
      { id: 'offres', label: "Offres d'emplois", icon: Briefcase },
      { id: 'candidatures', label: 'Candidatures', icon: FileText },
      { id: 'users', label: 'Utilisateurs', icon: Users },
    ];
  } else if (userRole === 'entreprise') {
    navItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
      { id: 'offres', label: "Offres d'emplois", icon: Briefcase },
      { id: 'candidatures', label: 'Candidatures', icon: FileText },
    ];
  } else {
    // Rôle candidat par défaut
    navItems = [
      { id: 'offres', label: "Offres d'emplois", icon: Briefcase },
      { id: 'candidatures', label: 'Mes candidatures', icon: FileText },
      { id: 'tracking', label: 'Suivi de recrutement', icon: Activity },
      { id: 'interviews', label: 'Entretiens', icon: Calendar },
    ];
  }

  return (
    <header style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', letterSpacing: '-0.5px' }}>
          Talent<span style={{ color: '#2563eb' }}>Link</span>
        </span>
        <span style={{ fontSize: '11px', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>
          {userRole}
        </span>
      </div>

      <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '14px',
                fontWeight: isActive ? '600' : '400',
                color: isActive ? '#2563eb' : '#64748b',
                cursor: 'pointer',
                padding: '6px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderBottom: isActive ? '2px solid #2563eb' : '2px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <IconComponent size={16} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div>
        <button 
          onClick={onLogout}
          style={{ background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <LogOut size={16} />
          Déconnexion
        </button>
      </div>

    </header>
  );
}