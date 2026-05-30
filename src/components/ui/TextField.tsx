import React from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  Pressable,
} from "react-native";
import { useTheme, useThemedStyles } from "../../theme";

type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
  rightElement?: React.ReactNode;
};

export function TextField({
  label,
  error,
  rightElement,
  className = "",
  style,
  ...props
}: TextFieldProps) {
  const { colors } = useTheme();
  const themed = useThemedStyles();

  return (
    <View className="gap-2">
      <Text className="font-sans-medium text-sm" style={themed.textSecondary}>
        {label}
      </Text>
      <View className="relative">
        <TextInput
          placeholderTextColor={colors.contentTertiary}
          className={`rounded-2xl border px-4 py-4 font-sans text-base ${className}`}
          style={[
            themed.input,
            error ? { borderColor: colors.error } : null,
            style,
          ]}
          {...props}
        />
        {rightElement ? (
          <View className="absolute right-4 top-0 h-full justify-center">
            {rightElement}
          </View>
        ) : null}
      </View>
      {error ? (
        <Text className="text-sm" style={{ color: colors.error }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

type PasswordFieldProps = Omit<TextFieldProps, "secureTextEntry" | "rightElement">;

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = React.useState(false);
  const themed = useThemedStyles();

  return (
    <TextField
      {...props}
      secureTextEntry={!visible}
      rightElement={
        <Pressable onPress={() => setVisible((v) => !v)} hitSlop={8}>
          <Text className="font-sans-semibold text-sm" style={themed.textPrimary}>
            {visible ? "Hide" : "Show"}
          </Text>
        </Pressable>
      }
    />
  );
}
