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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">LearnSphere</Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>
          
          {/* This wrapper div ensures consistent alignment for both states */}
          <div className="navbar-user-actions">
            {user ? (
              <div className="d-flex align-items-center">
                <span className="navbar-text me-3">
                  Welcome, {user.username}
                </span>
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;