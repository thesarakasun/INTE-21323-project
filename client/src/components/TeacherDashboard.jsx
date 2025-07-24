import { useState, useEffect } from 'react';
import courseService from '../api/courseService';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const response = await courseService.getMyCourses();
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await courseService.createCourse(formData.title, formData.description);
      setMessage('Course created successfully!');
      setFormData({ title: '', description: '' });
      fetchMyCourses(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create course.');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Teacher Dashboard</h2>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Create New Course</h5>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Course Title</label>
              <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Course Description</label>
              <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">Create Course</button>
          </form>
        </div>
      </div>

      <h5>My Courses</h5>
      {courses.length > 0 ? (
        <ul className="list-group">
          {courses.map(course => (
            <li key={course._id} className="list-group-item">
              <h5>{course.title}</h5>
              <p>{course.description}</p>
              <small>Students Enrolled: {course.students.length}</small>
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not created any courses yet.</p>
      )}
    </div>
  );
};

export default TeacherDashboard;