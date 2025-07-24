import axios from 'axios';

const API_URL = 'http://localhost:5000/api/courses';

const apiClient = axios.create({
  baseURL: API_URL,
});

apiClient.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

const createCourse = (title, description) => {
  return apiClient.post('/', { title, description });
};

const getMyCourses = () => {
  return apiClient.get('/mycourses');
};

const getAllCourses = () => {
  return apiClient.get('/');
};

const enrollInCourse = (courseId) => {
  return apiClient.put(`/${courseId}/enroll`);
};

const getEnrolledCourses = () => {
  return apiClient.get('/enrolled');
};

const courseService = {
  createCourse,
  getMyCourses,
  getAllCourses,
  enrollInCourse,
  getEnrolledCourses,
};

export default courseService;