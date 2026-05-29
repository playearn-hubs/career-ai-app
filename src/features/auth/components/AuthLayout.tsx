import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeToggle } from "../../../components/ui";
import { useTheme } from "../../../theme";
import { appLogo } from "../../../config/branding";

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
  const { colors } = useTheme();

  return (
    <View className="flex-1 bg-surface-secondary">
      <LinearGradient
        colors={[...colors.gradient]}
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
        <View className="mb-4 flex-row items-center justify-end">
          <ThemeToggle variant="onPrimary" className="border-white/30 bg-white/15" />
        </View>
        <View className="mb-2 h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white/20">
          <Image source={appLogo} className="h-10 w-10" resizeMode="contain" />
        </View>
        <Text className="font-sans-bold text-3xl text-white">{title}</Text>
        <Text className="mt-2 font-sans text-base text-white/80">
          {subtitle}
        </Text>
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
      <Text className="font-sans text-base text-content-secondary">
        {prompt}
      </Text>
      <Text className="font-sans-semibold text-base text-primary">{action}</Text>
    </Pressable>
  );
}
