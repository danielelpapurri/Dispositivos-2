import { Stack } from "expo-router";

export default function AppLayout() {
	return (
		<Stack
			screenOptions={{
				headerStyle: { backgroundColor: "#092536" },
				headerTintColor: "#ffffff",
				headerTitleStyle: { fontWeight: "bold" },
				contentStyle: { backgroundColor: "#F4F7F8" },
			}}
		>
			<Stack.Screen name="index" options={{ title: "Aeronova Garage" }} />
			<Stack.Screen name="catalogo" options={{ title: "Catálogo" }} />
			<Stack.Screen name="detalle" options={{ title: "Detalle del producto" }} />
			<Stack.Screen name="formulario" options={{ title: "Solicitar información" }} />
			<Stack.Screen name="resultado" options={{ title: "Solicitud recibida" }} />
			<Stack.Screen name="registros" options={{ title: "Solicitudes recibidas" }} />
			<Stack.Screen name="imagenes" options={{ title: "Aeronaves" }} />
			<Stack.Screen name="escanear" options={{ title: "Escanear aeronave" }} />
			<Stack.Screen name="contacto" options={{ title: "Contacto" }} />
			<Stack.Screen name="explore" options={{ title: "Centro de vuelo" }} />
			<Stack.Screen name="menu" options={{ title: "Menú" }} />
			<Stack.Screen name="productos" options={{ title: "Productos" }} />
			<Stack.Screen name="vuelos-prueba" options={{ title: "Vuelos de prueba" }} />
		</Stack>
	);
}
