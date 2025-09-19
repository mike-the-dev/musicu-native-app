import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function StudentDashboard() {
  const handleNavigate = (page: string) => {
    switch (page) {
      case 'Lessons':
        router.push('/(student)/lessons');
        break;
      case 'Practice':
        router.push('/(student)/practice');
        break;
      case 'Progress':
        router.push('/(student)/progress');
        break;
      default:
        break;
    }
  };

  return (
    <View className="flex-1 bg-slate-50">
      {/* Fixed Header */}
      <View className="bg-white px-6 py-4 shadow-sm z-10">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-slate-800">Student Dashboard</Text>
            <Text className="text-slate-600">Ready to practice? Let's make music!</Text>
          </View>
          <Pressable
            onPress={() => router.push('/')}
            className="p-2 rounded-full bg-slate-100"
          >
            <Feather name="refresh-cw" size={20} color="#64748b" />
          </Pressable>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Dashboard Content */}
        <View className="p-6">
        {/* Welcome Card */}
        <View className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-3xl p-6 shadow-lg mb-6">
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
              <Feather name="music" size={28} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-xl font-bold mb-1">Welcome back!</Text>
              <Text className="text-white/90">Ready for your next lesson?</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-slate-800 mb-4">Quick Actions</Text>
          
          <Pressable
            onPress={() => handleNavigate('Lessons')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 active:scale-95 mb-4"
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mr-4">
                <Feather name="book-open" size={24} color="#0284c7" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-slate-800">My Lessons</Text>
                <Text className="text-slate-600">View upcoming lessons</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#64748b" />
            </View>
          </Pressable>

          <Pressable
            onPress={() => handleNavigate('Practice')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 active:scale-95 mb-4"
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mr-4">
                <Feather name="music" size={24} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-slate-800">Practice</Text>
                <Text className="text-slate-600">Start your practice session</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#64748b" />
            </View>
          </Pressable>

          <Pressable
            onPress={() => handleNavigate('Progress')}
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 active:scale-95"
          >
            <View className="flex-row items-center">
              <View className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                <Feather name="trending-up" size={24} color="#d97706" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-slate-800">Progress</Text>
                <Text className="text-slate-600">Track your improvement</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#64748b" />
            </View>
          </Pressable>
        </View>

        {/* Recent Activity */}
        <View className="bg-white rounded-3xl p-6 shadow-sm">
          <Text className="text-xl font-bold text-slate-800 mb-4">Recent Activity</Text>
          <View>
            <View className="flex-row items-center mb-3">
              <View className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                <Feather name="check" size={16} color="#059669" />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-slate-800">Practice completed</Text>
                <Text className="text-sm text-slate-600">30 minutes of scales</Text>
              </View>
              <Text className="text-xs text-slate-500">2h ago</Text>
            </View>
            
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center mr-3">
                <Feather name="book-open" size={16} color="#0284c7" />
              </View>
              <View className="flex-1">
                <Text className="font-medium text-slate-800">Lesson attended</Text>
                <Text className="text-sm text-slate-600">Piano fundamentals</Text>
              </View>
              <Text className="text-xs text-slate-500">1d ago</Text>
            </View>
          </View>
        </View>
        </View>
      </ScrollView>
    </View>
  );
}
