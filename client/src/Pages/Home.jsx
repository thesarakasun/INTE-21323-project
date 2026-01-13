import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div style={{ background: '#0a0e27', minHeight: '100vh' }}>
      {/* --- Hero Section --- */}
      <div style={{ 
        background: 'linear-gradient(145deg, #1a1f3a 0%, #0f1729 100%)',
        paddingTop: '6rem',
        paddingBottom: '6rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }}></div>
        <div className="container position-relative text-center">
          <h1 className="display-3 fw-bold mb-4" style={{ color: '#ffffff' }}>Unlock Your Potential</h1>
          <p className="lead mb-0" style={{ color: '#8b9dc3', fontSize: '1.3rem' }}>
            The ultimate platform for teachers to inspire and students to learn
          </p>
        </div>
      </div>

      {/* --- Features Section --- */}
      <div className="container" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0 h-100" style={{ 
              borderRadius: '20px',
              background: 'linear-gradient(145deg, #1a1f3a 0%, #0f1729 100%)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
              e.currentTarget.style.border = '1px solid rgba(0, 212, 255, 0.3)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)';
            }}>
              <div className="card-body p-5 text-center">
                <div className="badge px-3 py-2 rounded-pill mb-4" style={{ background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.3)', fontSize: '0.9rem' }}>For Teachers</div>
                <h3 className="mb-3" style={{ color: '#ffffff' }}>Share Your Knowledge</h3>
                <p style={{ color: '#8b9dc3', lineHeight: '1.8' }}>
                  Create and manage your courses with an easy-to-use interface. Share your knowledge and build a community around your passion.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 h-100" style={{ 
              borderRadius: '20px',
              background: 'linear-gradient(145deg, #1a1f3a 0%, #0f1729 100%)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.2)';
              e.currentTarget.style.border = '1px solid rgba(16, 185, 129, 0.3)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)';
            }}>
              <div className="card-body p-5 text-center">
                <div className="badge px-3 py-2 rounded-pill mb-4" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)', fontSize: '0.9rem' }}>For Students</div>
                <h3 className="mb-3" style={{ color: '#ffffff' }}>Start Learning</h3>
                <p style={{ color: '#8b9dc3', lineHeight: '1.8' }}>
                  Discover a wide range of courses taught by expert instructors. Enroll with a single click and start your learning journey anytime, anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- YouTube Video Section --- */}
      <div className="container text-center" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <h2 className="mb-4" style={{ color: '#ffffff' }}>See How It Works</h2>
        <div className="d-flex justify-content-center">
          <div style={{ 
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <iframe 
              width="560" 
              height="315" 
              src="https://www.youtube.com/embed/fA51w1_cpMs" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              style={{ display: 'block' }}>
            </iframe>
          </div>
        </div>
      </div>
      
      {/* --- Call to Action Section --- */}
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
        <div className="card border-0 text-center" style={{ 
          borderRadius: '20px',
          background: 'linear-gradient(145deg, #1a1f3a 0%, #0f1729 100%)',
          border: '1px solid rgba(0, 212, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 212, 255, 0.1)',
          padding: '3rem 2rem'
        }}>
          <h2 className="mb-3" style={{ color: '#ffffff' }}>Ready to Get Started?</h2>
          <p className="lead mb-4" style={{ color: '#8b9dc3' }}>
            {user 
              ? "Go to your dashboard to manage your courses." 
              : "Register for an account and join our growing community."}
          </p>
          <Link 
            to={user ? "/dashboard" : "/register"} 
            className="btn btn-lg fw-semibold"
            style={{
              background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 40px',
              transition: 'all 0.3s ease',
              color: '#0a0e27',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 212, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {user ? "Go to Dashboard" : "Create an Account"}
          </Link>
        </div>
      </div>

      {/* --- Direct Dashboard Access --- */}
      <div className="container" style={{ paddingBottom: '4rem' }}>
        <h3 className="text-center mb-4" style={{ color: '#ffffff' }}>Explore Dashboards</h3>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card border-0 h-100" style={{ 
              borderRadius: '20px',
              background: 'linear-gradient(145deg, #1a1f3a 0%, #0f1729 100%)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
            }}>
              <div className="card-body p-4 text-center">
                <h4 className="mb-3" style={{ color: '#ffffff' }}>Student Dashboard</h4>
                <p className="mb-4" style={{ color: '#8b9dc3' }}>Browse and enroll in available courses</p>
                <Link 
                  to="/student-dashboard" 
                  className="btn btn-lg w-100 fw-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px',
                    transition: 'all 0.3s ease',
                    color: '#0a0e27'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 212, 255, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Access Student Dashboard
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card border-0 h-100" style={{ 
              borderRadius: '20px',
              background: 'linear-gradient(145deg, #1a1f3a 0%, #0f1729 100%)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.2)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
            }}>
              <div className="card-body p-4 text-center">
                <h4 className="mb-3" style={{ color: '#ffffff' }}>Teacher Dashboard</h4>
                <p className="mb-4" style={{ color: '#8b9dc3' }}>Create and manage your courses</p>
                <Link 
                  to="/teacher-dashboard" 
                  className="btn btn-lg w-100 fw-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px',
                    transition: 'all 0.3s ease',
                    color: '#ffffff'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Access Teacher Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;