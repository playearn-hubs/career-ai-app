import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { AuthIcon, type AuthIconName } from "./AuthIcon";
import { useAuthDense } from "./AuthLayoutContext";
import type { AuthPalette } from "./authTheme";

type AuthTextFieldProps = TextInputProps & {
  label: string;
  icon: AuthIconName;
  palette: AuthPalette;
  error?: string;
  secureToggle?: boolean;
};

export function AuthTextField({
  label,
  icon,
  palette,
  error,
  secureToggle,
  secureTextEntry,
  style,
  ...props
}: AuthTextFieldProps) {
  const [visible, setVisible] = React.useState(false);
  const isSecure = secureToggle ? !visible : secureTextEntry;
  const dense = useAuthDense();

  return (
    <View style={[styles.wrap, dense && styles.wrapDense]}>
      <Text
        style={[
          dense ? styles.labelDense : styles.label,
          { color: palette.label },
        ]}
      >
        {label}
      </Text>
      <View style={[styles.row, dense && styles.rowDense]}>
        <View
          style={[
            dense ? styles.iconBoxDense : styles.iconBox,
            {
              backgroundColor: palette.iconBoxBg,
              borderColor: palette.inputBorder,
            },
          ]}
        >
          <AuthIcon name={icon} size={dense ? 16 : 18} color={palette.iconColor} />
        </View>
        <View
          style={[
            dense ? styles.inputWrapDense : styles.inputWrap,
            {
              backgroundColor: palette.inputBg,
              borderColor: error ? "#EF4444" : palette.inputBorder,
            },
          ]}
        >
          <TextInput
            placeholderTextColor={palette.placeholder}
            secureTextEntry={isSecure}
            style={[
              dense ? styles.inputDense : styles.input,
              { color: palette.heading },
              secureToggle ? styles.inputWithToggle : null,
              style,
            ]}
            {...props}
          />
          {secureToggle ? (
            <Pressable
              onPress={() => setVisible((v) => !v)}
              hitSlop={10}
              style={styles.eyeBtn}
            >
              <AuthIcon
                name={visible ? "eye" : "eyeOff"}
                size={20}
                color={palette.placeholder}
              />
            </Pressable>
          ) : null}
        </View>
      </View>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 6,
  },
  wrapDense: {
    gap: 4,
  },
  label: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
  },
  labelDense: {
    fontFamily: "Inter_500Medium",
    fontSize: 11,
  },
  row: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: 8,
  },
  rowDense: {
    gap: 6,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBoxDense: {
    width: 36,
    height: 36,
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    minHeight: 44,
  },
  inputWrapDense: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    minHeight: 36,
  },
  input: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputDense: {
    flex: 1,
    fontFamily: "Inter_400Regular",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  inputWithToggle: {
    paddingRight: 4,
  },
  eyeBtn: {
    paddingHorizontal: 12,
    justifyContent: "center",
  },
  error: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#EF4444",
  },
});
