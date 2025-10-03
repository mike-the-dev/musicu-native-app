import React from 'react';
import { Text, View } from 'react-native';
import { z } from 'zod';

import { ClayButton } from '@/components/ui/clay-button';
import { ClayCard } from '@/components/ui/clay-card';
import { Input } from '@/components/ui/input';
import { LoginFormData, loginSchema } from '@/lib/validations';

interface FormProps {
  onLogin: (credentials: LoginFormData) => void;
  isLoading?: boolean;
  error?: string;
};

export default function Form({ onLogin, isLoading = false, error }: FormProps) {
  const [formData, setFormData] = React.useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [validationErrors, setValidationErrors] = React.useState<Partial<LoginFormData>>({});

  const handleEmailChange = (text: string) => {
    setFormData(prev => ({ ...prev, email: text }));
    // Clear validation error when user starts typing
    if (validationErrors.email) {
      setValidationErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setFormData(prev => ({ ...prev, password: text }));
    // Clear validation error when user starts typing
    if (validationErrors.password) {
      setValidationErrors(prev => ({ ...prev, password: undefined }));
    }
  };

  const resetForm = () => {
    setFormData({ email: '', password: '' });
    setValidationErrors({});
  };

  const handleSubmit = () => {
    try {
      // Validate form data with Zod
      const validatedData = loginSchema.parse(formData);
      setValidationErrors({});
      onLogin(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to a more usable format
        const fieldErrors: Partial<LoginFormData> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) fieldErrors[err.path[0] as keyof LoginFormData] = err.message;
        });
        setValidationErrors(fieldErrors);
      }
    }
  };

  return (
    <ClayCard className="w-full max-w-sm">
      <Text className="text-xl font-bold text-center mb-6">Teacher Login</Text>
      
      {error && (
        <Text className="text-red-500 text-sm text-center mb-4">{error}</Text>
      )}
      
      <View className="mb-4">
        <Input 
          placeholder="Email" 
          value={formData.email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {validationErrors.email && (
          <Text className="text-red-500 text-xs mt-1">{validationErrors.email}</Text>
        )}
      </View>
      
      <View className="mb-6">
        <Input 
          placeholder="Password" 
          secureTextEntry 
          value={formData.password}
          onChangeText={handlePasswordChange}
        />
        {validationErrors.password && (
          <Text className="text-red-500 text-xs mt-1">{validationErrors.password}</Text>
        )}
      </View>
      
      <ClayButton
        onPress={handleSubmit}
        className="w-full"
        variant="primary"
        size="lg"
        disabled={isLoading}
      >
        <Text className="text-white font-semibold">
          {isLoading ? 'Signing In...' : 'Sign In'}
        </Text>
      </ClayButton>
    </ClayCard>
  );
}
