import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

function OpcionMenu({
  icono,
  titulo,
  descripcion,
  onPress,
}: {
  icono: string;
  titulo: string;
  descripcion: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.iconoCaja}>
        <Text style={styles.icono}>{icono}</Text>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitulo}>{titulo}</Text>
        <Text style={styles.cardDescripcion}>{descripcion}</Text>
      </View>

      <Text style={styles.flecha}>›</Text>
    </Pressable>
  );
}

export default function Inicio() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* PORTADA PRINCIPAL */}
      <View style={styles.hero}>
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
          }}
          style={styles.imagenHero}
        />

        <View style={styles.overlay}>
          <Text style={styles.etiqueta}>COFFEE APP</Text>
          <Text style={styles.titulo}>Coffee House</Text>
          <Text style={styles.subtitulo}>
            Descubre aromas, sabores y experiencias alrededor del café.
          </Text>
        </View>
      </View>

      {/* BIENVENIDA */}
      <View style={styles.saludoBox}>
        <View>
          <Text style={styles.saludoTitulo}>Hola, amante del café</Text>
          <Text style={styles.saludoTexto}>
            ¿Qué deseas explorar hoy?
          </Text>
        </View>

        <View style={styles.avatar}>
          <Text style={styles.avatarTexto}>☕</Text>
        </View>
      </View>

      {/* RESUMEN */}
      <View style={styles.resumen}>
        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>3</Text>
          <Text style={styles.resumenTexto}>Secciones</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>100%</Text>
          <Text style={styles.resumenTexto}>Café</Text>
        </View>

        <View style={styles.separador} />

        <View style={styles.resumenItem}>
          <Text style={styles.resumenNumero}>Expo</Text>
          <Text style={styles.resumenTexto}>Router</Text>
        </View>
      </View>

      <Text style={styles.seccionTitulo}>Explorar Coffee House</Text>

      <OpcionMenu
        icono="📝"
        titulo="Formulario"
        descripcion="Registra tus datos y tu preferencia de café."
        onPress={() => router.push("/formulario")}
      />

      <OpcionMenu
        icono="☕"
        titulo="Galería de cafés"
        descripcion="Explora imágenes de cafés, métodos y preparaciones."
        onPress={() => router.push("/imagenes")}
      />

      <OpcionMenu
        icono="📍"
        titulo="Contacto"
        descripcion="Consulta la información de nuestra cafetería."
        onPress={() => router.push("/contacto")}
      />

      {/* RECOMENDACIÓN */}
      <View style={styles.destacado}>
        <View style={styles.destacadoIcono}>
          <Text style={styles.destacadoEmoji}>🌸</Text>
        </View>

        <View style={styles.destacadoInfo}>
          <Text style={styles.destacadoTitulo}>
            Café del día
          </Text>

          <Text style={styles.destacadoTexto}>
            Prueba un cappuccino suave con notas de vainilla
            y un toque de canela.
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        Coffee House · Desarrollo Móvil
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF9F5",
    padding: 18,
  },

  hero: {
    height: 280,
    borderRadius: 28,
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
    backgroundColor: "rgba(92, 53, 38, 0.76)",
  },

  etiqueta: {
    color: "#FFE7EF",
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
    color: "#FFF1EA",
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
    color: "#5B3A2D",
  },

  saludoTexto: {
    marginTop: 3,
    color: "#8B6A5D",
    fontSize: 14,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F8DDE7",
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
    color: "#B86F7E",
    fontSize: 18,
    fontWeight: "bold",
  },

  resumenTexto: {
    color: "#8B6A5D",
    fontSize: 12,
    marginTop: 3,
  },

  separador: {
    width: 1,
    height: 35,
    backgroundColor: "#F1D7CF",
  },

  seccionTitulo: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#5B3A2D",
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
    borderColor: "#F1DDD6",
    elevation: 2,
  },

  iconoCaja: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#FBE7ED",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
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
    color: "#5B3A2D",
    marginBottom: 4,
  },

  cardDescripcion: {
    color: "#84675A",
    fontSize: 13,
    lineHeight: 18,
  },

  flecha: {
    fontSize: 30,
    color: "#C97C8E",
    marginLeft: 8,
  },

  destacado: {
    backgroundColor: "#F8E1E8",
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
    color: "#7A4C3A",
    marginBottom: 4,
  },

  destacadoTexto: {
    color: "#73594E",
    fontSize: 13,
    lineHeight: 19,
  },

  footer: {
    textAlign: "center",
    color: "#9B7A6E",
    fontSize: 12,
    marginTop: 24,
    marginBottom: 12,
  },
});
