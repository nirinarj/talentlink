{/* ONGLET SUIVI DE RECRUTEMENT */}
{activeTab === 'suivi' && (
  <div className="animated-view" style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
    <h2 style={{ fontSize: '20px', color: '#1e293b', marginBottom: '15px' }}>
      {userRole === 'candidat' ? 'Suivi de mes candidatures' : 'Pipeline de recrutement de l\'entreprise'}
    </h2>
    <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
      {userRole === 'candidat' 
        ? 'Retrouvez ici l\'historique et l\'état d\'avancement des postes auxquels vous avez postulé.' 
        : 'Gérez et faites progresser les candidats à travers les différentes étapes de recrutement.'}
    </p>

    {userRole === 'candidat' ? (
      /* --- VUE CANDIDAT --- */
      applications.filter(app => app.candidateEmail === (email || 'candidat@email.com')).length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
          Vous n'avez encore postulé à aucune offre. Rendez-vous dans l'onglet "Offres d'emploi".
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {applications
            .filter(app => app.candidateEmail === (email || 'candidat@email.com'))
            .map(app => (
              <div key={app.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                <div>
                  <h4 style={{ margin: '0 0 5px 0', color: '#1e293b', fontSize: '16px' }}>{app.jobTitle}</h4>
                  <p style={{ margin: '0 0 5px 0', color: '#0284c7', fontWeight: '600', fontSize: '14px' }}>Entreprise : {app.company}</p>
                  <p style={{ margin: '0', color: '#64748b', fontSize: '13px' }}>Postulé le : {app.date}</p>
                </div>
                <div>
                  <span style={{ 
                    background: app.status === 'Retenu' ? '#dcfce7' : app.status === 'En cours' ? '#fef9c3' : '#e0f2fe', 
                    color: app.status === 'Retenu' ? '#166534' : app.status === 'En cours' ? '#854d0e' : '#0369a1', 
                    padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' 
                  }}>
                    Statut : {app.status || 'Nouveau'}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )
    ) : (
      /* --- VUE ENTREPRISE --- */
      companyApplications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
          Aucune candidature à suivre pour le moment.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {companyApplications.map(app => (
            <div key={app.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', background: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#1e293b', fontSize: '16px' }}>{app.candidateName}</h4>
                <p style={{ margin: '0 0 5px 0', color: '#0284c7', fontWeight: '600', fontSize: '14px' }}>Poste : {app.jobTitle}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#334155' }}>Changer le statut :</label>
                <select 
                  value={app.status || 'Nouveau'} 
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    const updated = applications.map(item => item.id === app.id ? { ...item, status: newStatus } : item);
                    setApplications(updated);
                  }}
                  style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', fontWeight: '600', cursor: 'pointer', outline: 'none' }}
                >
                  <option value="Nouveau">Nouveau</option>
                  <option value="En cours">En cours</option>
                  <option value="Entretien">Entretien</option>
                  <option value="Retenu">Retenu</option>
                  <option value="Rejeté">Rejeté</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )
    )}
  </div>
)}