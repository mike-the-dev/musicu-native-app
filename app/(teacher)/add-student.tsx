import { GenerateCodeForm, InvitationCodesList } from '@/components/add-student';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

/**
 * @author mike-the-dev (Michael Camacho)
 * @editor mike-the-dev (Michael Camacho)
 * @lastUpdated 2024-12-19
 * @name AddStudent
 * @screen /(teacher)/add-student
 * @description A React Native screen component that handles student invitation management.
 * Features include generating new join codes with configurable use limits and expiration,
 * managing invitation codes with tabbed navigation (Active, Pending, Redeemed, Revoked),
 * and providing actions for copying, sharing, QR code generation, and deletion of codes.
 * @component
 * @returns {JSX.Element} The rendered AddStudent screen with header, form, and codes list
 */

export default function AddStudent() {
  const handleGenerate = (useLimit: string, expiresIn: string) => {
    console.log('Generate pressed with:', { useLimit, expiresIn });
    // TODO: Implement generate join code logic
  };

  const handleCopyCode = (code: string) => {
    console.log('Copy code:', code);
    // TODO: Implement copy to clipboard
  };

  const handleShareCode = (code: string) => {
    console.log('Share code:', code);
    // TODO: Implement share functionality
  };

  const handleShowQR = (code: string) => {
    console.log('Show QR for code:', code);
    // TODO: Implement QR code display
  };

  const handleDeleteCode = (code: string) => {
    console.log('Delete code:', code);
    // TODO: Implement delete functionality
  };

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="p-6">
          {/* Title and Description with Back Button */}
          <View className="mb-6">
            <View className="flex-row items-center gap-4">
              {/* Back Button */}
              <Pressable
                onPress={() => router.push('/(teacher)/students')}
                className="w-10 h-10 bg-slate-100 rounded-xl items-center justify-center shadow-sm"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 2, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }}
              >
                <Feather name="arrow-left" size={18} color="#374151" />
              </Pressable>
              
              {/* Title and Description */}
              <View className="flex-1">
                <Text className="text-3xl font-bold text-slate-800 mb-2">Invite Students</Text>
                <Text className="text-slate-600 text-lg">Generate and manage codes for new students to join.</Text>
              </View>
            </View>
          </View>

          {/* Generate New Join Code Form */}
          <GenerateCodeForm onGenerate={handleGenerate} />

          {/* Invitation Codes List */}
          <InvitationCodesList
            onCopyCode={handleCopyCode}
            onShareCode={handleShareCode}
            onShowQR={handleShowQR}
            onDeleteCode={handleDeleteCode}
          />
        </View>
      </ScrollView>
    </View>
  );
}
