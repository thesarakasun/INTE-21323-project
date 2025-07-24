import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

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

const register = (username, email, password, role) => {
  return apiClient.post('/register', { username, email, password, role });
};

// ... (rest of the file remains the same)
const login = (email, password) => {
  return apiClient.post('/login', { email, password });
};

const verifyEmail = (token) => {
  return apiClient.get(`/verify-email/${token}`);
};

const requestPasswordReset = (email) => {
    return apiClient.post('/request-password-reset', { email });
};

const resetPassword = (token, password) => {
    return apiClient.post(`/reset-password/${token}`, { password });
};

const authService = {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
};

export default authService;