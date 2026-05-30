import React, { useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../types/navigation";
import {
  AuthLayout,
  AuthLink,
  AuthTextField,
  AuthGradientButton,
  AuthDivider,
  GoogleSignInButton,
  AuthSecurityBadge,
} from "../components";
import { useAuth } from "../context";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { useGsapStagger } from "../hooks/useGsapEntrance";
import { registerSchema } from "../schemas/auth.schema";
import { getErrorMessage } from "../../../lib/api/errors";
import { useToast } from "../../../providers";
import { useTheme } from "../../../theme";
import { getAuthPalette } from "../components/authTheme";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

export function RegisterScreen({ navigation }: Props) {
  const { signUp, signInWithGoogle } = useAuth();
  const toast = useToast();
  const { mode } = useTheme();
  const palette = getAuthPalette(mode);
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
      toast.showError(
        result.error.issues[0]?.message ?? "Please fix the errors below"
      );
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
      greeting="Create Account! 👋"
      subtitle="Join us and start your journey today"
      cardTitle="Create your account"
      activeDotIndex={2}
      footer={
        <AuthLink
          prompt="Already have an account?"
          action="Sign in"
          onPress={() => navigation.navigate("Login")}
        />
      }
    >
      <Animated.View style={animations[0]?.style}>
        <AuthTextField
          label="Full Name"
          icon="person"
          palette={palette}
          value={name}
          onChangeText={setName}
          placeholder="John Doe"
          autoCapitalize="words"
          autoComplete="name"
          error={errors.name}
        />
      </Animated.View>

      <Animated.View style={animations[1]?.style}>
        <AuthTextField
          label="Email Address"
          icon="mail"
          palette={palette}
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
        <AuthTextField
          label="Password"
          icon="lock"
          palette={palette}
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          autoComplete="new-password"
          secureToggle
          error={errors.password}
        />
      </Animated.View>

      <Animated.View style={animations[3]?.style}>
        <AuthTextField
          label="Confirm Password"
          icon="lock"
          palette={palette}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Repeat your password"
          autoComplete="new-password"
          secureToggle
          error={errors.confirmPassword}
        />
      </Animated.View>

      <Animated.View style={animations[4]?.style}>
        <AuthGradientButton
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
          palette={palette}
        />
      </Animated.View>

      <Animated.View style={animations[5]?.style}>
        <AuthDivider palette={palette} label="or continue with" />
        <View style={styles.googleWrap}>
          <GoogleSignInButton
            palette={palette}
            onPress={handleGoogleSignIn}
            loading={googleLoading}
            disabled={!isConfigured}
            label="Sign up with Google"
          />
        </View>
        {!isConfigured ? (
          <Text style={[styles.hint, { color: palette.dividerText }]}>
            Google sign-in requires client IDs in .env and a dev build (npx expo
            run:android).
          </Text>
        ) : null}
      </Animated.View>

      <Animated.View style={animations[6]?.style}>
        <AuthSecurityBadge palette={palette} />
      </Animated.View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  googleWrap: {
    marginTop: 4,
  },
  hint: {
    marginTop: 10,
    textAlign: "center",
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    lineHeight: 16,
  },
});
