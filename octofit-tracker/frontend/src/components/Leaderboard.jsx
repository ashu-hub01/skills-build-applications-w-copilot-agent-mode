import { useEffect, useState } from 'react';
import { normalizeItems } from '../lib/api.js';

const getLeaderboardUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://127.0.0.1:8000';
  return `${baseUrl}/api/leaderboard/`;
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadLeaderboard = async () => {
      try {
        const response = await fetch(getLeaderboardUrl(), {
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
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
