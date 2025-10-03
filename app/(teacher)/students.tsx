import { AddStudentButton, StudentCard, StudentSearch } from '@/components/students';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

interface Student {
  id: number;
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

  // Sample student data matching the design
  const students: Student[] = [
    {
      id: 1,
      name: 'Emma Davis',
      instrument: 'Piano',
      level: 'advanced',
      lastPracticeDays: 28,
      avatarColor: 'yellow'
    },
    {
      id: 2,
      name: 'Mike Chen',
      instrument: 'Guitar',
      level: 'beginner',
      lastPracticeDays: 7,
      avatarColor: 'orange'
    },
    {
      id: 3,
      name: 'Sarah Johnson',
      instrument: 'Piano',
      level: 'intermediate',
      lastPracticeDays: 12,
      avatarColor: 'orange'
    }
  ];

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

          {/* Search and Filter Section */}
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
        </View>
      </ScrollView>
    </View>
  );
}
