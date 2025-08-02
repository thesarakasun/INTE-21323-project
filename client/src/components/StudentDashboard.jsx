import { useState, useEffect } from 'react';
import courseService from '../api/courseService';

const StudentDashboard = () => {
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true); // Start loading
      try {
        const allCoursesPromise = courseService.getAllCourses();
        const enrolledCoursesPromise = courseService.getEnrolledCourses();

        const [allCoursesResponse, enrolledCoursesResponse] = await Promise.all([
          allCoursesPromise,
          enrolledCoursesPromise,
        ]);

        setAllCourses(allCoursesResponse.data);
        setEnrolledCourses(enrolledCoursesResponse.data);
      } catch (err) {
        setError('Failed to fetch course data.');
      } finally {
        setIsLoading(false); // Stop loading
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    setMessage('');
    setError('');
    try {
      await courseService.enrollInCourse(courseId);
      setMessage('Successfully enrolled!');
      // Refresh both lists after enrolling
      const allCoursesResponse = await courseService.getAllCourses();
      const enrolledCoursesResponse = await courseService.getEnrolledCourses();
      setAllCourses(allCoursesResponse.data);
      setEnrolledCourses(enrolledCoursesResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to enroll.');
    }
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some(c => c._id === courseId);
  }

  // Display a loading message while fetching data
  if (isLoading) {
    return <div>Loading your dashboard...</div>;
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
        <p>You are not enrolled in any courses yet. Enroll in a course from the "Available Courses" list below!</p>
      )}

      <hr className="my-4" />
      
      <h4>Available Courses</h4>
      {allCourses.length > 0 ? (
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
      ) : (
        // This message now shows if no courses exist at all
        <div className="card text-center p-4">
          <div className="card-body">
            <h5 className="card-title">Welcome to LearnSphere!</h5>
            <p className="card-text">There are currently no courses available. Please check back later when teachers have added new courses.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;