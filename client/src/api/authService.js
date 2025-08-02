import axios from 'axios';

const API_BASE_URL = window.env.API_BASE_URL || 'http://localhost:5000';


const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api/auth`,
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

const unlockAccount = (token) => {
  return apiClient.get(`/unlock/${token}`);
};

const authService = {
  register,
  login,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  unlockAccount,
};

export default authService;