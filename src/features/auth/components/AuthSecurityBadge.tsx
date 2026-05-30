import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthIcon } from "./AuthIcon";
import type { AuthPalette } from "./authTheme";

type AuthSecurityBadgeProps = {
  palette: AuthPalette;
  compact?: boolean;
};

export function AuthSecurityBadge({ palette, compact }: AuthSecurityBadgeProps) {
  return (
    <View style={styles.row}>
      <AuthIcon name="shield" size={compact ? 14 : 16} color={palette.iconColor} />
      <Text
        style={[
          compact ? styles.textCompact : styles.text,
          { color: palette.securityText },
        ]}
      >
        Secure & Private
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  text: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
  },
  textCompact: {
    fontFamily: "Inter_500Medium",
    fontSize: 10,
  },
});
