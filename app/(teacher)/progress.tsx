import React from 'react';
import { Text, View } from 'react-native';

export default function TeacherProgress() {
  return (
    <View className="flex-1 bg-slate-50 justify-center items-center">
      <Text className="text-2xl font-bold text-slate-800">Progress</Text>
      <Text className="text-slate-600 mt-2">Track student progress here</Text>
    </View>
  );
}
