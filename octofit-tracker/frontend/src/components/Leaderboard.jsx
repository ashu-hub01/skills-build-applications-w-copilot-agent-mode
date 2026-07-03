import { useEffect, useState } from 'react';
import { fetchResource, normalizeItems } from '../lib/api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadLeaderboard = async () => {
      try {
        const payload = await fetchResource('leaderboard');
        if (!cancelled) {
          setEntries(normalizeItems(payload));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load leaderboard.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadLeaderboard();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading leaderboard…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">The strongest performers and streaks this week.</p>
          </div>
          <span className="badge bg-primary-subtle text-primary">{entries.length} entries</span>
        </div>
        <div className="list-group">
          {entries.map((entry) => (
            <div className="list-group-item d-flex justify-content-between align-items-center" key={entry._id || entry.userId}>
              <div>
                <div className="fw-semibold">#{entry.rank || '—'} · User {entry.userId}</div>
                <div className="text-muted small">Streak: {entry.streak}</div>
              </div>
              <span className="badge bg-success-subtle text-success">{entry.score} pts</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
