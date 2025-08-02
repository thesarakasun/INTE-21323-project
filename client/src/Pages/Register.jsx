import { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useAuth } from '../context/AuthContext'; // Import useAuth
import authService from '../api/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'student',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { user } = useAuth(); // Get the user from context
  const navigate = useNavigate();

  // Add this useEffect hook
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await authService.register(
        formData.username,
        formData.email,
        formData.password,
        formData.role
      );
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };
  
  // ... the return(...) JSX part remains the same
  return (
    <div>
      <h2>Register</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input type="text" name="username" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" name="password" id="password" className="form-control" onChange={handleChange} required />
          <small className="form-text text-muted">
            Must be at least 8 characters and contain a letter, a number, and a special character.
          </small>
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">I am a...</label>
          <select name="role" className="form-select" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
};

export default Register;