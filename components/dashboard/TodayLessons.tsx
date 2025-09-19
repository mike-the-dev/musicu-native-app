import { Feather } from "@expo/vector-icons";
import React from 'react';
import { Pressable, Text, View } from "react-native";

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
}

const ClayCard = ({ children, className = "" }: ClayCardProps) => (
  <View className={`rounded-3xl bg-slate-100 shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] p-6 ${className}`}>
    {children}
  </View>
);

interface ClayButtonProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

const ClayButton = ({ children, className = "", ...props }: ClayButtonProps) => (
  <Pressable
    className={`w-full font-semibold py-3 rounded-2xl bg-sky-500 text-white shadow-[4px_4px_8px_#a4a4a4,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#a4a4a4,inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ${className}`}
    {...props}
  >
    <Text className="text-white font-semibold text-center">{children}</Text>
  </Pressable>
);

interface TodayLessonsProps {
  lessons?: any[]
  onLessonClick?: (lesson: any) => void
}

export default function TodayLessons({ lessons = [], onLessonClick }: TodayLessonsProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayLessons = lessons.filter(lesson => lesson.date === today);

  const getLocationIcon = (type: string) => {
    const iconProps = { size: 16 };
    switch(type) {
      case 'zoom': return <Feather name="video" {...iconProps} color="#64748b" />;
      case 'in_person': return <Feather name="map-pin" {...iconProps} color="#64748b" />;
      default: return <Feather name="map-pin" {...iconProps} color="#64748b" />;
    }
  };

  const getLocationText = (lesson: any) => {
    if (lesson.location_type === 'zoom') return 'Online Lesson';
    if (lesson.location_address) return lesson.location_address;
    return 'In Person';
  };

  return (
    <ClayCard>
      <View className="flex-row items-center justify-between mb-6">
        <View className="flex-row items-center gap-2">
          <Feather name="calendar" size={20} color="#0ea5e9" />
          <Text className="text-xl font-bold text-slate-800">Today's Lessons</Text>
        </View>
        <View className="text-sm font-semibold px-3 py-1 bg-slate-200 rounded-lg">
          <Text className="text-slate-600">{todayLessons.length} scheduled</Text>
        </View>
      </View>
      <View>
        {todayLessons.length > 0 ? (
          <>
            <View>
              {todayLessons.slice(0, 3).map((lesson, index) => (
                <View key={lesson.id} className={index < todayLessons.slice(0, 3).length - 1 ? "mb-3" : ""}>
                  <Pressable
                    onPress={() => onLessonClick?.(lesson)}
                    className="p-4 rounded-2xl bg-slate-100 shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff] hover:shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] transition-all duration-200"
                  >
                    <View className="flex-row items-center justify-between mb-2">
                      <View className="flex-row items-center gap-2">
                        <Feather name="clock" size={16} color="#64748b" />
                        <Text className="font-semibold text-slate-800">
                          {lesson.start_time} - {lesson.end_time}
                        </Text>
                      </View>
                      <View className="text-xs font-bold px-2 py-1 bg-emerald-400 rounded-md">
                        <Text className="text-white">{lesson.duration}min</Text>
                      </View>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <View>
                        <Text className="font-semibold text-slate-800">
                          Sarah Johnson
                        </Text>
                        <View className="flex-row items-center gap-2 mt-1">
                          {getLocationIcon(lesson.location_type)}
                          <Text className="text-sm text-slate-600">
                            {getLocationText(lesson)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Pressable>
                </View>
              ))}
            </View>
            <View className="mt-4">
              <ClayButton>
                View Full Schedule
              </ClayButton>
            </View>
          </>
        ) : (
          <View className="items-center py-8">
             <View className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[inset_5px_5px_10px_#d1d1d1,inset_-5px_-5px_10px_#ffffff]">
              <Feather name="calendar" size={32} color="#94a3b8" />
            </View>
            <Text className="text-slate-600 font-medium mb-2">No lessons scheduled for today</Text>
            <Text className="text-sm text-slate-500">Enjoy your free day!</Text>
          </View>
        )}
      </View>
    </ClayCard>
  );
}
