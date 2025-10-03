import { ClayButton } from '@/components/ui/clay-button';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

interface AddStudentButtonProps {
  onPress?: () => void;
}

export default function AddStudentButton({ onPress }: AddStudentButtonProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      // Default behavior: navigate to add student screen
      router.push('/(teacher)/add-student');
    }
  };

  return (
    <ClayButton
      onPress={handlePress}
      variant="secondary"
      size="md"
      className="w-48"
    >
      <Feather name="plus" size={20} color="white" style={{ marginRight: 14 }} />
      <Text className="text-white font-semibold">Add Student</Text>
    </ClayButton>
  );
}
