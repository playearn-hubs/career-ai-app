import React from "react";
import { StyleSheet, Text, View } from "react-native";
import type { AuthPalette } from "./authTheme";

type AuthDividerProps = {
  palette: AuthPalette;
  label?: string;
};

export function AuthDivider({
  palette,
  label = "or continue with",
}: AuthDividerProps) {
  return (
    <View style={styles.row}>
      <View style={[styles.line, { backgroundColor: palette.divider }]} />
      <Text style={[styles.label, { color: palette.dividerText }]}>{label}</Text>
      <View style={[styles.line, { backgroundColor: palette.divider }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
  },
  label: {
    fontFamily: "Inter_400Regular",
    fontSize: 13,
  },
});
