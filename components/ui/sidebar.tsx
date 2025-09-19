import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, View } from 'react-native';
import { SidebarProvider, useSidebar } from './sidebar-provider';

interface SidebarProps {
  children: React.ReactNode;
}

interface SidebarHeaderProps {
  children: React.ReactNode;
}

interface SidebarContentProps {
  children: React.ReactNode;
}

interface SidebarFooterProps {
  children: React.ReactNode;
}

interface SidebarTriggerProps {
  children?: React.ReactNode;
  className?: string;
}

const Sidebar = ({ children }: SidebarProps) => {
  const { isOpen, closeSidebar } = useSidebar();

  if (!isOpen) return null;

  return (
    <View className="absolute top-0 left-0 bottom-0 w-80 bg-slate-100 border-r border-slate-200" style={{ zIndex: 1002 }}>
      <View className="flex-1">
        {children}
      </View>
    </View>
  );
};

const SidebarHeader = ({ children }: SidebarHeaderProps) => (
  <View className="border-b border-slate-200 p-6">
    {children}
  </View>
);

const SidebarContent = ({ children }: SidebarContentProps) => (
  <View className="p-4 flex-1">
    {children}
  </View>
);

const SidebarFooter = ({ children }: SidebarFooterProps) => (
  <View className="border-t border-slate-200 p-4">
    {children}
  </View>
);

const SidebarTrigger = ({ children, className = "" }: SidebarTriggerProps) => {
  const { toggleSidebar } = useSidebar();

  return (
    <Pressable
      onPress={toggleSidebar}
      className={`p-2 rounded-lg hover:bg-slate-200 ${className}`}
    >
      {children || <Feather name="menu" size={20} color="#64748b" />}
    </Pressable>
  );
};

export { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarProvider, SidebarTrigger };
