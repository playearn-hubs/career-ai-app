import React from "react";
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  Pressable,
} from "react-native";

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
  ...props
}: TextFieldProps) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-medium text-content-secondary">
        {label}
      </Text>
      <View className="relative">
        <TextInput
          placeholderTextColor="#94A3B8"
          className={`
            rounded-2xl border bg-white px-4 py-4 text-base text-content
            ${error ? "border-red-400" : "border-slate-200"}
            ${rightElement ? "pr-12" : ""}
            ${className}
          `}
          {...props}
        />
        {rightElement ? (
          <View className="absolute right-4 top-0 h-full justify-center">
            {rightElement}
          </View>
        ) : null}
      </View>
      {error ? (
        <Text className="text-sm text-red-500">{error}</Text>
      ) : null}
    </View>
  );
}

type PasswordFieldProps = Omit<TextFieldProps, "secureTextEntry" | "rightElement">;

export function PasswordField(props: PasswordFieldProps) {
  const [visible, setVisible] = React.useState(false);

  return (
    <TextField
      {...props}
      secureTextEntry={!visible}
      rightElement={
        <Pressable onPress={() => setVisible((v) => !v)} hitSlop={8}>
          <Text className="text-sm font-semibold text-primary-600">
            {visible ? "Hide" : "Show"}
          </Text>
        </Pressable>
      }
    />
  );
}
