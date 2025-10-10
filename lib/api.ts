import { AuthResponse, Login } from '@/types/auth';
import { CouponDTO, CouponInput } from '@/types/coupon';
import { ListMyStudentsResponse } from '@/types/student';
import axios from 'axios';
import Constants from 'expo-constants';

const apiUrl = Constants.expoConfig?.extra?.apiUrl;

// Create axios instance with base configuration
const api = axios.create({
  baseURL: apiUrl,
  timeout: 10000, // 10 second timeout
  withCredentials: true, // Send credentials (cookies, authorization headers) with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Token storage for in-memory access (consider using SecureStore for production)
let authToken: string | null = null;

// Set the authentication token
export const setAuthToken = (token: string | null) => {
  authToken = token;
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    console.log('[API] Token set successfully');
  } else {
    delete api.defaults.headers.common['Authorization'];
    console.log('[API] Token cleared');
  }
};

// Get the current auth token
export const getAuthToken = () => authToken;

// Add request interceptor to ensure token is always included
api.interceptors.request.use(
  (config) => {
    // Log the request for debugging
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
    
    // Ensure token is in headers
    if (authToken && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${authToken}`;
      console.log('[API] Added token to request');
    }
    
    if (config.headers.Authorization) {
      const token = String(config.headers.Authorization);
      console.log('[API] Token present:', token.substring(0, 20) + '...');
    } else {
      console.warn('[API] WARNING: No authorization token in request!');
    }
    
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.method?.toUpperCase()} ${response.config.url} - Status: ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}`, {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
    });
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  login: async (loginData: Login): Promise<AuthResponse> => {
    const response = await api.post('/loginUser', loginData);
    // Automatically set the token after successful login
    if (response.data.authorization?.tokens?.access) {
      setAuthToken(response.data.authorization.tokens.access);
    }
    return response.data;
  },
};

export const couponAPI = {
  createCoupon: async (couponData: CouponInput): Promise<CouponDTO> => {
    const response = await api.post('/coupon/createCoupon', couponData);
    return response.data;
  },
  
  listCoupons: async (): Promise<CouponDTO[]> => {
    const response = await api.get('/coupon/listCoupons');
    return response.data;
  },
};

export const studentAPI = {
  listStudents: async (): Promise<ListMyStudentsResponse> => {
    const response = await api.get('/coupon/listStudents');
    return response.data;
  },
};

export default api;
