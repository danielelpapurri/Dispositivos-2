import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack //pantallas de la aplicacion 
      screenOptions={{
        headerStyle: {
          backgroundColor: "#C96A8B",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#FFF7FA",
        },
      }}
    >
      <Stack.Screen //registra la pantalla de inicio en el navegador de la aplicacion 
        name="index"
        options={{ title: "Inicio" }}
      />

      <Stack.Screen
        name="formulario"
        options={{ title: "Formulario" }}
      />

      <Stack.Screen
        name="resultado"
        options={{ title: "Datos registrados" }}
      />

      <Stack.Screen
        name="imagenes"
        options={{ title: "Galería" }}
      />

      <Stack.Screen
        name="contacto"
        options={{ title: "Contacto" }}
      />
    </Stack>
  );
}
