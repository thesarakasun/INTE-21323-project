import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EmailVerified from './pages/EmailVerified';
import RequestPasswordReset from './pages/RequestPasswordReset';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verify-email/:token" element={<EmailVerified />} />
          <Route path="/request-password-reset" element={<RequestPasswordReset />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;