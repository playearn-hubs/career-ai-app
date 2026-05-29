import React from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";
import { useTheme } from "../../theme";

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
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        flex-row items-center justify-center gap-3 rounded-pill border
        border-border bg-card px-6 py-4 active:bg-surface-tertiary
        ${disabled ? "opacity-50" : ""}
      `}
    >
      {loading ? (
        <ActivityIndicator color={colors.googleBlue} />
      ) : (
        <>
          <View className="h-6 w-6 items-center justify-center rounded-full bg-surface">
          <Text className="font-sans-bold text-lg" style={{ color: colors.googleBlue }}>
              G
            </Text>
          </View>
          <Text className="font-sans-semibold text-base text-content">{title}</Text>
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
      <View className="h-px flex-1 bg-border" />
      <Text className="font-sans text-sm text-content-tertiary">{label}</Text>
      <View className="h-px flex-1 bg-border" />
    </View>
  );
}
