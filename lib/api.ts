import { AuthResponse, Login } from '@/types/auth';
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://production.eba-ushmprpm.us-west-2.elasticbeanstalk.com/api',
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const authAPI = {
  login: async (loginData: Login): Promise<AuthResponse> => {
    const response = await api.post('/loginUser', loginData);
    return response.data;
  },
};

export default api;
