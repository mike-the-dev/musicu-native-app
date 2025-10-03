import { AuthResponse, Login } from '@/types/auth';
import axios from 'axios';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

// Create axios instance with base configuration
const api = axios.create({
  baseURL: apiUrl,
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
