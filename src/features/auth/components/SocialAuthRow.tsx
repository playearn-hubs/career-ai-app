import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { AuthIcon } from "./AuthIcon";
import type { AuthPalette } from "./authTheme";

type SocialAuthRowProps = {
  palette: AuthPalette;
  onGooglePress?: () => void;
  onApplePress?: () => void;
  onFacebookPress?: () => void;
  googleLoading?: boolean;
  googleDisabled?: boolean;
};

function SocialButton({
  label,
  icon,
  iconColor,
  palette,
  onPress,
  loading,
  disabled,
}: {
  label: string;
  icon: React.ReactNode;
  iconColor?: string;
  palette: AuthPalette;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.btn,
        {
          backgroundColor: palette.socialBg,
          borderColor: palette.socialBorder,
        },
        (disabled || loading) && styles.btnDisabled,
        pressed && !disabled && styles.btnPressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={iconColor ?? palette.primary} />
      ) : (
        <>
          {icon}
          <Text style={[styles.label, { color: palette.socialText }]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

export function SocialAuthRow({
  palette,
  onGooglePress,
  onApplePress,
  onFacebookPress,
  googleLoading,
  googleDisabled,
}: SocialAuthRowProps) {
  return (
    <View style={styles.row}>
      <SocialButton
        label="Google"
        palette={palette}
        onPress={onGooglePress}
        loading={googleLoading}
        disabled={googleDisabled}
        icon={<Text style={[styles.googleG, { color: "#4285F4" }]}>G</Text>}
      />
      <SocialButton
        label="Apple"
        palette={palette}
        onPress={onApplePress}
        icon={<AuthIcon name="apple" size={22} color={palette.heading} />}
      />
      <SocialButton
        label="Facebook"
        palette={palette}
        onPress={onFacebookPress}
        icon={<AuthIcon name="facebook" size={20} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
  },
  btn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  btnPressed: {
    opacity: 0.88,
  },
  btnDisabled: {
    opacity: 0.5,
  },
  label: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  googleG: {
    fontFamily: "Inter_700Bold",
    fontSize: 20,
  },
});
