import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function VuelosPrueba() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../assets/inicio.jpg")}
        style={styles.imagen}
        contentFit="cover"
      />

      <Text style={styles.eyebrow}>EXPERIENCIA AERONOVA</Text>
      <Text style={styles.titulo}>Vuelos de prueba</Text>
      <Text style={styles.subtitulo}>
        Conoce la aeronave antes de tomar una decisión y descubre cómo se siente en el aire.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>Así funciona</Text>
        <Text style={styles.paso}>1. Elige una aeronave del inventario.</Text>
        <Text style={styles.paso}>2. Agenda el día y la hora de tu vuelo.</Text>
        <Text style={styles.paso}>3. Un piloto te acompaña durante la experiencia.</Text>
      </View>

      <View style={styles.nota}>
        <Text style={styles.notaTitulo}>Requisitos básicos</Text>
        <Text style={styles.notaTexto}>Documento de identidad y reserva previa.</Text>
      </View>

      <Pressable style={({ pressed }) => [styles.boton, pressed && styles.botonPresionado]} onPress={() => router.push("/formulario")}>
        <Text style={styles.botonTexto}>Agendar vuelo de prueba</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: "#F4F7F8", padding: 20 },
  imagen: { width: "100%", height: 190, borderRadius: 20, marginBottom: 22 },
  eyebrow: { color: "#B17C2F", fontSize: 11, fontWeight: "bold", letterSpacing: 1.5, marginBottom: 9 },
  titulo: { color: "#092536", fontSize: 30, fontWeight: "bold", marginBottom: 9 },
  subtitulo: { color: "#607580", fontSize: 15, lineHeight: 22, marginBottom: 20 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 18, borderWidth: 1, borderColor: "#D8E1E4", marginBottom: 14 },
  cardTitulo: { color: "#092536", fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  paso: { color: "#607580", fontSize: 14, lineHeight: 23 },
  nota: { backgroundColor: "#E5EDF0", borderRadius: 16, padding: 16, marginBottom: 22 },
  notaTitulo: { color: "#092536", fontSize: 15, fontWeight: "bold", marginBottom: 5 },
  notaTexto: { color: "#607580", fontSize: 13 },
  boton: { backgroundColor: "#B17C2F", borderRadius: 14, paddingVertical: 15, alignItems: "center" },
  botonPresionado: { opacity: 0.75 },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold", fontSize: 15 },
});
