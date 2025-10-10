import { GenerateCodeForm, InvitationCodesList } from '@/components/add-student';
import { couponAPI } from '@/lib/api';
import { CouponDTO, CouponInput } from '@/types/coupon';
import { Feather } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [coupons, setCoupons] = useState<CouponDTO[]>([]);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(true);

  // Fetch coupons from the backend
  const fetchCoupons = async () => {
    try {
      setIsLoadingCoupons(true);
      console.log('Fetching coupons...');
      
      const fetchedCoupons = await couponAPI.listCoupons();
      console.log('Coupons fetched successfully:', fetchedCoupons);
      
      setCoupons(fetchedCoupons);
    } catch (error: any) {
      console.error('Error fetching coupons:', error);
      
      // Handle different error types
      let errorMessage = 'Failed to load coupons.';
      
      if (error.response?.status === 401) {
        errorMessage = 'You are not authorized. Please log in again.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
    } finally {
      setIsLoadingCoupons(false);
    }
  };

  // Fetch coupons when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchCoupons();
    }, [])
  );

  const handleGenerate = async (couponData: CouponInput) => {
    try {
      setIsGenerating(true);
      console.log('Generating coupon with:', couponData);
      
      // Call the API to create a new coupon
      const newCoupon = await couponAPI.createCoupon(couponData);
      
      console.log('Coupon created successfully:', newCoupon);
      
      // Show success message
      Alert.alert(
        'Success!',
        `Join code "${newCoupon.codeId}" has been created successfully.`,
        [{ text: 'OK' }]
      );
      
      // Refresh the invitation codes list
      await fetchCoupons();
      
    } catch (error: any) {
      console.error('Error creating coupon:', error);
      
      // Handle different error types
      let errorMessage = 'Failed to create join code. Please try again.';
      
      if (error.response?.status === 401) {
        errorMessage = 'You are not authorized. Please log in again.';
      } else if (error.response?.status === 400) {
        errorMessage = 'Invalid request. Please check your input.';
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timed out. Please try again.';
      } else if (error.message === 'Network Error') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      Alert.alert('Error', errorMessage, [{ text: 'OK' }]);
    } finally {
      setIsGenerating(false);
    }
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
          <GenerateCodeForm onGenerate={handleGenerate} isLoading={isGenerating} />

          {/* Invitation Codes List */}
          <InvitationCodesList
            coupons={coupons}
            isLoading={isLoadingCoupons}
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
