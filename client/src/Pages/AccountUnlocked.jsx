import { useEffect, useState, useRef } from 'react'; // Import useRef
import { useParams, Link } from 'react-router-dom';
import authService from '../api/authService';

const AccountUnlocked = () => {
  const [message, setMessage] = useState('Unlocking your account...');
  const [error, setError] = useState('');
  const { token } = useParams();
  const effectRan = useRef(false); // Create the ref flag

  useEffect(() => {
    // Only run the effect if the flag is false
    if (effectRan.current === false) {
      const unlock = async () => {
        if (token) {
          try {
            const response = await authService.unlockAccount(token);
            setMessage(response.data.message);
            setError('');
          } catch (err) {
            setError(err.response?.data?.message || 'Failed to unlock account.');
            setMessage('');
          }
        }
      };
      unlock();

      // The cleanup function sets the flag to true,
      // preventing the effect from running a second time.
      return () => {
        effectRan.current = true;
      };
    }
  }, [token]);

  return (
    <div className="text-center">
      <h2>Account Unlock</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <Link to="/login" className="btn btn-primary mt-3">Proceed to Login</Link>
    </div>
  );
};

export default AccountUnlocked;