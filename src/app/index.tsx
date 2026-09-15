import { useRouter } from "expo-router";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function Inicio() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* PORTADA PRINCIPAL */}
      <View style={styles.hero}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1559628233-3c4b7b4b7b8b?auto=format&fit=crop&w=1400&q=85",
          }}
          style={styles.imagenHero}
        />

        <View style={styles.overlay}>
          <Text style={styles.etiqueta}>AERONOVA GARAGE</Text>
          <Text style={styles.titulo}>Vuela más lejos.</Text>
          <Text style={styles.subtitulo}>
            Aeronaves seleccionadas, revisadas y listas para tu próxima aventura.
          </Text>
        </View>
      </View>

      {/* BIENVENIDA */}
      <View style={styles.saludoBox}>
        <View>
          <Text style={styles.saludoTitulo}>Tu próximo vuelo empieza aquí</Text>
          <Text style={styles.saludoTexto}>
            Explora nuestro hangar privado.
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>✈</Text>
        </View>
      </View>

      {/* RESUMEN */}
      <View style={styles.resumen}>
        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>12</Text>
          <Text style={styles.resumenTexto}>Aeronaves</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>24/7</Text>
          <Text style={styles.resumenTexto}>Asesoría</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>15+</Text>
          <Text style={styles.resumenTexto}>Años volando</Text>
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Descubre el hangar</Text>

      <View style={styles.botonPrincipal}>
        <Pressable
          style={({ pressed }) => [
            styles.botonGrande,
            styles.botonAeronaves,
            pressed && styles.botonPresionado,
          ]}
          onPress={() => router.push("/imagenes")}
        >
          <Text style={[styles.botonIcono, styles.botonIconoGrande]}>✈</Text>
          <Text style={styles.botonTexto}>Aeronaves disponibles</Text>
        </Pressable>
      </View>

      <View style={styles.filaBotones}>
        <Pressable
          style={({ pressed }) => [
            styles.botonPequeno,
            styles.botonContacto,
            pressed && styles.botonPresionado,
          ]}
          onPress={() => router.push("/contacto")}
        >
          <Text style={styles.botonIcono}>⌖</Text>
          <Text style={styles.botonTexto}>Visítanos</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.botonPequeno,
            styles.botonDestacada,
            pressed && styles.botonPresionado,
          ]}
          onPress={() => router.push("/imagenes")}
        >
          <Text style={styles.botonIcono}>★</Text>
          <Text style={styles.botonTextoOscuro}>Aeronave destacada</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.botonPequeno,
            styles.botonFormulario,
            pressed && styles.botonPresionado,
          ]}
          onPress={() => router.push("/formulario")}
        >
          <Text style={styles.botonIcono}>✦</Text>
          <Text style={styles.botonTexto}>Agenda una visita</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>
        AERONOVA GARAGE · VENTA DE AERONAVES
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4F7F8",
    padding: 18,
  },

  hero: {
    height: 280,
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 20,
    elevation: 6,
  },

  imagenHero: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 22,
    backgroundColor: "rgba(7, 28, 41, 0.82)",
  },

  etiqueta: {
    color: "#D7B56D",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.8,
    marginBottom: 6,
  },

  titulo: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 6,
  },

  subtitulo: {
    color: "#E7EFF1",
    fontSize: 14,
    lineHeight: 21,
  },

  saludoBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },

  saludoTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#092536",
  },

  saludoTexto: {
    marginTop: 3,
    color: "#607580",
    fontSize: 14,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D7B56D",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarTexto: {
    fontSize: 24,
  },

  resumen: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 24,
    elevation: 2,
  },

  resumenItem: {
    flex: 1,
    alignItems: "center",
  },

  resumenNumero: {
    color: "#B17C2F",
    fontSize: 18,
    fontWeight: "bold",
  },

  resumenTexto: {
    color: "#607580",
    fontSize: 12,
    marginTop: 3,
  },

  separador: {
    width: 1,
    height: 35,
    backgroundColor: "#D8E1E4",
  },

  seccionTitulo: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#092536",
    marginBottom: 14,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D8E1E4",
    elevation: 2,
  },

  cardPresionado: {
    backgroundColor: "#D7B56D",
    borderColor: "#B17C2F",
    transform: [{ scale: 0.98 }],
  },

  botonPrincipal: {
    width: "100%",
  },

  filaBotones: {
    flexDirection: "row",
    gap: 12,
    alignItems: "stretch",
  },

  botonGrande: {
    width: "100%",
    minHeight: 72,
    borderRadius: 18,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 3,
  },

  botonPequeno: {
    flex: 1,
    minHeight: 118,
    borderRadius: 18,
    padding: 14,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  botonAeronaves: {
    backgroundColor: "#092536",
  },

  botonContacto: {
    backgroundColor: "#D7B56D",
  },

  botonFormulario: {
    backgroundColor: "#B17C2F",
  },

  botonDestacada: {
    backgroundColor: "#E5EDF0",
  },

  botonPresionado: {
    opacity: 0.78,
    transform: [{ scale: 0.98 }],
  },

  botonIcono: {
    fontSize: 25,
    marginBottom: 7,
  },

  botonIconoGrande: {
    marginBottom: 0,
    marginRight: 10,
  },

  botonTexto: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },

  botonTextoOscuro: {
    color: "#092536",
  },

  cardCompacto: {
    flex: 1,
    minHeight: 150,
    padding: 12,
    flexDirection: "column",
    alignItems: "flex-start",
  },

  iconoCaja: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#E5EDF0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  cardCompactoIconoCaja: {
    marginRight: 0,
    marginBottom: 10,
  },

  icono: {
    fontSize: 25,
  },

  cardInfo: {
    flex: 1,
  },

  cardTitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#092536",
    marginBottom: 4,
  },

  cardDescripcion: {
    color: "#607580",
    fontSize: 13,
    lineHeight: 18,
  },

  flecha: {
    fontSize: 30,
    color: "#B17C2F",
    marginLeft: 8,
  },

  destacado: {
    backgroundColor: "#E5EDF0",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  destacadoIcono: {
    width: 52,
    height: 52,
    borderRadius: 17,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  destacadoEmoji: {
    fontSize: 25,
  },

  destacadoInfo: {
    flex: 1,
  },

  destacadoTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#092536",
    marginBottom: 4,
  },

  destacadoTexto: {
    color: "#506873",
    fontSize: 13,
    lineHeight: 19,
  },

  footer: {
    textAlign: "center",
    color: "#78909A",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 12,
  },
});
