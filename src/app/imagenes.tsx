import { Image } from "expo-image";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const aeronaves = [
	{
		nombre: "Cessna 172 Skyhawk",
		tipo: "Avioneta · Monomotor",
		detalle: "2021 · 410 h · COP 385.0000",
		imagen: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=900&q=85",
	},
	{
		nombre: "Piper M350",
		tipo: "Avión ejecutivo · Turbohélice",
		detalle: "2020 · 620 h · COP 1.250.000",
		imagen: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=900&q=85",
	},
	{
		nombre: "Cirrus SR22 G6",
		tipo: "Avioneta · Alto rendimiento",
		detalle: "2022 · 185 h · COP 795.000",
		imagen: "https://images.unsplash.com/photo-1559628233-3c4b7b4b7b8b?auto=format&fit=crop&w=900&q=85",
	},
	{
		nombre: "Beechcraft Bonanza G36",
		tipo: "Avioneta · Seis plazas",
		detalle: "2019 · 780 h · COP 925.000",
		imagen: "https://images.unsplash.com/photo-1474302770737-173ee21bab63?auto=format&fit=crop&w=900&q=85",
	},
	{
		nombre: "Diamond DA40 NG",
		tipo: "Avioneta · Entrenamiento",
		detalle: "2023 · 95 h · COP 465.000",
		imagen: "https://images.unsplash.com/photo-1521727857535-28d2047314a4?auto=format&fit=crop&w=900&q=85",
	},
	{
		nombre: "Pilatus PC-12 NGX",
		tipo: "Avión ejecutivo · Turboprop",
		detalle: "2021 · 340 h · COP 5.850.000",
		imagen: "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&w=900&q=85",
	},
];

export default function Imagenes() {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<View style={styles.portada}>
				<Image
					source={{ uri: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85" }}
					style={styles.imagenPortada}
					contentFit="cover"
				/>
				<View style={styles.portadaTexto}>
					<Text style={styles.portadaEtiqueta}>AERONOVA GARAGE</Text>
					<Text style={styles.portadaTitulo}>Elige tu próxima aventura</Text>
				</View>
			</View>
			<Text style={styles.eyebrow}>INVENTARIO SELECCIONADO</Text>
			<Text style={styles.titulo}>Aeronaves disponibles</Text>
			<Text style={styles.subtitulo}>
				Máquinas con historial transparente, inspección vigente y acompañamiento de principio a fin.
			</Text>
			<View style={styles.resumen}>
				<Text style={styles.resumenNumero}>{aeronaves.length}</Text>
				<Text style={styles.resumenTexto}>aeronaves listas para conocer</Text>
			</View>

			{aeronaves.map((aeronave) => (
				<View style={styles.card} key={aeronave.nombre}>
					<View style={styles.imagenCaja}>
						<Image source={{ uri: aeronave.imagen }} style={styles.imagen} contentFit="cover" />
						<View style={styles.estado}>
							<Text style={styles.estadoTexto}>DISPONIBLE</Text>
						</View>
					</View>
					<View style={styles.info}>
						<Text style={styles.tipo}>{aeronave.tipo}</Text>
						<Text style={styles.nombre}>{aeronave.nombre}</Text>
						<View style={styles.detalleCaja}>
							<Text style={styles.detalle}>{aeronave.detalle}</Text>
							<Text style={styles.flecha}>›</Text>
						</View>
					</View>
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: { flexGrow: 1, backgroundColor: "#EEF3F4", padding: 20 },
	portada: { height: 190, borderRadius: 20, overflow: "hidden", marginBottom: 22, elevation: 4 },
	imagenPortada: { width: "100%", height: "100%" },
	portadaTexto: { position: "absolute", left: 0, right: 0, bottom: 0, padding: 18, backgroundColor: "rgba(9, 37, 54, 0.78)" },
	portadaEtiqueta: { color: "#D7B56D", fontSize: 11, fontWeight: "bold", letterSpacing: 1.5, marginBottom: 5 },
	portadaTitulo: { color: "#FFFFFF", fontSize: 22, fontWeight: "bold" },
	eyebrow: { color: "#B17C2F", fontSize: 11, fontWeight: "bold", letterSpacing: 1.5, marginBottom: 8 },
	titulo: { color: "#092536", fontSize: 30, fontWeight: "bold", marginBottom: 8 },
	subtitulo: { color: "#607580", fontSize: 14, lineHeight: 21, marginBottom: 22 },
	resumen: { backgroundColor: "#092536", borderRadius: 16, padding: 16, flexDirection: "row", alignItems: "center", marginBottom: 20, elevation: 2 },
	resumenNumero: { color: "#D7B56D", fontSize: 24, fontWeight: "bold", marginRight: 10 },
	resumenTexto: { color: "#E7EFF1", fontSize: 13 },
	card: { backgroundColor: "#FFFFFF", borderRadius: 18, overflow: "hidden", marginBottom: 18, borderWidth: 1, borderColor: "#D8E1E4", elevation: 4 },
	imagenCaja: { position: "relative" },
	imagen: { width: "100%", height: 190 },
	estado: { position: "absolute", top: 12, left: 12, backgroundColor: "#D7B56D", borderRadius: 8, paddingHorizontal: 9, paddingVertical: 5 },
	estadoTexto: { color: "#092536", fontSize: 10, fontWeight: "bold", letterSpacing: 0.8 },
	info: { padding: 16 },
	tipo: { color: "#B17C2F", fontSize: 11, fontWeight: "bold", textTransform: "uppercase", marginBottom: 5 },
	nombre: { color: "#092536", fontSize: 20, fontWeight: "bold", marginBottom: 10 },
	detalleCaja: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#E5EDF0", paddingTop: 10 },
	detalle: { color: "#607580", fontSize: 13 },
	flecha: { color: "#B17C2F", fontSize: 25, lineHeight: 25 },
});
