import { Stack } from "expo-router";

export default function PrivateLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#102C35" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "700" },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: "#F3F6F4" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Aeronova Garage" }} />
      <Stack.Screen name="formulario" options={{ title: "Nueva solicitud" }} />
      <Stack.Screen name="resultado" options={{ title: "Solicitud recibida" }} />
      <Stack.Screen name="registros" options={{ title: "Solicitudes" }} />
      <Stack.Screen name="imagenes" options={{ title: "Aeronaves" }} />
      <Stack.Screen name="contacto" options={{ title: "Contacto" }} />
      <Stack.Screen name="vuelos-prueba" options={{ title: "Vuelos de prueba" }} />
      <Stack.Screen name="explore" options={{ title: "Servicios" }} />
      <Stack.Screen name="menu" options={{ title: "Menú" }} />
      <Stack.Screen name="productos" options={{ title: "Productos" }} />
    </Stack>
  );
}
