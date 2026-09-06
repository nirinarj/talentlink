import { Calendar, Clock, Video } from 'lucide-react';

export default function Entretiens() {
  const interviewsList = [
    { id: 1, candidate: "Jean Rakoto", job: "Agent de Chat", dateTime: "05/09/2026 à 10:00" }
  ];

  return (
    <div style={{ background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
      <h2 style={{ fontSize: '22px', color: '#1e293b', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Calendar size={24} color="#0284c7" /> Planning des Entretiens
      </h2>
      <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '25px' }}>Consultez les rendez-vous pris avec les candidats retenus.</p>

      {interviewsList.map(item => (
        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
          <div>
            <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1e293b' }}>{item.candidate}</h3>
            <p style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#64748b' }}>Poste : {item.job}</p>
            <span style={{ fontSize: '13px', color: '#0284c7', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <Clock size={14} /> {item.dateTime}
            </span>
          </div>
          <button style={{ background: '#0284c7', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Video size={16} /> Rejoindre
          </button>
        </div>
      ))}
    </div>
  );
}