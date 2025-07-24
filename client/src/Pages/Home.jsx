import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="p-5 mb-4 bg-light rounded-3 text-center">
      <div className="container-fluid py-5">
        <h1 className="display-4 fw-bold">Welcome to LearnSphere</h1>
        <p className="fs-4">The platform connecting passionate teachers with eager students.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mt-4">
          <Link to="/register" className="btn btn-primary btn-lg px-4 gap-3">Register to Teach</Link>
          <Link to="/register" className="btn btn-outline-secondary btn-lg px-4">Register to Learn</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;