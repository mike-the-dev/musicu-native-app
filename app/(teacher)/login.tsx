import { router } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ClayButton } from '@/components/ui/clay-button';
import { ClayCard } from '@/components/ui/clay-card';
import { Input } from '@/components/ui/input';

export default function TeacherLogin() {
  const handleLogin = () => {
    // Simple navigation to dashboard
    router.replace('/(teacher)');
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-8 bg-slate-50">
      <ClayCard className="w-full max-w-sm">
        <Text className="text-xl font-bold text-center mb-6">Teacher Login</Text>
        
        <View className="mb-4">
          <Input placeholder="Email" />
        </View>
        
        <View className="mb-6">
          <Input placeholder="Password" secureTextEntry />
        </View>
        
        <ClayButton
          onPress={handleLogin}
          className="w-full"
          variant="primary"
          size="lg"
        >
          Sign In
        </ClayButton>
      </ClayCard>
    </SafeAreaView>
  );
}
