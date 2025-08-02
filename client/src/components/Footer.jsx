import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container text-white mt-5">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">LearnSphere</h5>
            <p>
              Connecting passionate teachers with eager students. Our platform provides the tools for educators to create engaging courses and for learners to discover new passions.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Navigate</h5>
            <ul className="list-unstyled mb-0">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/dashboard" className="text-white">Dashboard</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>
            <ul className="list-unstyled mb-0">
              <li><a href="#!" className="text-white">Facebook</a></li>
              <li><a href="#!" className="text-white">Twitter</a></li>
              <li><a href="#!" className="text-white">Instagram</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {currentYear} Copyright:
        <a className="text-white" href="#!"> LearnSphere.com</a>
      </div>
    </footer>
  );
};

export default Footer;