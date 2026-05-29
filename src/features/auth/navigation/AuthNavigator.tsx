import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../../types/navigation";
import { LoginScreen, RegisterScreen } from "../screens";
import { GoogleAuthProvider } from "../hooks/useGoogleAuth";
import { useTheme } from "../../../theme";

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  const { colors } = useTheme();

  return (
    <GoogleAuthProvider>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.surfaceSecondary },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </GoogleAuthProvider>
  );
}
