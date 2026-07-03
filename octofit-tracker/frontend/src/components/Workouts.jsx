import { useEffect, useState } from 'react';
import { fetchResource, normalizeItems } from '../lib/api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadWorkouts = async () => {
      try {
        const payload = await fetchResource('workouts');
        if (!cancelled) {
          setWorkouts(normalizeItems(payload));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load workouts.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading workouts…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Workouts</h2>
            <p className="text-muted mb-0">Suggested routines and training plans.</p>
          </div>
          <span className="badge bg-primary-subtle text-primary">{workouts.length} options</span>
        </div>
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6" key={workout._id || workout.name}>
              <div className="border rounded p-3 h-100">
                <h3 className="h6 fw-bold">{workout.name}</h3>
                <div className="text-muted small">Duration: {workout.duration} min</div>
                <div className="text-muted small">Difficulty: {workout.difficulty}</div>
                <div className="text-muted small">Focus: {workout.focus}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
