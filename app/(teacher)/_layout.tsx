import { Feather } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { HapticTab } from '@/components/haptic-tab';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider } from '@/components/ui/sidebar';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TeacherTabLayout() {
  const colorScheme = useColorScheme();

  const handleRoleChange = () => {
    router.push('/');
  };

  return (
    <SafeAreaView className="flex-1">
      <SidebarProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: { display: 'none' }, // Hide tab bar completely
          }}>
          <Tabs.Screen
            name="login"
            options={{
              href: null, // Hide from tab bar
            }}
          />
          <Tabs.Screen
            name="index"
            options={{
              title: 'Dashboard',
            }}
          />
          <Tabs.Screen
            name="students"
            options={{
              title: 'Students',
            }}
          />
          <Tabs.Screen
            name="lessons"
            options={{
              title: 'Lessons',
            }}
          />
          <Tabs.Screen
            name="progress"
            options={{
              title: 'Progress',
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
            }}
          />
        </Tabs>

        {/* Global Sidebar */}
        <Sidebar>
          <SidebarHeader>
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff]">
                <Feather name="music" size={20} color="#0ea5e9" />
              </View>
              <View>
                <Text className="font-bold text-slate-800 text-lg">musicu</Text>
                <Text className="text-xs text-slate-500 font-medium">Teacher Portal</Text>
              </View>
            </View>
          </SidebarHeader>
          
          <SidebarContent>
            <View className="space-y-2">
              <Pressable 
                className="flex-row items-center justify-between px-4 py-3 rounded-xl bg-slate-100 shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff]"
                onPress={() => router.push('/(teacher)')}
              >
                <View className="flex-row items-center gap-3">
                  <Feather name="bar-chart" size={20} color="#0ea5e9" />
                  <Text className="font-semibold text-sky-600">Dashboard</Text>
                </View>
              </Pressable>
              
              <Pressable 
                className="flex-row items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-200/70"
                onPress={() => router.push('/(teacher)/lessons')}
              >
                <View className="flex-row items-center gap-3">
                  <Feather name="calendar" size={20} color="#64748b" />
                  <Text className="font-semibold text-slate-600">Lessons</Text>
                </View>
              </Pressable>
              
              <Pressable 
                className="flex-row items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-200/70"
                onPress={() => console.log('Announcements pressed')}
              >
                <View className="flex-row items-center gap-3">
                  <Feather name="mail" size={20} color="#64748b" />
                  <Text className="font-semibold text-slate-600">Announcements</Text>
                </View>
              </Pressable>
              
              <Pressable 
                className="flex-row items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-200/70"
                onPress={() => router.push('/(teacher)/students')}
              >
                <View className="flex-row items-center gap-3">
                  <Feather name="users" size={20} color="#64748b" />
                  <Text className="font-semibold text-slate-600">Students</Text>
                </View>
              </Pressable>
              
              <Pressable 
                className="flex-row items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-200/70"
                onPress={() => router.push('/(teacher)/progress')}
              >
                <View className="flex-row items-center gap-3">
                  <Feather name="bar-chart" size={20} color="#64748b" />
                  <Text className="font-semibold text-slate-600">Progress</Text>
                </View>
              </Pressable>
              
              <Pressable 
                className="flex-row items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-200/70"
                onPress={() => console.log('Community pressed')}
              >
                <View className="flex-row items-center gap-3">
                  <Feather name="message-circle" size={20} color="#64748b" />
                  <Text className="font-semibold text-slate-600">Community</Text>
                </View>
              </Pressable>
              
              <Pressable 
                className="flex-row items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-200/70"
                onPress={() => router.push('/(teacher)/profile')}
              >
                <View className="flex-row items-center gap-3">
                  <Feather name="settings" size={20} color="#64748b" />
                  <Text className="font-semibold text-slate-600">Profile</Text>
                </View>
              </Pressable>
            </View>
          </SidebarContent>

          <SidebarFooter>
            <View className="flex-row items-center gap-3 p-3 bg-slate-100 rounded-2xl shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff]">
              <View className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center">
                <Text className="font-bold text-white">M</Text>
              </View>
              <View className="flex-1 min-w-0">
                <Text className="font-semibold text-slate-800 text-sm">Maria Rodriguez</Text>
                <Text className="text-xs text-slate-500">Piano & Guitar Instructor</Text>
              </View>
            </View>
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </SafeAreaView>
  );
}
