import React from "react";
import { StyleSheet, Text, View } from "react-native";

export type AuthIconName =
  | "mail"
  | "lock"
  | "person"
  | "eye"
  | "eyeOff"
  | "arrow"
  | "shield"
  | "leaf"
  | "apple"
  | "facebook";

const GLYPHS: Record<AuthIconName, string> = {
  mail: "✉",
  lock: "🔒",
  person: "👤",
  eye: "👁",
  eyeOff: "👁‍🗨",
  arrow: "→",
  shield: "✓",
  leaf: "🍃",
  apple: "",
  facebook: "f",
};

type AuthIconProps = {
  name: AuthIconName;
  size?: number;
  color?: string;
};

export function AuthIcon({ name, size = 20, color = "#2563EB" }: AuthIconProps) {
  if (name === "apple") {
    return (
      <Text style={[styles.glyph, { fontSize: size * 1.1, color }]}></Text>
    );
  }

  if (name === "facebook") {
    return (
      <View
        style={[
          styles.facebook,
          {
            width: size + 4,
            height: size + 4,
            borderRadius: (size + 4) / 2,
          },
        ]}
      >
        <Text style={[styles.facebookText, { fontSize: size * 0.85 }]}>f</Text>
      </View>
    );
  }

  if (name === "shield") {
    return (
      <View style={styles.shieldWrap}>
        <Text style={[styles.shieldIcon, { fontSize: size, color }]}>🛡</Text>
        <Text style={[styles.shieldCheck, { fontSize: size * 0.45, color }]}>✓</Text>
      </View>
    );
  }

  return (
    <Text style={[styles.glyph, { fontSize: size, color, lineHeight: size + 4 }]}>
      {GLYPHS[name]}
    </Text>
  );
}

const styles = StyleSheet.create({
  glyph: {
    textAlign: "center",
  },
  shieldWrap: {
    position: "relative",
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  shieldIcon: {
    lineHeight: 22,
  },
  shieldCheck: {
    position: "absolute",
    bottom: 1,
    right: 0,
    fontFamily: "Inter_700Bold",
  },
  facebook: {
    backgroundColor: "#1877F2",
    alignItems: "center",
    justifyContent: "center",
  },
  facebookText: {
    color: "#FFFFFF",
    fontFamily: "Inter_700Bold",
  },
});
