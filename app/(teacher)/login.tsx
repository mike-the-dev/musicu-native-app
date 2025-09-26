import { router } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Form } from '@/components/login';
import { authAPI } from '@/lib/api';
import { LoginFormData } from '@/lib/validations';
import { AuthResponse } from '@/types';

export default function TeacherLogin() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const handleLogin = async (credentials: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(undefined);
      
      // Make API call to login endpoint
      const response: AuthResponse = await authAPI.login(credentials);
      
      // Access the response data
      console.log('User:', response.authorization.user);
      console.log('Tokens:', response.authorization.tokens);
      
      // TODO: Store tokens securely (AsyncStorage, SecureStore, etc.)
      // TODO: Store user data in context/state management
      
      // Navigate to dashboard on successful login
      router.replace('/(teacher)');
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle different error types
      if (err.response?.status === 401) 
        setError('Invalid email or password.');
      else if (err.response?.status === 400) 
        setError('Please check your email and password.');
      else if (err.code === 'ECONNABORTED') 
        setError('Request timed out. Please try again.');
      else if (err.message === 'Network Error') 
        setError('Network error. Please check your connection.');
      else 
        setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-8 bg-slate-50">
      <Form 
        onLogin={handleLogin} 
        isLoading={isLoading}
        error={error}
      />
    </SafeAreaView>
  );
}
