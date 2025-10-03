import React from 'react';
import { Pressable, View } from 'react-native';

interface ClayButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

const ClayButton = ({ 
  children, 
  onPress, 
  variant = 'primary', 
  size = 'md', 
  className = "",
  disabled = false 
}: ClayButtonProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 shadow-[4px_4px_8px_#3b82f6,-4px_-4px_8px_#60a5fa] active:shadow-[2px_2px_4px_#3b82f6,-2px_-2px_4px_#60a5fa]';
      case 'secondary':
        return 'bg-sky-500 shadow-[4px_4px_8px_#0ea5e9,-4px_-4px_8px_#38bdf8] active:shadow-[2px_2px_4px_#0ea5e9,-2px_-2px_4px_#38bdf8]';
      case 'outline':
        return 'bg-white border border-slate-300 shadow-[4px_4px_8px_#e2e8f0,-4px_-4px_8px_#ffffff] active:shadow-[2px_2px_4px_#e2e8f0,-2px_-2px_4px_#ffffff]';
      default:
        return 'bg-blue-500 shadow-[4px_4px_8px_#3b82f6,-4px_-4px_8px_#60a5fa] active:shadow-[2px_2px_4px_#3b82f6,-2px_-2px_4px_#60a5fa]';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-4 py-2 rounded-lg';
      case 'md':
        return 'px-6 py-3 rounded-xl';
      case 'lg':
        return 'px-8 py-4 rounded-2xl';
      default:
        return 'px-6 py-3 rounded-xl';
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return 'text-white font-semibold';
      case 'secondary':
        return 'text-white font-semibold';
      case 'outline':
        return 'text-slate-700 font-semibold';
      default:
        return 'text-white font-semibold';
    }
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`${getVariantStyles()} ${getSizeStyles()} ${disabled ? 'opacity-50' : ''} ${className}`}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View className="flex-row items-center justify-center">
        {children}
      </View>
    </Pressable>
  );
};

export { ClayButton };
