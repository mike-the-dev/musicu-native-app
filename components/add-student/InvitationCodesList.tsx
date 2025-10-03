import { ClayCard } from '@/components/ui/clay-card';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface InvitationCode {
  id: number;
  code: string;
  status: 'Active' | 'Expired';
  expires: string;
  usage: string;
}

interface InvitationCodesListProps {
  onCopyCode?: (code: string) => void;
  onShareCode?: (code: string) => void;
  onShowQR?: (code: string) => void;
  onDeleteCode?: (code: string) => void;
}

export default function InvitationCodesList({
  onCopyCode,
  onShareCode,
  onShowQR,
  onDeleteCode
}: InvitationCodesListProps) {
  const [activeTab, setActiveTab] = useState('Active');

  const handleCopyCode = (code: string) => {
    console.log('Copy code:', code);
    onCopyCode?.(code);
  };

  const handleShareCode = (code: string) => {
    console.log('Share code:', code);
    onShareCode?.(code);
  };

  const handleShowQR = (code: string) => {
    console.log('Show QR for code:', code);
    onShowQR?.(code);
  };

  const handleDeleteCode = (code: string) => {
    console.log('Delete code:', code);
    onDeleteCode?.(code);
  };

  // Sample invitation codes data
  const activeCodes: InvitationCode[] = [
    { id: 1, code: 'YMEC3HUV', status: 'Active', expires: '14 days', usage: '0 Single Use' },
    { id: 2, code: 'NEKT2P5L', status: 'Active', expires: '14 days', usage: '0 Single Use' },
    { id: 3, code: 'BGTVOIVA', status: 'Active', expires: '14 days', usage: '0 Single Use' },
    { id: 4, code: 'OZZH8CJN', status: 'Active', expires: '14 days', usage: '0 Single Use' },
    { id: 5, code: '38EFK1IC', status: 'Active', expires: '14 days', usage: '0 Single Use' },
  ];

  const expiredCodes: InvitationCode[] = [
    { id: 6, code: '70Z5X4JG', status: 'Expired', expires: '1 day ago', usage: '0 Single Use' },
    { id: 7, code: '0JL3S08N', status: 'Expired', expires: '2 days ago', usage: '0 Single Use' },
    { id: 8, code: '25MM8RFS', status: 'Expired', expires: '4 days ago', usage: '0 Single Use' },
    { id: 9, code: 'E5F6G7H8', status: 'Expired', expires: '8 months ago', usage: '3 Multi-use' },
    { id: 10, code: 'I9J0K1L2', status: 'Expired', expires: 'almost 2 years ago', usage: '0 Single Use' },
  ];

  const tabs = ['Active', 'Pending', 'Redeemed', 'Revoked'];
  const currentCodes = activeTab === 'Active' ? activeCodes : expiredCodes;

  return (
    <ClayCard className="mb-6">
      {/* Tab Navigation */}
      <View className="flex-row mb-4">
        {tabs.map((tab) => (
          <Pressable
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 rounded-lg mr-1 ${
              activeTab === tab ? 'bg-blue-500' : 'bg-slate-100'
            }`}
          >
            <Text className={`text-center font-medium text-sm ${
              activeTab === tab ? 'text-white' : 'text-slate-700'
            }`}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Codes List */}
      <View>
        {currentCodes.map((codeData, index) => (
          <View key={codeData.id} className={`bg-slate-50 rounded-xl p-4 ${index < currentCodes.length - 1 ? 'mb-3' : ''}`}>
            {/* Code and Status */}
            <View className="flex-row items-center justify-between mb-2">
              <View className="flex-1">
                <Text className="text-lg font-bold text-slate-800 mb-1">
                  {codeData.code}
                </Text>
                <Text className={`font-medium mb-1 ${
                  codeData.status === 'Active' ? 'text-green-600' : 'text-orange-600'
                }`}>
                  {codeData.status.toLowerCase()}
                </Text>
                <Text className="text-sm text-slate-600">
                  Expires {codeData.expires}
                </Text>
              </View>
              <View className="items-center">
                <Text className="text-sm text-slate-600 mb-1">
                  {codeData.usage.split(' ')[0]}
                </Text>
                <Text className="text-sm text-slate-600">
                  {codeData.usage.split(' ').slice(1).join(' ')}
                </Text>
              </View>
            </View>

            {/* Action Buttons (only for active codes) */}
            {codeData.status === 'Active' && (
              <View className="flex-row gap-2 mt-3">
                <Pressable
                  onPress={() => handleCopyCode(codeData.code)}
                  className="w-8 h-8 bg-slate-200 rounded-lg items-center justify-center"
                >
                  <Feather name="copy" size={14} color="#64748b" />
                </Pressable>
                <Pressable
                  onPress={() => handleShareCode(codeData.code)}
                  className="w-8 h-8 bg-slate-200 rounded-lg items-center justify-center"
                >
                  <Feather name="share" size={14} color="#64748b" />
                </Pressable>
                <Pressable
                  onPress={() => handleShowQR(codeData.code)}
                  className="w-8 h-8 bg-slate-200 rounded-lg items-center justify-center"
                >
                  <Feather name="grid" size={14} color="#64748b" />
                </Pressable>
                <Pressable
                  onPress={() => handleDeleteCode(codeData.code)}
                  className="w-8 h-8 bg-slate-200 rounded-lg items-center justify-center"
                >
                  <Feather name="trash-2" size={14} color="#64748b" />
                </Pressable>
              </View>
            )}
          </View>
        ))}
      </View>
    </ClayCard>
  );
}
