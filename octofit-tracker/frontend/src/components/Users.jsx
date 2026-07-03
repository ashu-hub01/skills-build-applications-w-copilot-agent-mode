import { useEffect, useState } from 'react';
import { fetchResource, normalizeItems } from '../lib/api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const loadUsers = async () => {
      try {
        const payload = await fetchResource('users');
        if (!cancelled) {
          setUsers(normalizeItems(payload));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Unable to load users.');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <div className="alert alert-info">Loading users…</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Users</h2>
            <p className="text-muted mb-0">Athletes and fitness enthusiasts in the tracker.</p>
          </div>
          <span className="badge bg-primary-subtle text-primary">{users.length} records</span>
        </div>
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Goal</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.fitnessGoal}</td>
                  <td>{user.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
