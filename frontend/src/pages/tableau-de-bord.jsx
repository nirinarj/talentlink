import { LayoutDashboard, Briefcase, Users, Award } from 'lucide-react';

export default function TableauDeBord() {
  return (
    <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <h2 style={{ fontSize: '22px', color: '#1e293b', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <LayoutDashboard size={24} color="#0284c7" /> Tableau de Bord Général
      </h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '25px' }}>Statistiques globales et métriques clés de l'application.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#0284c7' }}>
            <Briefcase size={20} />
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Offres Actives</span>
          </div>
          <h3 style={{ fontSize: '26px', margin: 0, color: '#1e293b' }}>12</h3>
        </div>

        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#f43f5e' }}>
            <Users size={20} />
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Candidats Inscrits</span>
          </div>
          <h3 style={{ fontSize: '26px', margin: 0, color: '#1e293b' }}>48</h3>
        </div>

        <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#10b981' }}>
            <Award size={20} />
            <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Recrutements Réussis</span>
          </div>
          <h3 style={{ fontSize: '26px', margin: 0, color: '#1e293b' }}>7</h3>
        </div>
      </div>
    </div>
  );
}