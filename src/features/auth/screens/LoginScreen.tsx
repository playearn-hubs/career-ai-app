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
import { loginSchema } from "../schemas/auth.schema";
import { getErrorMessage } from "../../../lib/api/errors";
import { useToast } from "../../../providers";
import { useThemedStyles } from "../../../theme";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { signIn, signInWithGoogle } = useAuth();
  const toast = useToast();
  const themed = useThemedStyles();
  const {
    signInWithGoogle: googleAuth,
    isLoading: googleLoading,
    isConfigured,
  } = useGoogleAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const animations = useGsapStagger(5);

  const handleLogin = async () => {
    const result = loginSchema.safeParse({ email, password });
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
      await signIn(result.data);
      toast.showSuccess("Welcome back! You're signed in.");
    } catch (error) {
      toast.showError(
        getErrorMessage(error, "Please check your credentials and try again.")
      );
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
      title="Welcome back"
      subtitle="Sign in to continue to your account"
      footer={
        <AuthLink
          prompt="Don't have an account?"
          action="Create one"
          onPress={() => navigation.navigate("Register")}
        />
      }
    >
      <StatusBar style="light" />

      <View className="gap-5">
        <Animated.View style={animations[0]?.style}>
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

        <Animated.View style={animations[1]?.style}>
          <PasswordField
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            autoComplete="password"
            error={errors.password}
          />
        </Animated.View>

        <Animated.View style={animations[2]?.style}>
          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            className="mt-2"
          />
        </Animated.View>

        <Animated.View style={animations[3]?.style}>
          <Divider />
        </Animated.View>

        <Animated.View style={animations[4]?.style}>
          <GoogleButton
            title="Continue with Google"
            onPress={handleGoogleSignIn}
            loading={googleLoading}
            disabled={!isConfigured}
          />
          {!isConfigured ? (
            <Animated.Text
              className="mt-3 text-center font-sans text-xs"
              style={{ color: themed.colors.contentTertiary }}
            >
              Add Google client IDs in .env, then rebuild with npx expo run:android
            </Animated.Text>
          ) : null}
        </Animated.View>
      </View>
    </AuthLayout>
  );
}
