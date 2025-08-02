import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* --- Hero Section --- */}
      <div className="hero-section text-center text-white">
        <div className="hero-overlay"></div>
        <div className="container position-relative">
          <h1 className="display-3 fw-bold hero-title">Unlock Your Potential</h1>
          <p className="lead hero-subtitle">The ultimate platform for teachers to inspire and students to learn. Join our community today.</p>
        </div>
      </div>

      {/* --- Features Section --- */}
      <div className="container my-5">
        <div className="row text-center">
          <div className="col-md-6 feature-card-wrapper">
            <div className="feature-card p-5">
              <h3>For Teachers</h3>
              <p>Create and manage your courses with an easy-to-use interface. Share your knowledge and build a community around your passion.</p>
            </div>
          </div>
          <div className="col-md-6 feature-card-wrapper">
            <div className="feature-card p-5">
              <h3>For Students</h3>
              <p>Discover a wide range of courses taught by expert instructors. Enroll with a single click and start your learning journey anytime, anywhere.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- YouTube Video Section --- */}
      <div className="container my-5 text-center">
        <h2 className="mb-4">See How It Works</h2>
        <div className="video-responsive">
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/fA51w1_cpMs" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        </div>
      </div>
      
      {/* --- Call to Action Section --- */}
      <div className="container my-5">
        <div className="cta-card text-center text-white p-5">
          <h2>Ready to Get Started?</h2>
          <p className="lead">
            {user 
              ? "Go to your dashboard to manage your courses." 
              : "Register for an account and join our growing community."}
          </p>
          <Link to={user ? "/dashboard" : "/register"} className="btn btn-light btn-lg">
            {user ? "Go to Dashboard" : "Create an Account"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;