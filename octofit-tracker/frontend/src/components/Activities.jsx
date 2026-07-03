import { useEffect, useState } from 'react';
import { normalizeItems } from '../lib/api.js';

const getActivitiesUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const baseUrl = codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://127.0.0.1:8000';
  return `${baseUrl}/api/activities/`;
};

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadActivities = async () => {
      try {
        const response = await fetch(getActivitiesUrl(), {
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const payload = await response.json();
        if (!cancelled) {
          setActivities(normalizeItems(payload));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load activities.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadActivities();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading activities…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Activities</h2>
            <p className="text-muted mb-0">Recent fitness sessions and activity logs.</p>
          </div>
          <span className="badge bg-primary-subtle text-primary">{activities.length} logs</span>
        </div>
        <div className="list-group">
          {activities.map((activity) => (
            <div className="list-group-item" key={activity._id || activity.date}>
              <div className="d-flex justify-content-between gap-3">
                <div>
                  <div className="fw-semibold">{activity.type}</div>
                  <div className="text-muted small">User ID: {activity.userId}</div>
                </div>
                <div className="text-end small text-secondary">
                  <div>{activity.duration} min</div>
                  <div>{activity.caloriesBurned} kcal</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Activities;
