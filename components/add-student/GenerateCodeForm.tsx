import { ClayButton } from '@/components/ui/clay-button';
import { ClayCard } from '@/components/ui/clay-card';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

interface GenerateCodeFormProps {
  onGenerate: (useLimit: string, expiresIn: string) => void;
}

export default function GenerateCodeForm({ onGenerate }: GenerateCodeFormProps) {
  const [useLimit, setUseLimit] = useState('Single Use');
  const [expiresIn, setExpiresIn] = useState('14 Days');
  const [showUseLimitPicker, setShowUseLimitPicker] = useState(false);
  const [showExpiresInPicker, setShowExpiresInPicker] = useState(false);

  const handleGenerate = () => {
    onGenerate(useLimit, expiresIn);
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
      <ClayButton onPress={handleGenerate} variant="secondary" className="mt-2">
        <View className="flex-row items-center justify-center gap-2">
          <Feather name="plus" size={16} color="white" />
          <Text className="text-white font-semibold">Generate</Text>
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
