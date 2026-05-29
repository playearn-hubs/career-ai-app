import React from "react";
import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 bg-surface-secondary">
      <LinearGradient
        colors={["#4F46E5", "#6366F1", "#818CF8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop: insets.top + 24,
          paddingBottom: 40,
          paddingHorizontal: 24,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
        }}
      >
        <View className="mb-2 h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
          <Text className="text-2xl">✦</Text>
        </View>
        <Text className="text-3xl font-bold text-white">{title}</Text>
        <Text className="mt-2 text-base text-indigo-100">{subtitle}</Text>
      </LinearGradient>

      <View className="flex-1 px-6 pt-8">{children}</View>

      {footer ? (
        <View
          className="items-center px-6 pb-6"
          style={{ paddingBottom: insets.bottom + 16 }}
        >
          {footer}
        </View>
      ) : null}
    </View>
  );
}

type AuthLinkProps = {
  prompt: string;
  action: string;
  onPress: () => void;
};

export function AuthLink({ prompt, action, onPress }: AuthLinkProps) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center gap-1">
      <Text className="text-base text-content-secondary">{prompt}</Text>
      <Text className="text-base font-semibold text-primary-600">{action}</Text>
    </Pressable>
  );
}
