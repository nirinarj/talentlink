import { useState, useEffect } from 'react';
import { Briefcase, Clock, FileText, CheckCircle2, XCircle } from 'lucide-react';

export default function Candidatures() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les candidatures depuis l'API Django au chargement
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/applications/")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setApplications(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Erreur lors du chargement des candidatures :", err);
        setLoading(false);
      });
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Entretien planifie':
        return { bg: '#e0f2fe', color: '#0369a1', icon: <Clock size={14} /> };
      case 'Accepte':
        return { bg: '#dcfce7', color: '#15803d', icon: <CheckCircle2 size={14} /> };
      case 'Refuse':
        return { bg: '#fee2e2', color: '#b91c1c', icon: <XCircle size={14} /> };
      default:
        return { bg: '#fef3c7', color: '#b45309', icon: <Clock size={14} /> };
    }
  };

  return (
    <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <h2 style={{ fontSize: '22px', color: '#1e293b', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Briefcase size={24} color="#0284c7" /> Mes Candidatures
      </h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '25px' }}>Suivez l'historique et l'état d'avancement de vos candidatures.</p>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>Chargement de vos candidatures...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {applications.length > 0 ? (
            applications.map(app => {
              const badge = getStatusBadge(app.status);
              return (
                <div key={app.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1e293b' }}>{app.jobTitle || app.job_title || "Poste sans intitule"}</h3>
                    <p style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#64748b', fontWeight: '600' }}>{app.company || "Entreprise"}</p>
                    <span style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <FileText size={14} /> Postulé le {app.date || app.created_at || "Récemment"}
                    </span>
                  </div>
                  <div>
                    <span style={{ 
                      background: badge.bg, 
                      color: badge.color, 
                      padding: '6px 12px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: 'bold',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      {badge.icon} {app.status || "En cours"}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            <p style={{ textAlign: 'center', color: '#64748b', padding: '30px' }}>Vous n'avez encore soumis aucune candidature.</p>
          )}
        </div>
      )}
    </div>
  );
}