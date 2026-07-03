import { useEffect, useState } from 'react';
import { fetchResource, normalizeItems } from '../lib/api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadTeams = async () => {
      try {
        const payload = await fetchResource('teams');
        if (!cancelled) {
          setTeams(normalizeItems(payload));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load teams.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading teams…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Teams</h2>
            <p className="text-muted mb-0">Group activities and collaboration across squads.</p>
          </div>
          <span className="badge bg-primary-subtle text-primary">{teams.length} teams</span>
        </div>
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id || team.name}>
              <div className="border rounded p-3 h-100">
                <h3 className="h6 fw-bold">{team.name}</h3>
                <p className="text-muted small mb-3">{team.description}</p>
                <div className="small text-secondary">
                  Members: {Array.isArray(team.members) ? team.members.join(', ') : team.members}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;
