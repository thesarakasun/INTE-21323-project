import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'linear-gradient(145deg, #1a1f3a 0%, #0f1729 100%)',
      borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
      padding: '0.75rem 0'
    }}>
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          {/* Brand */}
          <Link 
            to="/" 
            className="navbar-brand fw-bold" 
            style={{ 
              color: '#ffffff',
              fontSize: '1.5rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#00d4ff'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#ffffff'}
          >
            LearnSphere
          </Link>

          {/* Navigation Links */}
          <div className="d-flex align-items-center gap-3 flex-wrap">
            <Link 
              to="/" 
              style={{ 
                color: '#8b9dc3',
                textDecoration: 'none',
                fontSize: '0.95rem',
                transition: 'color 0.3s ease',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#00d4ff'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#8b9dc3'}
            >
              Home
            </Link>
            
            {user && (
              <Link 
                to="/dashboard"
                style={{ 
                  color: '#8b9dc3',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  transition: 'color 0.3s ease',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#00d4ff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#8b9dc3'}
              >
                Dashboard
              </Link>
            )}

            {/* User Actions */}
            {user ? (
              <div className="d-flex align-items-center gap-3">
                <span style={{ color: '#8b9dc3', fontSize: '0.9rem' }}>
                  Welcome, <span style={{ color: '#00d4ff', fontWeight: '600' }}>{user.username}</span>
                </span>
                <button 
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(255, 71, 87, 0.15)',
                    border: '1px solid rgba(255, 71, 87, 0.3)',
                    color: '#ff4757',
                    borderRadius: '8px',
                    padding: '8px 20px',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 71, 87, 0.25)';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 71, 87, 0.15)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;