import { AddStudentButton, StudentCard, StudentSearch } from '@/components/students';
import { studentAPI } from '@/lib/api';
import { StudentDTO } from '@/types/student';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, View } from 'react-native';

interface Student {
  id: string;
  name: string;
  instrument: string;
  level: string;
  lastPracticeDays: number;
  avatarColor: string;
}

export default function TeacherStudents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterValue, setFilterValue] = useState('All Students');
  const [sortValue, setSortValue] = useState('Name');
  const [studentDTOs, setStudentDTOs] = useState<StudentDTO[]>([]);
  const [isLoadingStudents, setIsLoadingStudents] = useState(true);

  // Fetch students from the backend
  const fetchStudents = async () => {
    try {
      setIsLoadingStudents(true);
      console.log('Fetching students...');
      
      const fetchedStudents = await studentAPI.listStudents();
      console.log('Students fetched successfully:', fetchedStudents);
      
      setStudentDTOs(fetchedStudents);
    } catch (error: any) {
      console.error('Error fetching students:', error);
      
      // Handle different error types
      let errorMessage = 'Failed to load students.';
      
      if (error.response?.status === 401) {
        errorMessage = 'You are not authorized. Please log in again.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  // Fetch students when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchStudents();
    }, [])
  );

  // Map StudentDTO to Student interface for display
  const students: Student[] = studentDTOs.map((studentDTO, index) => {
    const avatarColors = ['yellow', 'orange', 'blue', 'green', 'purple', 'pink'];
    
    // Calculate days since last practice (placeholder for now)
    const createdDate = new Date(studentDTO.createdAt);
    const now = new Date();
    const daysSinceCreated = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      id: studentDTO.id,
      name: studentDTO.fullName,
      instrument: studentDTO.instrument || 'Unknown',
      level: 'intermediate', // You can add this field to backend later if needed
      lastPracticeDays: daysSinceCreated, // Placeholder - replace with real practice data when available
      avatarColor: avatarColors[index % avatarColors.length]
    };
  });

  // AddStudentButton now handles navigation automatically

  const handleStudentPractice = (student: Student) => {
    console.log('Practice pressed for:', student.name);
    // Navigate to practice session or open practice modal
  };

  const handleStudentMessage = (student: Student) => {
    console.log('Message pressed for:', student.name);
    // Navigate to messaging or open message modal
  };

  const handleStudentReport = (student: Student) => {
    console.log('Report pressed for:', student.name);
    // Navigate to progress report or open report modal
  };


  // Filter and sort students based on current filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.instrument.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterValue === 'All Students' || 
                          (filterValue === 'Active' && student.lastPracticeDays <= 14) ||
                          (filterValue === 'Inactive' && student.lastPracticeDays > 14);
    return matchesSearch && matchesFilter;
  });

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortValue === 'Name') {
      return a.name.localeCompare(b.name);
    } else if (sortValue === 'Level') {
      const levelOrder = { beginner: 1, intermediate: 2, advanced: 3 };
      return levelOrder[a.level as keyof typeof levelOrder] - levelOrder[b.level as keyof typeof levelOrder];
    }
    return 0;
  });

  return (
    <View className="flex-1 bg-slate-50">
      {/* Main Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {/* Title and Description */}
          <View className="mb-6">
            <Text className="text-3xl font-bold text-slate-800 mb-2">Students</Text>
            <Text className="text-slate-600 text-lg">Manage your student roster and track progress</Text>
          </View>

          {/* Add Student Button */}
          <View className="mb-6">
            <AddStudentButton />
          </View>

          {/* Loading State */}
          {isLoadingStudents && (
            <View className="py-8 items-center">
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text className="text-slate-600 mt-2">Loading students...</Text>
            </View>
          )}

          {/* Empty State */}
          {!isLoadingStudents && students.length === 0 && (
            <View className="py-8 items-center">
              <Text className="text-slate-600 text-lg mb-2">No students yet</Text>
              <Text className="text-slate-500">Add your first student to get started</Text>
            </View>
          )}

          {/* Search and Filter Section */}
          {!isLoadingStudents && students.length > 0 && (
            <>
              <StudentSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                filterValue={filterValue}
                onFilterChange={setFilterValue}
                sortValue={sortValue}
                onSortChange={setSortValue}
                studentCount={sortedStudents.length}
              />

              {/* Student Cards */}
              <View>
                {sortedStudents.map((student) => (
                  <StudentCard
                    key={student.id}
                    student={student}
                    onPractice={handleStudentPractice}
                    onMessage={handleStudentMessage}
                    onReport={handleStudentReport}
                  />
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
