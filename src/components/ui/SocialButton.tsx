import React from "react";
import { Pressable, Text, View, ActivityIndicator } from "react-native";
import { useTheme, useThemedStyles } from "../../theme";

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
  const themed = useThemedStyles();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center gap-3 rounded-pill border px-6 py-4 active:opacity-80 ${disabled ? "opacity-50" : ""}`}
      style={[themed.card, { borderWidth: 1 }]}
    >
      {loading ? (
        <ActivityIndicator color={colors.googleBlue} />
      ) : (
        <>
          <View
            className="h-6 w-6 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.surface }}
          >
            <Text
              className="text-lg font-bold"
              style={{ color: colors.googleBlue }}
            >
              G
            </Text>
          </View>
          <Text className="font-sans-semibold text-base" style={themed.text}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
}

type DividerProps = {
  label?: string;
};

export function Divider({ label = "or continue with" }: DividerProps) {
  const themed = useThemedStyles();

  return (
    <View className="flex-row items-center gap-4">
      <View className="h-px flex-1" style={{ backgroundColor: themed.colors.border }} />
      <Text className="font-sans text-sm" style={themed.textTertiary}>
        {label}
      </Text>
      <View className="h-px flex-1" style={{ backgroundColor: themed.colors.border }} />
    </View>
  );
}
