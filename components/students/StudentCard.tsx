import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ClayCard } from '@/components/ui/clay-card';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface Student {
  id: number;
  name: string;
  instrument: string;
  level: string;
  lastPracticeDays: number;
  avatarColor: string;
}

interface StudentCardProps {
  student: Student;
  onPractice?: (student: Student) => void;
  onMessage?: (student: Student) => void;
  onReport?: (student: Student) => void;
}

export default function StudentCard({ student, onPractice, onMessage, onReport }: StudentCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const getAvatarColor = (color: string) => {
    switch (color) {
      case 'yellow': return 'bg-yellow-500';
      case 'orange': return 'bg-orange-500';
      case 'blue': return 'bg-blue-500';
      case 'green': return 'bg-green-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <ClayCard className="mb-4">
      {/* Top Layer: Avatar + Student Info */}
      <View className="flex-row items-center mb-4">
        <Avatar className={`w-12 h-12 ${getAvatarColor(student.avatarColor)}`}>
          <AvatarFallback className="bg-transparent">
            <Text className="text-white font-bold text-lg">{getInitials(student.name)}</Text>
          </AvatarFallback>
        </Avatar>

        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold text-slate-800">{student.name}</Text>
          <Text className="text-slate-600 capitalize">
            {student.instrument} • {student.level}
          </Text>
        </View>
      </View>

      {/* Middle Layer: Practice Indicator */}
      <View className="mb-4 flex-row justify-center">
        <View className="flex-row items-center bg-yellow-100 px-3 py-2 rounded-full self-start">
            <Feather name="activity" size={14} color="#eab308" />
          <Text className="text-yellow-600 font-medium text-sm ml-2">
            {student.lastPracticeDays}d
          </Text>
        </View>
      </View>

      {/* Bottom Layer: Action Buttons */}
      <View className="flex-row gap-3 justify-end">
        {/* Practice Button */}
        <Pressable
          onPress={() => onPractice?.(student)}
          className="bg-green-500 px-4 py-2 rounded-lg shadow-[2px_2px_4px_#22c55e,-2px_-2px_4px_#4ade80] active:shadow-[1px_1px_2px_#22c55e,-1px_-1px_2px_#4ade80]"
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed ? 0.95 : 1 }],
            },
          ]}
        >
          <View className="flex-row items-center">
            <Feather name="book" size={14} color="white" />
            <Text className="text-white font-medium text-sm ml-1">Practice</Text>
          </View>
        </Pressable>

        {/* Message Button */}
        <Pressable
          onPress={() => onMessage?.(student)}
          className="bg-purple-500 px-4 py-2 rounded-lg shadow-[2px_2px_4px_#a855f7,-2px_-2px_4px_#c084fc] active:shadow-[1px_1px_2px_#a855f7,-1px_-1px_2px_#c084fc]"
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed ? 0.95 : 1 }],
            },
          ]}
        >
          <View className="flex-row items-center">
            <Feather name="message-circle" size={14} color="white" />
            <Text className="text-white font-medium text-sm ml-1">Message</Text>
          </View>
        </Pressable>

        {/* Report Button */}
        <Pressable
          onPress={() => onReport?.(student)}
          className="bg-blue-500 px-4 py-2 rounded-lg shadow-[2px_2px_4px_#3b82f6,-2px_-2px_4px_#60a5fa] active:shadow-[1px_1px_2px_#3b82f6,-1px_-1px_2px_#60a5fa]"
          style={({ pressed }) => [
            {
              transform: [{ scale: pressed ? 0.95 : 1 }],
            },
          ]}
        >
          <View className="flex-row items-center">
            <Feather name="bar-chart-2" size={14} color="white" />
            <Text className="text-white font-medium text-sm ml-1">Report</Text>
          </View>
        </Pressable>
      </View>
    </ClayCard>
  );
}
