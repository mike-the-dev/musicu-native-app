import { ClayButton } from "@/components/ui/clay-button";
import { ClayCard } from "@/components/ui/clay-card";
import { router } from "expo-router";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoleSelection() {
  const handleTeacherSelection = () => {
    router.push("/(teacher)/login");
  };

  const handleStudentSelection = () => {
    router.push("/(student)/login");
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center p-8">
      <ClayCard className="w-full max-w-sm">
        <Text className="text-lg font-semibold text-center mb-6">Role Selection</Text>
        <ClayButton 
          onPress={handleTeacherSelection}
          className="w-full"
          variant="primary"
          size="lg"
        >
          <Text style={{ color: 'white'}}>Teacher</Text>
        </ClayButton>
        <ClayButton 
          onPress={handleStudentSelection}
          className="w-full mt-4"
          variant="outline"
          size="lg"
        >
          <Text>Student</Text>
        </ClayButton>
      </ClayCard>
    </SafeAreaView>
  );
}
