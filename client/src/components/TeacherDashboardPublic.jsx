import { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboardPublic = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Use environment variable or fallback to localhost
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const fetchAllCourses = async () => {
    setError('');
    try {
      console.log('Fetching courses from:', `${API_BASE_URL}/api/courses`);
      const response = await axios.get(`${API_BASE_URL}/api/courses`);
      console.log('Courses fetched:', response.data);
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Unknown error';
      setError(`Failed to fetch courses: ${errorMsg}`);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Please log in as a teacher to create courses.');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container-fluid" style={{ background: '#0a0e27', minHeight: '100vh', paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3" style={{ color: '#ffffff' }}>Teacher Dashboard</h1>
          <p className="lead" style={{ color: '#8b9dc3' }}>Manage and create amazing courses for your students</p>
        </div>

        {/* Create Course Card */}
        <div className="card border-0 mb-5" style={{ 
          borderRadius: '20px', 
          background: 'linear-gradient(145deg, #1a1f3a 0%, #0f1729 100%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
        }}>
          <div className="card-body p-4 p-md-5">
            <div className="mb-4">
              <h3 className="mb-2 fw-bold" style={{ color: '#ffffff' }}>Create New Course</h3>
              <p className="mb-0" style={{ color: '#8b9dc3' }}>Share your knowledge with the world</p>
            </div>
            
            {message && (
              <div className="alert alert-dismissible fade show" role="alert" style={{ 
                borderRadius: '12px',
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
                borderRadius: '12px',
                background: 'rgba(255, 71, 87, 0.1)',
                border: '1px solid rgba(255, 71, 87, 0.3)',
                color: '#ff4757'
              }}>
                {error}
                <button type="button" className="btn-close" data-bs-dismiss="alert" style={{ filter: 'invert(1)' }}></button>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ color: '#ffffff' }}>Course Title</label>
                <input 
                  type="text" 
                  name="title" 
                  className="form-control form-control-lg" 
                  style={{ 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    padding: '12px 16px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff'
                  }}
                  placeholder="e.g., Introduction to Web Development"
                  value={formData.title} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold" style={{ color: '#ffffff' }}>Course Description</label>
                <textarea 
                  name="description" 
                  className="form-control form-control-lg" 
                  style={{ 
                    borderRadius: '12px', 
                    border: '1px solid rgba(255, 255, 255, 0.1)', 
                    padding: '12px 16px', 
                    minHeight: '120px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: '#ffffff'
                  }}
                  placeholder="Describe what students will learn in this course..."
                  value={formData.description} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="btn btn-lg w-100 fw-semibold"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px',
                  transition: 'all 0.3s ease',
                  color: '#0a0e27'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 212, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                Create Course
              </button>
            </form>
          </div>
        </div>

        {/* Courses List */}
        <div className="mb-4">
          <h3 className="fw-bold mb-4" style={{ color: '#ffffff' }}>All Courses</h3>
        </div>
        
        {courses.length > 0 ? (
          <div className="row g-4">
            {courses.map(course => (
              <div key={course._id} className="col-md-6 col-lg-4">
                <div className="card border-0 h-100" style={{ 
                  borderRadius: '20px',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  background: 'linear-gradient(145deg, #1a1f3a 0%, #0f1729 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 212, 255, 0.2)';
                  e.currentTarget.style.border = '1px solid rgba(0, 212, 255, 0.3)';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.4)';
                  e.currentTarget.style.border = '1px solid rgba(255, 255, 255, 0.05)';
                }}>
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <div className="badge px-3 py-2 rounded-pill" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', border: '1px solid rgba(16, 185, 129, 0.3)' }}>Published</div>
                      <div className="badge px-3 py-2 rounded-pill" style={{ background: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff', border: '1px solid rgba(0, 212, 255, 0.3)' }}>
                        {course.students?.length || 0} Students
                      </div>
                    </div>
                    <h4 className="fw-bold mb-3" style={{ color: '#ffffff' }}>{course.title}</h4>
                    <p className="mb-3" style={{ color: '#8b9dc3', lineHeight: '1.6' }}>{course.description}</p>
                    <hr style={{ margin: '1rem 0', opacity: 0.1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <div className="d-flex align-items-center justify-content-between">
                      <small className="fw-semibold" style={{ color: '#8b9dc3' }}>By {course.teacher?.username || 'Unknown'}</small>
                      <small style={{ color: '#8b9dc3' }}>
                        {course.students?.length || 0} {course.students?.length === 1 ? 'Student' : 'Students'}
                      </small>
                    </div>
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
                <h3 className="mb-3" style={{ color: '#ffffff' }}>No Courses Yet</h3>
                <p style={{ color: '#8b9dc3' }}>Be the first to create a course and share your knowledge!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboardPublic;
