import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  aeronaveDemo,
  type AeronaveCatalogo,
} from "../../lib/aeronaveDemo";
import { supabase } from "../../lib/supabase";
import { getErrorMessage } from "../../lib/errorMessage";

export default function Inicio() {
  const router = useRouter();
  const [aeronaves, setAeronaves] = useState<AeronaveCatalogo[]>([
    aeronaveDemo,
  ]);
  const [cargando, setCargando] = useState(true);
  const [errorTexto, setErrorTexto] = useState<string | null>(null);
  const [actualizacion, setActualizacion] = useState(0);

  useEffect(() => {
    let activa = true;

    const cargarCatalogo = async () => {
      try {
        const { data, error } = await supabase
          .from("catalogo")
          .select("codigo, titulo, descripcion, detalle, precio")
          .order("titulo", { ascending: true });

        if (error) {
          throw error;
        }

        if (activa) {
          const aeronavesSupabase = data ?? [];
          setAeronaves(
            aeronavesSupabase.some(
              (item) => String(item.codigo) === String(aeronaveDemo.codigo),
            )
              ? aeronavesSupabase
              : [...aeronavesSupabase, aeronaveDemo],
          );
          setErrorTexto(null);
        }
      } catch (error) {
        if (activa) {
          setAeronaves([aeronaveDemo]);
          setErrorTexto(
            getErrorMessage(error),
          );
        }
      } finally {
        if (activa) {
          setCargando(false);
        }
      }
    };

    void cargarCatalogo();

    return () => {
      activa = false;
    };
  }, [actualizacion]);

  const actualizarCatalogo = () => {
    setErrorTexto(null);
    setCargando(true);
    setActualizacion((actual) => actual + 1);
  };

  const cerrarSesion = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        Alert.alert("Cerrar sesión", error.message);
      }
    } catch (error) {
      Alert.alert(
        "Cerrar sesión",
        error instanceof Error ? error.message : String(error),
      );
    }
  };

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#B17C2F" />
        <Text style={styles.cargandoTexto}>Consultando aeronaves en Supabase...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={aeronaves}
      keyExtractor={(item) => String(item.codigo)}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <View>
          <View style={styles.hero}>
            <Image
              source={require("../../../assets/inicio.jpg")}
              style={styles.imagenHero}
            />
            <View style={styles.overlay}>
              <Text style={styles.etiqueta}>AERONOVA GARAGE</Text>
              <Text style={styles.titulo}>Compra tu próximo avión.</Text>
              <Text style={styles.subtitulo}>
                Aeronaves seleccionadas, revisadas y listas para tu próxima aventura.
              </Text>
            </View>
          </View>

          <View style={styles.saludoBox}>
            <View>
              <Text style={styles.saludoTitulo}>Tu próximo vuelo empieza aquí</Text>
              <Text style={styles.saludoTexto}>Explora nuestro hangar privado.</Text>
            </View>
            <View style={styles.avatar}>
              <Text style={styles.avatarTexto}>✈</Text>
            </View>
          </View>

          <View style={styles.resumen}>
            <View style={styles.resumenItem}>
              <Text style={styles.resumenNumero}>{aeronaves.length}</Text>
              <Text style={styles.resumenTexto}>Aeronaves disponibles</Text>
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

          <Text style={styles.seccionTitulo}>Aeronaves disponibles</Text>
          {errorTexto ? <Text style={styles.errorTexto}>{errorTexto}</Text> : null}
          <Pressable
            style={styles.botonActualizar}
            onPress={() => router.push("/escanear")}
            accessibilityRole="button"
          >
            <Text style={styles.botonActualizarTexto}>
              Abrir cámara y escanear código QR
            </Text>
          </Pressable>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.centroLista}>
          <Text style={styles.vacio}>
            {errorTexto
              ? "No se pudo cargar el inventario."
              : "No hay aeronaves registradas por el momento."}
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPresionado,
          ]}
          onPress={() =>
            router.push({
              pathname: "./detalle",
              params: { codigo: String(item.codigo) },
            })
          }
          accessibilityRole="button"
          accessibilityLabel={`Ver detalles de ${item.titulo}`}
        >
          <View style={styles.iconoCaja}>
            <Text style={styles.icono}>✈</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitulo}>{item.titulo}</Text>
            {item.descripcion ? (
              <Text style={styles.cardDescripcion}>{item.descripcion}</Text>
            ) : null}
            {item.detalle ? (
              <Text style={styles.cardDescripcion}>{item.detalle}</Text>
            ) : null}
            {item.precio !== null && item.precio !== undefined ? (
              <Text style={styles.precio}>
                {`COP ${Number(item.precio).toLocaleString("es-CO")}`}
              </Text>
            ) : null}
            <Text style={styles.enlace}>Ver detalles →</Text>
          </View>
        </Pressable>
<<<<<<< HEAD

        <Pressable
          style={({ pressed }) => [
            styles.botonGrande,
            styles.botonPilotos,
            pressed && styles.botonPresionado,
          ]}
          onPress={() => router.push("/registros")}
        >
          <Text style={[styles.botonIcono, styles.botonIconoGrande]}>👥</Text>
          <Text style={styles.botonTexto}>Solicitudes recibidas</Text>
        </Pressable>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.botonGrande,
          styles.botonAeronaves,
          pressed && styles.botonPresionado,
        ]}
        onPress={() => router.push("/catalogo")}
      >
        <Text style={[styles.botonIcono, styles.botonIconoGrande]}>▤</Text>
        <Text style={styles.botonTexto}>Ver catálogo de productos</Text>
      </Pressable>

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
          onPress={() => router.push("/vuelos-prueba")}
        >
          <Text style={styles.botonIcono}>◉</Text>
          <Text style={styles.botonTextoOscuro}>Vuelos de prueba</Text>
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
          <Text style={styles.botonTexto}>Solicitar información</Text>
        </Pressable>

        /** aqui va lo nuevo de los 3 botones */
=======
      )}
      ListFooterComponent={
        <View>
>>>>>>> 69db181 (Mejora catálogo y escaneo de aeronaves)
          <Pressable
            style={styles.botonActualizar}
            onPress={actualizarCatalogo}
            accessibilityRole="button"
          >
            <Text style={styles.botonActualizarTexto}>Actualizar catálogo</Text>
          </Pressable>

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
              <Text style={styles.botonTexto}>Aviones en venta</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.botonGrande,
                styles.botonPilotos,
                pressed && styles.botonPresionado,
              ]}
              onPress={() => router.push("/registros")}
            >
              <Text style={[styles.botonIcono, styles.botonIconoGrande]}>👥</Text>
              <Text style={styles.botonTexto}>Solicitudes recibidas</Text>
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
              onPress={() => router.push("/vuelos-prueba")}
            >
              <Text style={styles.botonIcono}>◉</Text>
              <Text style={styles.botonTextoOscuro}>Vuelos de prueba</Text>
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
              <Text style={styles.botonTexto}>Solicitar información</Text>
            </Pressable>
          </View>

          <Pressable style={styles.botonCerrar} onPress={cerrarSesion}>
            <Text style={styles.textoCerrar}>Cerrar sesión</Text>
          </Pressable>

          <Text style={styles.footer}>
            AERONOVA GARAGE · COMPRA Y VENTA DE AVIONES
          </Text>
        </View>
      }
    />
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
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7F8",
    padding: 24,
  },
  cargandoTexto: {
    color: "#607580",
    fontSize: 15,
    marginTop: 12,
    textAlign: "center",
  },
  centroLista: {
    alignItems: "center",
    paddingVertical: 24,
  },
  vacio: {
    color: "#607580",
    fontSize: 14,
    textAlign: "center",
  },
  errorTexto: {
    color: "#9C2F36",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 12,
  },
  precio: {
    color: "#B17C2F",
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8,
  },
  enlace: {
    color: "#176C64",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 8,
  },
  botonActualizar: {
    backgroundColor: "#E5EDF0",
    borderRadius: 13,
    alignItems: "center",
    padding: 13,
    marginBottom: 24,
  },
  botonActualizarTexto: {
    color: "#092536",
    fontWeight: "bold",
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
  botonPilotos: {
    backgroundColor: "#B17C2F",  // ← color dorado para diferenciarlo
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
  botonCerrar: {
    backgroundColor: "#8E3B46",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },
  textoCerrar: {
    color: "#FFFFFF",
    fontWeight: "bold",
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
