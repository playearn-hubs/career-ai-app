import React from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";

type SocialButtonProps = {
  title: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
};

export function GoogleButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}: SocialButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        flex-row items-center justify-center gap-3 rounded-2xl border
        border-slate-200 bg-white px-6 py-4 active:bg-slate-50
        ${disabled ? "opacity-50" : ""}
      `}
    >
      {loading ? (
        <ActivityIndicator color="#4285F4" />
      ) : (
        <>
          <View className="h-6 w-6 items-center justify-center rounded-full bg-white">
            <Text className="text-lg font-bold text-[#4285F4]">G</Text>
          </View>
          <Text className="text-base font-semibold text-content">{title}</Text>
        </>
      )}
    </Pressable>
  );
}

type DividerProps = {
  label?: string;
};

export function Divider({ label = "or continue with" }: DividerProps) {
  return (
    <View className="flex-row items-center gap-4">
      <View className="h-px flex-1 bg-slate-200" />
      <Text className="text-sm text-content-tertiary">{label}</Text>
      <View className="h-px flex-1 bg-slate-200" />
    </View>
  );
}
