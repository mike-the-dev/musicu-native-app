import React from 'react';
import { Text, View } from 'react-native';

export default function StudentProfile() {
  return (
    <View className="flex-1 bg-slate-50 justify-center items-center">
      <Text className="text-2xl font-bold text-slate-800">Profile</Text>
      <Text className="text-slate-600 mt-2">Manage your student profile here</Text>
    </View>
  );
}
