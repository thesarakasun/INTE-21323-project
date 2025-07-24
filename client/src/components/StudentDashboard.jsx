import { useState, useEffect } from 'react';
import courseService from '../api/courseService';

const StudentDashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAllCourses();
    fetchEnrolledCourses();
  }, []);

  const fetchAllCourses = async () => {
    try {
      const response = await courseService.getAllCourses();
      setAllCourses(response.data);
    } catch (err) {
      setError('Failed to fetch available courses.');
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const response = await courseService.getEnrolledCourses();
      setEnrolledCourses(response.data);
    } catch (err) {
      setError('Failed to fetch enrolled courses.');
    }
  };

  const handleEnroll = async (courseId) => {
    setMessage('');
    setError('');
    try {
      await courseService.enrollInCourse(courseId);
      setMessage('Successfully enrolled!');
      // Refresh both lists
      fetchAllCourses();
      fetchEnrolledCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll.');
    }
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(c => c._id === courseId);
  }

  return (
    <div>
      <h2 className="mb-4">Student Dashboard</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <h4 className="mt-4">My Enrolled Courses</h4>
      {enrolledCourses.length > 0 ? (
        <div className="row">
          {enrolledCourses.map(course => (
            <div key={course._id} className="col-md-6 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">Taught by: {course.teacher.username}</h6>
                  <p className="card-text">{course.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You are not enrolled in any courses yet.</p>
      )}

      <hr className="my-4" />
      
      <h4>Available Courses</h4>
      <div className="row">
        {allCourses.map(course => (
          <div key={course._id} className="col-md-6 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Taught by: {course.teacher.username}</h6>
                <p className="card-text">{course.description}</p>
                <button 
                  className="btn btn-primary" 
                  onClick={() => handleEnroll(course._id)}
                  disabled={isEnrolled(course._id)}
                >
                  {isEnrolled(course._id) ? 'Enrolled' : 'Enroll'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;