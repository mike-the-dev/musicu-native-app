import { ClayCard } from '@/components/ui/clay-card';
import { CouponDTO } from '@/types/coupon';
import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

interface InvitationCodesListProps {
  coupons: CouponDTO[];
  isLoading?: boolean;
  onCopyCode?: (code: string) => void;
  onShareCode?: (code: string) => void;
  onShowQR?: (code: string) => void;
  onDeleteCode?: (code: string) => void;
}

export default function InvitationCodesList({
  coupons,
  isLoading = false,
  onCopyCode,
  onShareCode,
  onShowQR,
  onDeleteCode
}: InvitationCodesListProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'expired' | 'revoked'>('active');

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

  // Helper function to format expiration date
  const formatExpiration = (expiresAt: string | null, expiresIn: string): string => {
    if (!expiresAt || expiresIn === 'never') return 'Never expires';
    
    const expirationDate = new Date(expiresAt);
    const now = new Date();
    const diffTime = expirationDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} ago`;
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  // Helper function to format usage type
  const formatUsageType = (usageType: string): string => {
    switch (usageType) {
      case 'single_use':
        return 'Single Use';
      case 'multiple_use':
        return 'Multiple Use';
      case 'unlimited':
        return 'Unlimited';
      default:
        return usageType;
    }
  };

  // Filter out claimed coupons entirely, then filter by active tab
  const filteredCoupons = coupons
    .filter(coupon => coupon.state !== 'claimed') // Don't show claimed coupons
    .filter(coupon => coupon.state === activeTab);

  const tabs: Array<{ key: 'active' | 'pending' | 'expired' | 'revoked', label: string }> = [
    { key: 'active', label: 'Active' },
    { key: 'pending', label: 'Pending' },
    { key: 'expired', label: 'Expired' },
    { key: 'revoked', label: 'Revoked' },
  ];

  return (
    <ClayCard className="mb-6">
      {/* Tab Navigation */}
      <View className="flex-row mb-4">
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            onPress={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 px-3 rounded-lg mr-1 ${
              activeTab === tab.key ? 'bg-blue-500' : 'bg-slate-100'
            }`}
          >
            <Text className={`text-center font-medium text-sm ${
              activeTab === tab.key ? 'text-white' : 'text-slate-700'
            }`}>
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Loading State */}
      {isLoading && (
        <View className="py-8 items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-slate-600 mt-2">Loading coupons...</Text>
        </View>
      )}

      {/* Empty State */}
      {!isLoading && filteredCoupons.length === 0 && (
        <View className="py-8 items-center">
          <Feather name="inbox" size={48} color="#cbd5e1" />
          <Text className="text-slate-600 mt-2">No {activeTab} coupons found</Text>
        </View>
      )}

      {/* Codes List */}
      {!isLoading && filteredCoupons.length > 0 && (
        <View>
          {filteredCoupons.map((coupon, index) => (
            <View key={coupon.id} className={`bg-slate-50 rounded-xl p-4 ${index < filteredCoupons.length - 1 ? 'mb-3' : ''}`}>
              {/* Code and Status */}
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-slate-800 mb-1">
                    {coupon.codeId}
                  </Text>
                  <Text className={`font-medium mb-1 ${
                    coupon.state === 'active' ? 'text-green-600' : 
                    coupon.state === 'pending' ? 'text-blue-600' :
                    coupon.state === 'expired' ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {coupon.state}
                  </Text>
                  <Text className="text-sm text-slate-600">
                    {coupon.state === 'expired' ? 'Expired' : 'Expires'} {formatExpiration(coupon.expiresAt, coupon.expiresIn)}
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-sm text-slate-600 mb-1">
                    {coupon.redeemedCount}
                  </Text>
                  <Text className="text-sm text-slate-600">
                    {formatUsageType(coupon.usageType)}
                  </Text>
                </View>
              </View>

              {/* Action Buttons (only for active codes) */}
              {coupon.state === 'active' && (
                <View className="flex-row gap-2 mt-3">
                  <Pressable
                    onPress={() => handleCopyCode(coupon.codeId)}
                    className="w-8 h-8 bg-slate-200 rounded-lg items-center justify-center"
                  >
                    <Feather name="copy" size={14} color="#64748b" />
                  </Pressable>
                  <Pressable
                    onPress={() => handleShareCode(coupon.codeId)}
                    className="w-8 h-8 bg-slate-200 rounded-lg items-center justify-center"
                  >
                    <Feather name="share" size={14} color="#64748b" />
                  </Pressable>
                  <Pressable
                    onPress={() => handleShowQR(coupon.codeId)}
                    className="w-8 h-8 bg-slate-200 rounded-lg items-center justify-center"
                  >
                    <Feather name="grid" size={14} color="#64748b" />
                  </Pressable>
                  <Pressable
                    onPress={() => handleDeleteCode(coupon.codeId)}
                    className="w-8 h-8 bg-slate-200 rounded-lg items-center justify-center"
                  >
                    <Feather name="trash-2" size={14} color="#64748b" />
                  </Pressable>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </ClayCard>
  );
}
