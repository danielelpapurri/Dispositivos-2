import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#EDF4F1" } }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="registro" />
    </Stack>
  );
}
