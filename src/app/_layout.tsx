import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack //pantallas de la aplicacion 
      screenOptions={{
        headerStyle: {
          backgroundColor: "#092536",
        },
        headerTintColor: "#ffffff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#F4F7F8",
        },
      }}
    >
      <Stack.Screen //registra la pantalla de inicio en el navegador de la aplicacion 
        name="index"
        options={{ title: "Aeronova Garage" }}
      />

      <Stack.Screen
        name="formulario"
        options={{ title: "Agenda tu visita" }}
      />

      <Stack.Screen
        name="resultado"
        options={{ title: "Solicitud recibida" }}
      />

      <Stack.Screen
        name="imagenes"
        options={{ title: "Aeronaves" }}
      />

      <Stack.Screen
        name="contacto"
        options={{ title: "Contacto" }}
      />
    </Stack>
  );
}
