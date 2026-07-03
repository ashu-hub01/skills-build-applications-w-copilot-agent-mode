import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { getApiBaseUrl } from './lib/api.js';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  const apiBaseUrl = getApiBaseUrl();
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return (
    <div className="container py-4 py-lg-5">
      <div className="row justify-content-center">
        <div className="col-12 col-xl-10">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-lg-5">
              <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
                <div>
                  <h1 className="display-6 fw-bold mb-2">OctoFit Tracker</h1>
                  <p className="lead text-muted mb-0">
                    A multi-tier fitness tracking experience with users, teams, workouts, and live activity data.
                  </p>
                </div>
                <div className="text-lg-end">
                  <div className="fw-semibold">API base</div>
                  <div className="small text-muted">{apiBaseUrl}</div>
                  <div className="small text-muted">
                    {codespaceName ? `Codespace: ${codespaceName}` : 'Local fallback mode'}
                  </div>
                </div>
              </div>

              <nav className="nav nav-pills flex-wrap gap-2 mb-4">
                {navItems.map((item) => (
                  <NavLink key={item.to} className="nav-link" to={item.to} end={item.to === '/'}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <div className="alert alert-warning small" role="alert">
                Define <strong>VITE_CODESPACE_NAME</strong> in <strong>.env.local</strong> when running in GitHub Codespaces. If it is unset, the app falls back to the local backend URL.
              </div>

              <Routes>
                <Route path="/" element={<div className="row g-3"><div className="col-md-6"><Users /></div><div className="col-md-6"><Teams /></div><div className="col-12"><Activities /></div></div>} />
                <Route path="/users" element={<Users />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
