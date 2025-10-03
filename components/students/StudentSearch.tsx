import { ClayCard } from '@/components/ui/clay-card';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, Pressable, Text, TextInput, View } from 'react-native';

interface StudentSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filterValue: string;
  onFilterChange: (filter: string) => void;
  sortValue: string;
  onSortChange: (sort: string) => void;
  studentCount: number;
}

export default function StudentSearch({
  searchQuery,
  onSearchChange,
  filterValue,
  onFilterChange,
  sortValue,
  onSortChange,
  studentCount
}: StudentSearchProps) {
  const [showFilterPicker, setShowFilterPicker] = useState(false);
  const [showSortPicker, setShowSortPicker] = useState(false);

  return (
    <ClayCard className="mb-6">
      {/* Search Bar */}
      <View className="relative mb-4">
        <View className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
          <Feather name="search" size={20} color="#64748b" />
        </View>
        <TextInput
          value={searchQuery}
          onChangeText={onSearchChange}
          placeholder="Search students..."
          className="pl-12 pr-4 py-3 bg-slate-100 rounded-xl border-0 text-slate-800"
          placeholderTextColor="#64748b"
        />
      </View>

      {/* Filter and Sort Row */}
      <View className="flex-row gap-4 mb-4">
        {/* Filter Button */}
        <Pressable
          onPress={() => setShowFilterPicker(true)}
          className="flex-1 flex-row items-center justify-between px-4 py-3 bg-slate-100 rounded-xl"
        >
          <View className="flex-row items-center gap-2">
            <Feather name="filter" size={16} color="#64748b" />
            <Text className="text-slate-800 font-medium">{filterValue}</Text>
          </View>
          <Feather name="chevron-down" size={16} color="#64748b" />
        </Pressable>

        {/* Sort Button */}
        <Pressable
          onPress={() => setShowSortPicker(true)}
          className="flex-1 flex-row items-center justify-between px-4 py-3 bg-slate-100 rounded-xl"
        >
          <View className="flex-row items-center gap-2">
            <Feather name="arrow-up" size={16} color="#64748b" />
            <Text className="text-slate-800 font-medium">{sortValue}</Text>
          </View>
          <Feather name="chevron-down" size={16} color="#64748b" />
        </Pressable>
      </View>

      {/* Student Count */}
      <View className="flex-row items-center justify-between">
        <Text className="text-slate-600 font-medium">{studentCount} students</Text>
      </View>

      {/* Filter Picker Modal */}
      <Modal
        visible={showFilterPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowFilterPicker(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-800">Filter Students</Text>
              <Pressable onPress={() => setShowFilterPicker(false)}>
                <Text className="text-blue-500 font-medium">Done</Text>
              </Pressable>
            </View>
            <Picker
              selectedValue={filterValue}
              onValueChange={(itemValue) => onFilterChange(itemValue)}
              style={{ height: 200 }}
            >
              <Picker.Item label="All Students" value="All Students" />
              <Picker.Item label="Active" value="Active" />
              <Picker.Item label="Inactive" value="Inactive" />
            </Picker>
          </View>
        </View>
      </Modal>

      {/* Sort Picker Modal */}
      <Modal
        visible={showSortPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSortPicker(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-800">Sort Students</Text>
              <Pressable onPress={() => setShowSortPicker(false)}>
                <Text className="text-blue-500 font-medium">Done</Text>
              </Pressable>
            </View>
            <Picker
              selectedValue={sortValue}
              onValueChange={(itemValue) => onSortChange(itemValue)}
              style={{ height: 200 }}
            >
              <Picker.Item label="Name" value="Name" />
              <Picker.Item label="Level" value="Level" />
              <Picker.Item label="Last Practice" value="Last Practice" />
            </Picker>
          </View>
        </View>
      </Modal>
    </ClayCard>
  );
}
