import { Feather } from "@expo/vector-icons";
import * as Clipboard from 'expo-clipboard';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from "react-native";

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
}

const ClayButton = ({ children, className = "", ...props }: ClayButtonProps) => (
  <Pressable
    className={`w-full font-semibold py-3 rounded-2xl bg-amber-400 text-white shadow-[4px_4px_8px_#a4a4a4,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#a4a4a4,inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ${className}`}
    {...props}
  >
    <View className="flex-row items-center justify-center gap-2">
      {children}
    </View>
  </Pressable>
);

interface IconButtonProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

const IconButton = ({ children, className = "", ...props }: IconButtonProps) => (
  <Pressable
    className={`w-12 h-12 flex items-center justify-center rounded-xl bg-slate-100 text-slate-600 shadow-[4px_4px_8px_#b8b8b8,-4px_-4px_8px_#ffffff] active:shadow-[inset_4px_4px_8px_#b8b8b8,inset_-4px_-4px_8px_#ffffff] transition-all duration-150 ${className}`}
    {...props}
  >
    {children}
  </Pressable>
);

interface ReferralCardProps {
  referralCode?: string
  onShare?: () => void
}

export default function ReferralCard({ referralCode = "MUSICU2024", onShare }: ReferralCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await Clipboard.setStringAsync(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const referralUrl = `https://musicu.app/join?ref=${referralCode}`;

  const handleShare = async () => {
    try {
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(referralUrl, {
          dialogTitle: 'Join Musicu - Music Learning Platform',
          mimeType: 'text/plain',
        });
      } else {
        await Clipboard.setStringAsync(referralUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }

    if (onShare) onShare();
  };

  return (
    <ClayCard>
      <View className="flex-row items-center gap-3 mb-4">
        <View className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-400 text-white shadow-inner">
          <Feather name="gift" size={20} color="white" />
        </View>
        <Text className="text-xl font-bold text-slate-800">
          Referral Program
        </Text>
      </View>

      <View className="rounded-2xl p-4 bg-slate-100 shadow-[inset_4px_4px_8px_#d1d1d1,inset_-4px_-4px_8px_#ffffff]">
        <Text className="text-sm text-slate-600 mb-4 leading-relaxed text-center">
          Share your code and earn <Text className="text-amber-600 font-bold">$25</Text> for each new student!
        </Text>
        
        <View>
          <View className="flex-row gap-2 mb-3">
            <TextInput
              value={referralCode}
              editable={false}
              className="flex-1 w-full px-4 py-3 rounded-xl font-mono text-center font-bold text-slate-700 bg-slate-100 border-none shadow-[inset_2px_2px_4px_#d1d1d1,inset_-2px_-2px_4px_#ffffff]"
              selectTextOnFocus={false}
            />
            <IconButton onPress={handleCopy}>
              {copied ? (
                <Feather name="check" size={20} color="#10b981" />
              ) : (
                <Feather name="copy" size={20} color="#64748b" />
              )}
            </IconButton>
          </View>

          <ClayButton onPress={handleShare}>
            <Feather name="share-2" size={16} color="white" />
            <Text className="text-white font-semibold">Share with Friends</Text>
          </ClayButton>
        </View>
      </View>
    </ClayCard>
  );
}
