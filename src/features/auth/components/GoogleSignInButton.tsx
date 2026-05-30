import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useAuthDense } from "./AuthLayoutContext";
import type { AuthPalette } from "./authTheme";

type GoogleSignInButtonProps = {
  palette: AuthPalette;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  label?: string;
};

export function GoogleSignInButton({
  palette,
  onPress,
  loading = false,
  disabled = false,
  label = "Continue with Google",
}: GoogleSignInButtonProps) {
  const dense = useAuthDense();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        dense ? styles.btnDense : styles.btn,
        {
          backgroundColor: palette.socialBg,
          borderColor: palette.socialBorder,
        },
        (disabled || loading) && styles.disabled,
        pressed && !disabled && !loading && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#4285F4" />
      ) : (
        <View style={styles.content}>
          <View style={styles.iconWrap}>
            <Text style={styles.googleG}>G</Text>
          </View>
          <Text
            style={[
              dense ? styles.labelDense : styles.label,
              { color: palette.socialText },
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  btnDense: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 11,
    borderWidth: 1,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  googleG: {
    fontFamily: "Inter_700Bold",
    fontSize: 16,
    color: "#4285F4",
  },
  label: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  labelDense: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.9,
  },
});
