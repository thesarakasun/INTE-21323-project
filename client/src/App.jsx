import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Dashboard from './Pages/Dashboard.jsx';
import EmailVerified from './Pages/EmailVerified.jsx';
import RequestPasswordReset from './Pages/RequestPasswordReset.jsx';
import ResetPassword from './Pages/ResetPassword.jsx';
import AccountUnlocked from './Pages/AccountUnlocked.jsx';
import StudentDashboardPublic from './components/StudentDashboardPublic.jsx';
import TeacherDashboardPublic from './components/TeacherDashboardPublic.jsx';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#0a0e27' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboardPublic />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboardPublic />} />
          <Route path="/verify-email/:token" element={<EmailVerified />} />
          <Route
            path="/request-password-reset"
            element={<RequestPasswordReset />}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/unlock-account/:token" element={<AccountUnlocked />} />
        </Routes>
      </main>
      <Footer /> 
    </div>
  );
}

export default App;