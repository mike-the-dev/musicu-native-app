import React from 'react';
import { Text, View } from 'react-native';

export default function StudentPractice() {
  return (
    <View className="flex-1 bg-slate-50 justify-center items-center">
      <Text className="text-2xl font-bold text-slate-800">Practice</Text>
      <Text className="text-slate-600 mt-2">Start your practice session here</Text>
    </View>
  );
}
