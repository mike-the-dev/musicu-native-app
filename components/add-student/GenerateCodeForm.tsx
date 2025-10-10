import { ClayButton } from '@/components/ui/clay-button';
import { ClayCard } from '@/components/ui/clay-card';
import { CouponInput } from '@/types/coupon';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ActivityIndicator, Modal, Pressable, Text, View } from 'react-native';

interface GenerateCodeFormProps {
  onGenerate: (couponData: CouponInput) => Promise<void>;
  isLoading?: boolean;
}

export default function GenerateCodeForm({ onGenerate, isLoading = false }: GenerateCodeFormProps) {
  const [useLimit, setUseLimit] = useState('Single Use');
  const [expiresIn, setExpiresIn] = useState('14 Days');
  const [showUseLimitPicker, setShowUseLimitPicker] = useState(false);
  const [showExpiresInPicker, setShowExpiresInPicker] = useState(false);

  // Map UI values to API values
  const mapUseLimitToAPI = (uiValue: string): CouponInput['usageType'] => {
    switch (uiValue) {
      case 'Single Use':
        return 'single_use';
      case 'Multiple Use':
        return 'multiple_use';
      case 'Unlimited':
        return 'unlimited';
      default:
        return 'single_use';
    }
  };

  const mapExpiresInToAPI = (uiValue: string): CouponInput['expiresIn'] => {
    switch (uiValue) {
      case '1 Day':
        return '1_day';
      case '7 Days':
        return '7_days';
      case '14 Days':
        return '14_days';
      case '30 Days':
        return '30_days';
      case 'Never':
        return 'never';
      default:
        return '14_days';
    }
  };

  const handleGenerate = async () => {
    const couponData: CouponInput = {
      usageType: mapUseLimitToAPI(useLimit),
      expiresIn: mapExpiresInToAPI(expiresIn),
    };
    await onGenerate(couponData);
  };

  return (
    <ClayCard className="mb-6">
      <Text className="text-xl font-bold text-slate-800 mb-4">Generate New Join Code</Text>
      
      {/* Use Limit Dropdown */}
      <View className="mb-4">
        <Text className="text-slate-700 font-medium mb-2">Use Limit</Text>
        <Pressable
          onPress={() => setShowUseLimitPicker(true)}
          className="flex-row items-center justify-between px-4 py-3 bg-slate-100 rounded-xl"
        >
          <Text className="text-slate-800 font-medium">{useLimit}</Text>
          <Feather name="chevron-down" size={16} color="#64748b" />
        </Pressable>
      </View>

      {/* Expires In Dropdown */}
      <View className="mb-4">
        <Text className="text-slate-700 font-medium mb-2">Expires In</Text>
        <Pressable
          onPress={() => setShowExpiresInPicker(true)}
          className="flex-row items-center justify-between px-4 py-3 bg-slate-100 rounded-xl"
        >
          <Text className="text-slate-800 font-medium">{expiresIn}</Text>
          <Feather name="chevron-down" size={16} color="#64748b" />
        </Pressable>
      </View>

      {/* Generate Button */}
      <ClayButton 
        onPress={handleGenerate} 
        variant="secondary" 
        className="mt-2"
        disabled={isLoading}
      >
        <View className="flex-row items-center justify-center gap-2">
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Feather name="plus" size={16} color="white" />
          )}
          <Text className="text-white font-semibold">
            {isLoading ? 'Generating...' : 'Generate'}
          </Text>
        </View>
      </ClayButton>

      {/* Use Limit Picker Modal */}
      <Modal
        visible={showUseLimitPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowUseLimitPicker(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-800">Use Limit</Text>
              <Pressable onPress={() => setShowUseLimitPicker(false)}>
                <Text className="text-blue-500 font-medium">Done</Text>
              </Pressable>
            </View>
            <Picker
              selectedValue={useLimit}
              onValueChange={(itemValue) => setUseLimit(itemValue)}
              style={{ height: 200 }}
            >
              <Picker.Item label="Single Use" value="Single Use" />
              <Picker.Item label="Multiple Use" value="Multiple Use" />
              <Picker.Item label="Unlimited" value="Unlimited" />
            </Picker>
          </View>
        </View>
      </Modal>

      {/* Expires In Picker Modal */}
      <Modal
        visible={showExpiresInPicker}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowExpiresInPicker(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-4">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-slate-800">Expires In</Text>
              <Pressable onPress={() => setShowExpiresInPicker(false)}>
                <Text className="text-blue-500 font-medium">Done</Text>
              </Pressable>
            </View>
            <Picker
              selectedValue={expiresIn}
              onValueChange={(itemValue) => setExpiresIn(itemValue)}
              style={{ height: 200 }}
            >
              <Picker.Item label="1 Day" value="1 Day" />
              <Picker.Item label="7 Days" value="7 Days" />
              <Picker.Item label="14 Days" value="14 Days" />
              <Picker.Item label="30 Days" value="30 Days" />
              <Picker.Item label="Never" value="Never" />
            </Picker>
          </View>
        </View>
      </Modal>
    </ClayCard>
  );
}
