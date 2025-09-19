import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

// Import our converted dashboard components
import QuickStats from '@/components/dashboard/QuickStats';
import RecentActivity from '@/components/dashboard/RecentActivity';
import ReferralCard from '@/components/dashboard/ReferralCard';
import TodayLessons from '@/components/dashboard/TodayLessons';
import VisibilityToggle from '@/components/dashboard/VisibilityToggle';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function TeacherDashboard() {
  // Sample data - replace with real data from your API
  const sampleStudents = [
    { id: 1, name: 'Sarah Johnson', is_active: true, practice_streak: 7 },
    { id: 2, name: 'Mike Chen', is_active: true, practice_streak: 3 },
    { id: 3, name: 'Emma Davis', is_active: false, practice_streak: 0 },
  ];

  const sampleLessons = [
    { 
      id: 1, 
      date: new Date().toISOString().split('T')[0], 
      start_time: '10:00', 
      end_time: '11:00', 
      duration: 60,
      location_type: 'zoom',
      status: 'scheduled'
    },
    { 
      id: 2, 
      date: new Date().toISOString().split('T')[0], 
      start_time: '14:00', 
      end_time: '15:00', 
      duration: 60,
      location_type: 'in_person',
      status: 'completed',
      rate: 75
    },
  ];

  const sampleActivities = [
    {
      id: 1,
      type: 'practice',
      student: 'Sarah Johnson',
      message: 'Completed 45 minutes of practice - scales and "Für Elise"',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: 2,
      type: 'achievement',
      student: 'Mike Chen',
      message: 'Achieved 7-day practice streak! 🎉',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    },
  ];

  const handleNavigate = (page: string) => {
    switch (page) {
      case 'Students':
        router.push('/(teacher)/students');
        break;
      case 'Lessons':
        router.push('/(teacher)/lessons');
        break;
      case 'Progress':
        router.push('/(teacher)/progress');
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
          <View className="flex-row items-center gap-4">
            <SidebarTrigger />
            <View>
              <Text className="text-2xl font-bold text-slate-800">Teacher Dashboard</Text>
              <Text className="text-slate-600">Welcome back! Here's your overview.</Text>
            </View>
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
        {/* Quick Stats */}
        <View className="mb-6">
          <QuickStats 
            students={sampleStudents}
            lessons={sampleLessons}
            onNavigate={handleNavigate}
          />
        </View>

        {/* Today's Lessons */}
        <View className="mb-6">
          <TodayLessons 
            lessons={sampleLessons}
            onLessonClick={(lesson) => console.log('Lesson clicked:', lesson)}
          />
        </View>

        {/* Recent Activity */}
        <View className="mb-6">
          <RecentActivity activities={sampleActivities} />
        </View>

        {/* Referral Card */}
        <View className="mb-6">
          <ReferralCard 
            referralCode="MUSICU2024"
            onShare={() => console.log('Share pressed')}
          />
        </View>

        {/* Visibility Toggle */}
        <VisibilityToggle 
          isVisible={true}
          onToggle={async (isVisible) => {
            console.log('Visibility toggled:', isVisible);
            // Add your API call here
          }}
        />
        </View>
      </ScrollView>
    </View>
  );
}
