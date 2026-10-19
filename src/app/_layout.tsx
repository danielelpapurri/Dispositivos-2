import { Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { AuthProvider, useAuth } from "../context/AuthContext";

function RootNavigator() {
  const { session, cargando } = useAuth();

  if (cargando) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#C87591" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(app)" />
        <Stack.Screen
          name="explore"
          options={{ title: "Centro de vuelo", headerShown: true }}
        />
        <Stack.Screen name="menu" options={{ title: "Menu", headerShown: true }} />
        <Stack.Screen
          name="productos"
          options={{ title: "Productos", headerShown: true }}
        />
        <Stack.Screen
          name="vuelos-prueba"
          options={{ title: "Vuelos de prueba", headerShown: true }}
        />
      </Stack.Protected>
    </Stack>
  );
}

export default function Layout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
