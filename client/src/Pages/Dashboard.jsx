import { useState, useEffect } from 'react';
import authService from '../api/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState('');
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
        navigate('/login');
        return;
    }
    
    authService.getProtectedData()
      .then(response => {
        setData(response.data.message);
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to fetch data');
        if(err.response?.status === 401) {
            logout();
            navigate('/login');
        }
      });
  }, [user, navigate, logout]);

  return (
    <div>
      <h2>Dashboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : <div className="alert alert-success">{data}</div>}
      {user && (
        <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;