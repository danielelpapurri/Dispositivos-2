import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Resultado() {
	const router = useRouter();
	const { nombre, correo, telefono, ciudad } = useLocalSearchParams<{
		nombre: string;
		correo: string;
		telefono: string;
		ciudad: string;
	}>();

	return (
		<View style={styles.container}>
			<View style={styles.icono}><Text style={styles.check}>✓</Text></View>
			<Text style={styles.eyebrow}>SOLICITUD RECIBIDA</Text>
			<Text style={styles.titulo}>Gracias, {nombre || "piloto"}.</Text>
			<Text style={styles.texto}>
				Un asesor de Aeronova Garage se pondrá en contacto contigo para hablar sobre {ciudad || "tu aeronave ideal"}.
			</Text>
			<View style={styles.resumen}>
				<Text style={styles.label}>Datos de contacto</Text>
				<Text style={styles.dato}>{correo}</Text>
				<Text style={styles.dato}>{telefono}</Text>
			</View>
			<Pressable style={styles.boton} onPress={() => router.replace("/")}>
				<Text style={styles.botonTexto}>Volver al hangar</Text>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#F4F7F8", padding: 24, justifyContent: "center" },
	icono: { width: 66, height: 66, borderRadius: 33, backgroundColor: "#D7B56D", alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: 22 },
	check: { color: "#092536", fontSize: 34, fontWeight: "bold" },
	eyebrow: { color: "#B17C2F", fontSize: 11, fontWeight: "bold", letterSpacing: 1.5, textAlign: "center", marginBottom: 10 },
	titulo: { color: "#092536", fontSize: 30, fontWeight: "bold", textAlign: "center", marginBottom: 12 },
	texto: { color: "#607580", fontSize: 15, lineHeight: 23, textAlign: "center", marginBottom: 22 },
	resumen: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 18, borderWidth: 1, borderColor: "#D8E1E4", marginBottom: 18 },
	label: { color: "#092536", fontWeight: "bold", marginBottom: 8 },
	dato: { color: "#607580", fontSize: 14, marginTop: 3 },
	boton: { backgroundColor: "#092536", paddingVertical: 15, borderRadius: 13, alignItems: "center" },
	botonTexto: { color: "#FFFFFF", fontWeight: "bold" },
});
