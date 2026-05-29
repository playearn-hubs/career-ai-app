import React from "react";
import { View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { ScreenContainer } from "../components/layout";
import { Heading, Subheading, Body, Caption, Button, Card } from "../components/ui";
import { useAuth } from "../features/auth";
import { useGsapEntrance } from "../features/auth/hooks/useGsapEntrance";
import { getGreeting, formatDate } from "../utils";

export function HomeScreen() {
  const { session, signOut } = useAuth();
  const greeting = getGreeting();
  const currentDate = formatDate();
  const headerAnimation = useGsapEntrance({ delay: 0.1 });
  const cardAnimation = useGsapEntrance({ delay: 0.25, y: 24 });

  return (
    <ScreenContainer>
      <StatusBar style="dark" />

      <View className="flex-1 px-6 pt-8">
        <View style={headerAnimation.style} className="mb-8">
          <Caption className="mb-1">{currentDate}</Caption>
          <Heading>
            {greeting}, {session?.user.name ?? "there"} 👋
          </Heading>
          <Subheading className="mt-2">
            Signed in via {session?.user.provider ?? "email"}
          </Subheading>
          {session?.user.avatarUrl ? (
            <Image
              source={{ uri: session.user.avatarUrl }}
              className="mt-4 h-16 w-16 rounded-full"
            />
          ) : null}
        </View>

        <View style={cardAnimation.style} className="gap-4">
          <Card>
            <View className="gap-2">
              <Body className="font-semibold">Account</Body>
              <Caption>{session?.user.email}</Caption>
            </View>
          </Card>

          <Card>
            <View className="flex-row items-center gap-4">
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
                <Body className="text-2xl">🔐</Body>
              </View>
              <View className="flex-1">
                <Body className="font-semibold">Auth ready</Body>
                <Caption>Login, register, and Google OAuth flow configured</Caption>
              </View>
            </View>
          </Card>
        </View>

        <View className="mt-auto mb-8">
          <Button title="Sign Out" variant="outline" onPress={signOut} />
        </View>
      </View>
    </ScreenContainer>
  );
}
