import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Index Screen - Role Selection Entry Point */}
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'Choose Your Role'
          }} 
        />
        
        {/* Teacher Stack */}
        <Stack.Screen 
          name="(teacher)" 
          options={{ 
            title: 'Teacher Dashboard'
          }} 
        />
        
        {/* Student Stack */}
        <Stack.Screen 
          name="(student)" 
          options={{ 
            title: 'Student Dashboard'
          }} 
        />
        
        {/* Shared Modal */}
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: 'modal', 
            title: 'Modal' 
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
