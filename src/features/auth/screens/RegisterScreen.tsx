import React, { useState } from "react";
import { Animated, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../types/navigation";
import { Button } from "../../../components/ui/Button";
import { TextField, PasswordField } from "../../../components/ui/TextField";
import { GoogleButton, Divider } from "../../../components/ui/SocialButton";
import { AuthLayout, AuthLink } from "../components";
import { useAuth } from "../context";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useGsapStagger } from "../hooks/useGsapEntrance";
import { registerSchema } from "../schemas/auth.schema";
import { getErrorMessage } from "../../../lib/api/errors";
import { useToast } from "../../../providers";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
  const { signUp, signInWithGoogle } = useAuth();
  const toast = useToast();
  const {
    signInWithGoogle: googleAuth,
    isLoading: googleLoading,
    isConfigured,
  } = useGoogleAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const animations = useGsapStagger(7);

  const handleRegister = async () => {
    const result = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = String(issue.path[0] ?? "");
        if (key) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      const firstError = result.error.issues[0]?.message;
      toast.showError(firstError ?? "Please fix the errors below");
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      await signUp(result.data);
      toast.showSuccess("Account created! Welcome to Career AI.");
    } catch (error) {
      toast.showError(getErrorMessage(error, "Please try again."));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const result = await googleAuth();
    if (!result) return;

    if (!result.success) {
      toast.showError(result.error);
      return;
    }

    try {
      await signInWithGoogle(result.idToken);
      toast.showSuccess("Signed in with Google.");
    } catch (error) {
      toast.showError(
        getErrorMessage(error, "Could not complete Google sign-in.")
      );
    }
  };

  return (
    <AuthLayout
      title="Create account"
      subtitle="Join us and start your journey today"
      footer={
        <AuthLink
          prompt="Already have an account?"
          action="Sign in"
          onPress={() => navigation.navigate("Login")}
        />
      }
    >
      <StatusBar style="light" />

      <View className="gap-4">
        <Animated.View style={animations[0]?.style}>
          <TextField
            label="Full name"
            value={name}
            onChangeText={setName}
            placeholder="John Doe"
            autoCapitalize="words"
            autoComplete="name"
            error={errors.name}
          />
        </Animated.View>

        <Animated.View style={animations[1]?.style}>
          <TextField
            label="Email"
            value={email}
            onChangeText={setEmail}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            error={errors.email}
          />
        </Animated.View>

        <Animated.View style={animations[2]?.style}>
          <PasswordField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Create a password"
            autoComplete="new-password"
            error={errors.password}
          />
        </Animated.View>

        <Animated.View style={animations[3]?.style}>
          <PasswordField
            label="Confirm password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Repeat your password"
            autoComplete="new-password"
            error={errors.confirmPassword}
          />
        </Animated.View>

        <Animated.View style={animations[4]?.style}>
          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            className="mt-2"
          />
        </Animated.View>

        <Animated.View style={animations[5]?.style}>
          <Divider />
        </Animated.View>

        <Animated.View style={animations[6]?.style}>
          <GoogleButton
            title="Sign up with Google"
            onPress={handleGoogleSignIn}
            loading={googleLoading}
            disabled={!isConfigured}
          />
        </Animated.View>
      </View>
    </AuthLayout>
  );
}
