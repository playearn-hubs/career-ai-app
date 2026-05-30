import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../theme";

export type ToastVariant = "success" | "error" | "info";

type ToastProps = {
  message: string;
  variant: ToastVariant;
  visible: boolean;
  onDismiss: () => void;
};

const VARIANT_CONFIG = {
  success: {
    icon: "✓",
    accentKey: "primary" as const,
    bgLight: "rgba(0, 180, 216, 0.12)",
    bgDark: "rgba(0, 180, 216, 0.2)",
  },
  error: {
    icon: "✕",
    accentKey: "error" as const,
    bgLight: "rgba(239, 68, 68, 0.1)",
    bgDark: "rgba(248, 113, 113, 0.15)",
  },
  info: {
    icon: "i",
    accentKey: "primary" as const,
    bgLight: "rgba(0, 180, 216, 0.08)",
    bgDark: "rgba(0, 180, 216, 0.15)",
  },
};

export function Toast({ message, variant, visible, onDismiss }: ToastProps) {
  const insets = useSafeAreaInsets();
  const { mode, colors } = useTheme();
  const translateY = useRef(new Animated.Value(-120)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const config = VARIANT_CONFIG[variant];
  const accentColor =
    config.accentKey === "error" ? colors.error : colors.primary;
  const backgroundColor =
    mode === "dark" ? config.bgDark : config.bgLight;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          damping: 18,
          stiffness: 180,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -120,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, opacity]);

  return (
    <Animated.View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        top: insets.top + 8,
        left: 16,
        right: 16,
        zIndex: 9999,
        opacity,
        transform: [{ translateY }],
      }}
    >
      <Pressable onPress={onDismiss}>
        <View
          className="flex-row items-center gap-3 rounded-2xl px-4 py-3.5"
          style={{
            backgroundColor: colors.card,
            borderWidth: 1,
            borderColor: colors.border,
            borderLeftWidth: 4,
            borderLeftColor: accentColor,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: mode === "dark" ? 0.35 : 0.12,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <View
            className="h-8 w-8 items-center justify-center rounded-full"
            style={{ backgroundColor }}
          >
            <Text
              className="font-sans-bold text-sm"
              style={{ color: accentColor }}
            >
              {config.icon}
            </Text>
          </View>
          <Text
            className="font-sans-medium flex-1 text-sm leading-5"
            style={{ color: colors.content }}
          >
            {message}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
