import { Feather } from "@expo/vector-icons";
import React from 'react';
import { Pressable, Text, View } from "react-native";

interface StatCardProps {
  icon: (props: any) => React.ReactElement;
  title: string;
  value: string | number;
  color: { bg: string; iconColor: string };
  index: number;
  linkTo?: string;
  onPress?: () => void;
}

const StatCard = ({ icon: Icon, title, value, color, index, linkTo, onPress }: StatCardProps) => {
  const CardContent = (
    <View
      className="rounded-2xl bg-slate-100 shadow-[6px_6px_12px_#b8b8b8,-6px_-6px_12px_#ffffff] p-5 hover:shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] transition-all duration-200"
    >
      <View className="flex-row items-center gap-4">
        <View className={`w-12 h-12 rounded-xl flex items-center justify-center ${color.bg} shadow-inner`}>
          <Icon size={24} color={color.iconColor} />
        </View>
        <View>
          <Text className="text-2xl font-bold text-slate-800">{value}</Text>
          <Text className="text-sm font-medium text-slate-600">{title}</Text>
        </View>
      </View>
    </View>
  );

  return linkTo || onPress ? (
    <Pressable onPress={onPress} className="block">
      {CardContent}
    </Pressable>
  ) : (
    CardContent
  );
};

interface QuickStatsProps {
  students?: any[]
  lessons?: any[]
  teacher?: any
  onNavigate?: (page: string) => void
}

export default function QuickStats({ students = [], lessons = [], teacher, onNavigate }: QuickStatsProps) {
  const activeStudents = students.filter(s => s.is_active).length;
  const upcomingLessons = lessons.filter(l => new Date(l.date) >= new Date()).length;
  const monthlyEarnings = lessons
    .filter(l => {
      const lessonDate = new Date(l.date);
      const now = new Date();
      return lessonDate.getMonth() === now.getMonth() && 
             lessonDate.getFullYear() === now.getFullYear() &&
             l.status === 'completed';
    })
    .reduce((sum, l) => sum + (l.rate || 0), 0);
  
  const maxStreak = Math.max(...students.map(s => s.practice_streak || 0), 0);

  const stats = [
    {
      icon: (props: any) => <Feather name="users" {...props} />,
      title: "Students",
      value: activeStudents,
      color: { bg: "bg-sky-200", iconColor: "#0284c7" },
      onPress: () => onNavigate?.("Students")
    },
    {
      icon: (props: any) => <Feather name="calendar" {...props} />,
      title: "Upcoming Lessons",
      value: upcomingLessons,
      color: { bg: "bg-violet-200", iconColor: "#7c3aed" }
    },
    {
      icon: (props: any) => <Feather name="dollar-sign" {...props} />,
      title: "Monthly Earnings",
      value: `$${monthlyEarnings.toLocaleString()}`,
      color: { bg: "bg-emerald-200", iconColor: "#059669" }
    },
    {
      icon: (props: any) => <Feather name="zap" {...props} />,
      title: "Best Streak",
      value: `${maxStreak} days`,
      color: { bg: "bg-amber-200", iconColor: "#d97706" }
    }
  ];

  return (
    <View className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </View>
  );
}
