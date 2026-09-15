import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Contacto() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.eyebrow}>AERONOVA GARAGE</Text>
			<Text style={styles.titulo}>Ven a conocer tu próximo avión.</Text>
			<Text style={styles.subtitulo}>
				Nuestro equipo combina criterio aeronáutico, experiencia y una atención cercana para ayudarte a comprar con confianza.
			</Text>

			<View style={styles.destacado}>
				<Text style={styles.destacadoIcono}>⌖</Text>
				<View>
					<Text style={styles.destacadoTitulo}>Hangar principal</Text>
					<Text style={styles.destacadoTexto}>Aeropuerto El Dorado · Bogotá</Text>
				</View>
			</View>

			<View style={styles.lista}>
				<View style={styles.item}>
					<Text style={styles.itemTitulo}>Horario de visitas</Text>
					<Text style={styles.itemTexto}>Lunes a sábado · 8:00 a.m. - 6:00 p.m.</Text>
				</View>
				<View style={styles.item}>
					<Text style={styles.itemTitulo}>Habla con un asesor</Text>
					<Text style={styles.itemTexto}>+57 310 555 0182 · hola@aeronovagarage.com</Text>
				</View>
			</View>

			<Pressable style={styles.boton}>
				<Text style={styles.botonTexto}>Solicitar ubicación del hangar</Text>
			</Pressable>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flexGrow: 1, backgroundColor: "#F4F7F8", padding: 20 },
	eyebrow: { color: "#B17C2F", fontSize: 11, fontWeight: "bold", letterSpacing: 1.5, marginBottom: 10 },
	titulo: { color: "#092536", fontSize: 30, fontWeight: "bold", lineHeight: 37, marginBottom: 12 },
	subtitulo: { color: "#607580", fontSize: 15, lineHeight: 23, marginBottom: 24 },
	destacado: { backgroundColor: "#092536", borderRadius: 18, padding: 20, flexDirection: "row", alignItems: "center", marginBottom: 16 },
	destacadoIcono: { color: "#D7B56D", fontSize: 34, marginRight: 16 },
	destacadoTitulo: { color: "#FFFFFF", fontSize: 17, fontWeight: "bold", marginBottom: 4 },
	destacadoTexto: { color: "#C5D3D7", fontSize: 13 },
	lista: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 18, borderWidth: 1, borderColor: "#D8E1E4" },
	item: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#E5EDF0" },
	itemTitulo: { color: "#092536", fontSize: 15, fontWeight: "bold", marginBottom: 5 },
	itemTexto: { color: "#607580", fontSize: 13, lineHeight: 20 },
	boton: { backgroundColor: "#B17C2F", paddingVertical: 15, borderRadius: 13, alignItems: "center", marginTop: 22 },
	botonTexto: { color: "#FFFFFF", fontWeight: "bold" },
});
