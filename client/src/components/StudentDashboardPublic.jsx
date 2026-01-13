import { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDashboardPublic = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Use environment variable or fallback to localhost
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      setError('');
      try {
        console.log('Fetching courses from:', `${API_BASE_URL}/api/courses`);
        const response = await axios.get(`${API_BASE_URL}/api/courses`);
        console.log('Courses fetched:', response.data);
        setAllCourses(response.data);
      } catch (err) {
        console.error('Error fetching courses:', err);
        const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
        setError(`Failed to fetch courses: ${errorMsg}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, [API_BASE_URL]);

  const handleEnroll = (courseId) => {
    setMessage('Please log in to enroll in courses.');
    setTimeout(() => setMessage(''), 3000);
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh', background: '#0a0e27' }}>
        <div className="text-center">
          <div className="spinner-border" role="status" style={{ width: '3rem', height: '3rem', color: '#00d4ff' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3" style={{ color: '#8b9dc3' }}>Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid" style={{ background: '#0a0e27', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3" style={{ color: '#ffffff' }}>Student Dashboard</h1>
          <p className="lead" style={{ color: '#8b9dc3' }}>Discover amazing courses and start your learning journey</p>
        </div>

        {/* Alerts */}
        {message && (
          <div className="alert alert-dismissible fade show" role="alert" style={{ 
            borderRadius: '15px',
            background: 'rgba(0, 212, 255, 0.1)',
            border: '1px solid rgba(0, 212, 255, 0.3)',
            color: '#00d4ff'
          }}>
            {message}
            <button type="button" className="btn-close" data-bs-dismiss="alert" style={{ filter: 'invert(1)' }}></button>
          </div>
        )}
        {error && (
          <div className="alert alert-dismissible fade show" role="alert" style={{ 
            borderRadius: '15px',
            background: 'rgba(255, 71, 87, 0.1)',
            border: '1px solid rgba(255, 71, 87, 0.3)',
            color: '#ff4757'
          }}>
            {error}
            <button type="button" className="btn-close" data-bs-dismiss="alert" style={{ filter: 'invert(1)' }}></button>
          </div>
        )}

        {/* Courses Grid */}
        {allCourses.length > 0 ? (
          <div className="row g-4">
            {allCourses.map(course => (
              <div key={course._id} className="col-md-6 col-lg-4">
                <div className="card h-100 border-0" style={{ 
                  borderRadius: '20px',
                  background: 'linear-gradient(145deg, #1a1f3a 0%, #0f1729 100%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.border = '1px solid rgba(0, 212, 255, 0.3)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)';
                }}>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="badge px-3 py-2 rounded-pill" style={{ background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.3)' }}>Course</div>
                      <div className="badge px-3 py-2 rounded-pill" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                        {course.students?.length || 0} Students
                      </div>
                    </div>
                    <h4 className="card-title fw-bold mb-3" style={{ color: '#ffffff' }}>{course.title}</h4>
                    <div className="d-flex align-items-center mb-3" style={{ color: '#8b9dc3' }}>
                      <small className="fw-semibold">Instructor: {course.teacher?.username || 'Unknown'}</small>
                    </div>
                    <p className="card-text mb-4" style={{ color: '#8b9dc3', lineHeight: '1.6' }}>{course.description}</p>
                    <button 
                      className="btn btn-lg w-100 fw-semibold" 
                      style={{
                        background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                        border: 'none',
                        borderRadius: '12px',
                        padding: '12px',
                        transition: 'all 0.3s ease',
                        color: '#0a0e27'
                      }}
                      onClick={() => handleEnroll(course._id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 212, 255, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <div className="card border-0 mx-auto" style={{ 
              maxWidth: '500px', 
              borderRadius: '20px', 
              background: 'linear-gradient(145deg, #1a1f3a 0%, #0f1729 100%)',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <div className="card-body p-5">
                <h3 className="mb-3" style={{ color: '#ffffff' }}>No Courses Available</h3>
                <p style={{ color: '#8b9dc3' }}>Check back soon! New courses are being added regularly.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboardPublic;
