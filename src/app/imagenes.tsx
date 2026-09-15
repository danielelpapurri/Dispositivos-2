import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const aeronaves = [
	{
		nombre: "Cessna 172 Skyhawk",
		tipo: "Avioneta · Monomotor",
		detalle: "2021 · 410 h · USD 385.000",
		imagen: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=900&q=85",
	},
	{
		nombre: "Piper M350",
		tipo: "Avión ejecutivo · Turbohélice",
		detalle: "2020 · 620 h · USD 1.250.000",
		imagen: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
	},
	{
		nombre: "Cirrus SR22 G6",
		tipo: "Avioneta · Alto rendimiento",
		detalle: "2022 · 185 h · USD 795.000",
		imagen: "https://images.unsplash.com/photo-1559628233-3c4b7b4b7b8b?auto=format&fit=crop&w=900&q=85",
	},
];

export default function Imagenes() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.eyebrow}>INVENTARIO SELECCIONADO</Text>
			<Text style={styles.titulo}>Aeronaves disponibles</Text>
			<Text style={styles.subtitulo}>
				Máquinas con historial transparente, inspección vigente y acompañamiento de principio a fin.
			</Text>

			{aeronaves.map((aeronave) => (
				<View style={styles.card} key={aeronave.nombre}>
					<Image source={{ uri: aeronave.imagen }} style={styles.imagen} contentFit="cover" />
					<View style={styles.info}>
						<Text style={styles.tipo}>{aeronave.tipo}</Text>
						<Text style={styles.nombre}>{aeronave.nombre}</Text>
						<Text style={styles.detalle}>{aeronave.detalle}</Text>
					</View>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flexGrow: 1, backgroundColor: "#F4F7F8", padding: 20 },
	eyebrow: { color: "#B17C2F", fontSize: 11, fontWeight: "bold", letterSpacing: 1.5, marginBottom: 8 },
	titulo: { color: "#092536", fontSize: 30, fontWeight: "bold", marginBottom: 8 },
	subtitulo: { color: "#607580", fontSize: 14, lineHeight: 21, marginBottom: 22 },
	card: { backgroundColor: "#FFFFFF", borderRadius: 18, overflow: "hidden", marginBottom: 18, borderWidth: 1, borderColor: "#D8E1E4", elevation: 3 },
	imagen: { width: "100%", height: 190 },
	info: { padding: 16 },
	tipo: { color: "#B17C2F", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", marginBottom: 5 },
	nombre: { color: "#092536", fontSize: 19, fontWeight: "bold", marginBottom: 7 },
	detalle: { color: "#607580", fontSize: 13 },
});
