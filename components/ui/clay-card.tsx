import React from 'react';
import { View } from 'react-native';

interface ClayCardProps {
  children: React.ReactNode;
  className?: string;
}

const ClayCard = ({ children, className = "" }: ClayCardProps) => (
  <View className={`rounded-3xl bg-slate-100 shadow-[8px_8px_16px_#b8b8b8,-8px_-8px_16px_#ffffff] p-6 ${className}`}>
    {children}
  </View>
);

export { ClayCard };
