import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import authService from '../api/authService';

const EmailVerified = () => {
  const [message, setMessage] = useState('Verifying your email...');
  const [error, setError] = useState('');
  const { token } = useParams();
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const verify = async () => {
        if (token) {
          try {
            const response = await authService.verifyEmail(token);
            setMessage(response.data.message);
            setError('');
          } catch (err) {
            setError(err.response?.data?.message || 'Verification failed.');
            setMessage('');
          }
        }
      };
      verify();

      return () => {
        effectRan.current = true;
      };
    }
  }, [token]);

  return (
    <div className="text-center">
      <h2>Email Verification</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to="/login" className="btn btn-primary mt-3">Proceed to Login</Link>
    </div>
  );
};

export default EmailVerified;