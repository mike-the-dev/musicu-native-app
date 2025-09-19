import { Feather } from "@expo/vector-icons";
import React, { useState } from 'react';
import { Pressable, Text, View } from "react-native";
import { Switch } from "../ui/switch";

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
}

const ClayCard = ({ children, className = "" }: ClayCardProps) => (
  <View className={`rounded-3xl bg-slate-100 shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] p-6 ${className}`}>
    {children}
  </View>
);

interface ClayButtonProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  disabled?: boolean;
}

const ClayButton = ({ children, className = "", ...props }: ClayButtonProps) => (
  <Pressable
    className={`w-full font-semibold py-3 rounded-2xl bg-violet-500 text-white shadow-[4px_4px_8px_#a4a4a4,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#a4a4a4,inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ${className}`}
    {...props}
  >
    <View className="flex-row items-center justify-center gap-2">
      {children}
    </View>
  </Pressable>
);

interface VisibilityToggleProps {
  isVisible?: boolean
  onToggle?: (isVisible: boolean) => Promise<void>
}

export default function VisibilityToggle({ isVisible = false, onToggle }: VisibilityToggleProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await onToggle?.(!isVisible);
    } catch (error) {
      console.error('Error updating visibility:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ClayCard>
      <View className="flex-row items-center gap-3 mb-4">
        <View className="w-8 h-8 rounded-lg flex items-center justify-center bg-violet-500 text-white shadow-inner">
          <Feather name="star" size={20} color="white" />
        </View>
        <Text className="text-xl font-bold text-slate-800">
          Marketplace
        </Text>
      </View>

      <View className="rounded-2xl p-4 bg-slate-100 shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]">
        <View className="flex-row items-center justify-between gap-4">
          <View className="flex-1">
            <Text className="font-semibold text-slate-800">
              {isVisible ? 'Visible to New Students' : 'Hidden from New Students'}
            </Text>
            <Text className="text-sm text-slate-600 leading-relaxed mt-1">
              {isVisible 
                ? 'Your profile is discoverable.'
                : 'Toggle to accept new students.'
              }
            </Text>
          </View>
          <View className="p-2 rounded-full bg-slate-100 shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff]">
            <Switch
              checked={isVisible}
              onCheckedChange={handleToggle}
              disabled={isLoading}
              className="data-[state=checked]:bg-violet-500 data-[state=unchecked]:bg-slate-300"
            />
          </View>
        </View>
      </View>

      {!isVisible && (
        <ClayButton onPress={handleToggle} disabled={isLoading} className="mt-4">
          {isLoading ? (
            <View className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Feather name="eye" size={16} color="white" />
          )}
          <Text className="text-white font-semibold">
            {isLoading ? 'Updating...' : 'Go Visible'}
          </Text>
        </ClayButton>
      )}
    </ClayCard>
  );
}
