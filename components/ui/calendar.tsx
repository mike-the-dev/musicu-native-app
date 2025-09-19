import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { View } from "react-native"
import { Calendar as RNCalendar } from 'react-native-calendars'

import { cn } from "../../lib/utils"

interface CalendarProps {
  className?: string
  classNames?: Record<string, string>
  showOutsideDays?: boolean
  mode?: "single" | "range"
  selected?: any
  onSelect?: (date: any) => void
  children?: React.ReactNode
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  mode = "single",
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState(selected);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    onSelect?.(day);
  };

  return (
    <View className={cn("p-3", className)}>
      <RNCalendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#0ea5e9',
            selectedTextColor: 'white'
          }
        }}
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          textSectionTitleColor: '#64748b',
          selectedDayBackgroundColor: '#0ea5e9',
          selectedDayTextColor: 'white',
          todayTextColor: '#0ea5e9',
          dayTextColor: '#0f172a',
          textDisabledColor: '#94a3b8',
          dotColor: '#0ea5e9',
          selectedDotColor: 'white',
          arrowColor: '#0ea5e9',
          monthTextColor: '#0f172a',
          indicatorColor: '#0ea5e9',
          textDayFontWeight: '400',
          textMonthFontWeight: '500',
          textDayHeaderFontWeight: '400',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 13,
        }}
        renderArrow={(direction) => {
          if (direction === 'left') {
            return (
              <View className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 items-center justify-center">
                <Ionicons name="chevron-back" size={16} color="#64748b" />
              </View>
            );
          } else {
            return (
              <View className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 items-center justify-center">
                <Ionicons name="chevron-forward" size={16} color="#64748b" />
              </View>
            );
          }
        }}
        {...props}
      />
    </View>
  );
}
Calendar.displayName = "Calendar"

export { Calendar }
