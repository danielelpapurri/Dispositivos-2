import { ScrollView, StyleSheet, Text, View } from "react-native";

const servicios = [
  ["Compra con confianza", "Revisamos cada aeronave, documentamos su historial y te acompañamos durante todo el proceso."],
  ["Servicios para pilotos", "Inspección precompra, gestión documental, seguros y puesta a punto para volar desde el primer día."],
  ["Modelos que conocemos", "Trabajamos con Cessna, Piper, Cirrus, Beechcraft y otras marcas líderes de aviación general."],
  ["Una relación a largo plazo", "Seguimos contigo después de la compra: mantenimiento, horas de vuelo y recomendaciones para cuidar tu inversión."],
];

export default function Explore() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.eyebrow}>EXPERIENCIA AERONOVA</Text>
      <Text style={styles.titulo}>Centro de vuelo</Text>
      <Text style={styles.subtitulo}>
        Todo lo que necesitas para elegir, comprar y disfrutar tu próxima aeronave.
      </Text>
      {servicios.map(([titulo, descripcion]) => (
        <View style={styles.item} key={titulo}>
          <View style={styles.numero}><Text style={styles.numeroTexto}>✦</Text></View>
          <View style={styles.info}>
            <Text style={styles.itemTitulo}>{titulo}</Text>
            <Text style={styles.itemTexto}>{descripcion}</Text>
          </View>
        </View>
      ))}
      <Text style={styles.cierre}>Más de 15 años ayudando a pilotos y familias a encontrar aeronaves que encajen con su forma de volar.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#F4F7F8", padding: 20 },
  eyebrow: { color: "#B17C2F", fontSize: 11, fontWeight: "bold", letterSpacing: 1.5, marginBottom: 9 },
  titulo: { color: "#092536", fontSize: 30, fontWeight: "bold", marginBottom: 9 },
  subtitulo: { color: "#607580", fontSize: 15, lineHeight: 22, marginBottom: 20 },
  item: { flexDirection: "row", backgroundColor: "#FFFFFF", padding: 16, borderRadius: 16, borderWidth: 1, borderColor: "#D8E1E4", marginBottom: 12 },
  numero: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#E5EDF0", justifyContent: "center", alignItems: "center", marginRight: 13 },
  numeroTexto: { color: "#B17C2F", fontSize: 17 },
  info: { flex: 1 },
  itemTitulo: { color: "#092536", fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  itemTexto: { color: "#607580", fontSize: 13, lineHeight: 19 },
  cierre: { color: "#506873", fontSize: 14, lineHeight: 21, textAlign: "center", marginTop: 12, paddingHorizontal: 10 },
});
