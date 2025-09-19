import { Feather } from "@expo/vector-icons";
import React from 'react';
import { Text, View } from "react-native";

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
}

const ClayCard = ({ children, className = "" }: ClayCardProps) => (
  <View className={`rounded-3xl bg-slate-100 shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] p-6 ${className}`}>
    {children}
  </View>
);

interface RecentActivityProps {
  activities?: any[]
}

export default function RecentActivity({ activities }: RecentActivityProps) {
  const getActivityIcon = (type: string) => {
    const iconProps = { size: 16 };
    switch(type) {
      case 'practice': return <Feather name="music" {...iconProps} color="#0284c7" />;
      case 'achievement': return <Feather name="award" {...iconProps} color="#d97706" />;
      case 'progress': return <Feather name="trending-up" {...iconProps} color="#059669" />;
      case 'goal': return <Feather name="target" {...iconProps} color="#7c3aed" />;
      default: return <Feather name="clock" {...iconProps} color="#475569" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch(type) {
      case 'practice': return 'bg-sky-100';
      case 'achievement': return 'bg-amber-100';
      case 'progress': return 'bg-emerald-100';
      case 'goal': return 'bg-violet-100';
      default: return 'bg-slate-200';
    }
  };

  const sampleActivities = activities || [
    {
      id: 1,
      type: 'practice',
      student: 'Sarah Johnson',
      message: 'Completed 45 minutes of practice - scales and "Für Elise"',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 2,
      type: 'achievement',
      student: 'Mike Chen',
      message: 'Achieved 7-day practice streak! 🎉',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    },
    {
      id: 3,
      type: 'progress',
      student: 'Emma Davis',
      message: 'Moved from Beginner to Intermediate level',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: 4,
      type: 'practice',
      student: 'Alex Rivera',
      message: 'Practiced chord progressions for 30 minutes',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    }
  ];

  const formatDistanceToNow = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return `${Math.floor(diffInDays / 7)} weeks ago`;
  };

  return (
    <ClayCard>
      <View className="flex-row items-center gap-2 mb-6">
        <Feather name="trending-up" size={20} color="#10b981" />
        <Text className="text-xl font-bold text-slate-800">Recent Activity</Text>
      </View>
      <View>
        {sampleActivities.map((activity, index) => (
          <View
            key={activity.id}
            className={`p-4 rounded-2xl bg-slate-100 shadow-[inset_3px_3px_6px_#d1d1d1,inset_-3px_-3px_6px_#ffffff] ${index < sampleActivities.length - 1 ? "mb-3" : ""}`}
          >
            <View className="flex-row items-start gap-4">
              <View className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center ${getActivityColor(activity.type)}`}>
                {getActivityIcon(activity.type)}
              </View>
              <View className="flex-1 min-w-0">
                <Text className="font-semibold text-slate-800 text-sm truncate">
                  {activity.student}
                </Text>
                <Text className="text-slate-600 text-sm leading-relaxed mb-1">
                  {activity.message}
                </Text>
                <View className="flex-row items-center gap-1">
                  <Feather name="clock" size={12} color="#64748b" />
                  <Text className="text-xs text-slate-500">
                    {formatDistanceToNow(activity.timestamp)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ClayCard>
  );
}
