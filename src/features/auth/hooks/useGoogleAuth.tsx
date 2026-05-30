import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Platform } from "react-native";
import Constants from "expo-constants";
import { authConfig, isGoogleAuthConfigured } from "../../../config/auth.config";

export type GoogleAuthResult =
  | { success: true; idToken: string }
  | { success: false; error: string };

type GoogleAuthContextValue = {
  signInWithGoogle: () => Promise<GoogleAuthResult | null>;
  isLoading: boolean;
  isConfigured: boolean;
};

type GoogleSignInModule = typeof import("@react-native-google-signin/google-signin");

const isExpoGo = Constants.appOwnership === "expo";

const stubValue: GoogleAuthContextValue = {
  signInWithGoogle: async () => ({
    success: false,
    error: isExpoGo
      ? "Google Sign-In requires a development build. Run: npx expo run:android"
      : "Google OAuth is not configured. Add client IDs to .env",
  }),
  isLoading: false,
  isConfigured: false,
};

const GoogleAuthContext = createContext<GoogleAuthContextValue>(stubValue);

async function loadGoogleSignInModule(): Promise<GoogleSignInModule | null> {
  if (Platform.OS === "web" || isExpoGo) {
    return null;
  }

  return import("@react-native-google-signin/google-signin");
}

async function configureNativeGoogleSignIn(): Promise<void> {
  const googleSignIn = await loadGoogleSignInModule();
  if (!googleSignIn) return;

  googleSignIn.GoogleSignin.configure({
    webClientId: authConfig.google.webClientId,
    offlineAccess: false,
  });
}

async function signInWithGoogleNative(): Promise<GoogleAuthResult | null> {
  if (isExpoGo) {
    return {
      success: false,
      error:
        "Google Sign-In requires a development build. Run: npx expo run:android",
    };
  }

  const googleSignIn = await loadGoogleSignInModule();
  if (!googleSignIn) {
    return {
      success: false,
      error: "Google Sign-In is not available on this platform.",
    };
  }

  const { GoogleSignin, isErrorWithCode, statusCodes } = googleSignIn;

  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

    const result = await GoogleSignin.signIn();

    if (result.type !== "success") {
      return null;
    }

    const tokens = await GoogleSignin.getTokens();

    if (!tokens.idToken) {
      return {
        success: false,
        error:
          "Could not obtain Google ID token. Ensure EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID is set.",
      };
    }

    return {
      success: true,
      idToken: tokens.idToken,
    };
  } catch (error) {
    if (isErrorWithCode(error)) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return null;
      }
      if (error.code === statusCodes.IN_PROGRESS) {
        return { success: false, error: "Sign-in already in progress." };
      }
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return {
          success: false,
          error: "Google Play Services is not available on this device.",
        };
      }
    }

    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Google sign-in failed unexpectedly.",
    };
  }
}

function GoogleAuthProviderInner({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    void configureNativeGoogleSignIn();
  }, []);

  const value = useMemo<GoogleAuthContextValue>(
    () => ({
      isConfigured: true,
      isLoading,
      signInWithGoogle: async () => {
        setIsLoading(true);
        try {
          return await signInWithGoogleNative();
        } finally {
          setIsLoading(false);
        }
      },
    }),
    [isLoading]
  );

  return (
    <GoogleAuthContext.Provider value={value}>
      {children}
    </GoogleAuthContext.Provider>
  );
}

export function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  if (!isGoogleAuthConfigured() || Platform.OS === "web" || isExpoGo) {
    return (
      <GoogleAuthContext.Provider value={stubValue}>
        {children}
      </GoogleAuthContext.Provider>
    );
  }

  return <GoogleAuthProviderInner>{children}</GoogleAuthProviderInner>;
}

export function useGoogleAuth(): GoogleAuthContextValue {
  return useContext(GoogleAuthContext);
}
