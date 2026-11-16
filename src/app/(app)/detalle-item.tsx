import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type Aeronave = {
  codigo: string;
  titulo: string;
  descripcion: string;
  detalle: string | null;
  precio: number | null;
};

function formatearPrecio(precio: number | null) {
  if (precio === null) return "Precio a consultar";
  return `$ ${Number(precio).toLocaleString("es-CO")} COP`;
}

export default function DetalleItem() {
  const router = useRouter();
  // codigo llega desde "Ver detalles" del catálogo o desde el escáner QR.
  const { codigo } = useLocalSearchParams<{ codigo?: string }>();
  const [aeronave, setAeronave] = useState<Aeronave | null>(null);
  const [cargando, setCargando] = useState(true);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    let activa = true;

    const cargarDetalle = async () => {
      if (!codigo) {
        setMensaje("No se recibió ningún código de aeronave.");
        setCargando(false);
        return;
      }

      try {
        // SELECT ... FROM catalogo_qr WHERE codigo = :codigo  (una sola fila)
        const { data, error } = await supabase
          .from("catalogo_qr")
          .select("codigo,titulo,descripcion,detalle,precio")
          .eq("codigo", codigo)
          .maybeSingle();

        if (error) throw error;
        if (!activa) return;

        if (!data) {
          setMensaje(`La aeronave con código ${codigo} no existe en el catálogo.`);
        } else {
          setAeronave(data);
        }
      } catch (e) {
        console.error("Error al consultar detalle:", e);
        if (activa) setMensaje("No se pudo consultar Supabase.");
      } finally {
        if (activa) setCargando(false);
      }
    };

    void cargarDetalle();

    return () => {
      activa = false;
    };
  }, [codigo]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#B17C2F" />
        <Text style={styles.secundario}>Consultando aeronave {codigo}...</Text>
      </View>
    );
  }

  if (!aeronave) {
    return (
      <View style={styles.centro}>
        <Text style={styles.tituloError}>Aeronave no encontrada</Text>
        <Text style={styles.error}>{mensaje}</Text>
        <Pressable style={styles.boton} onPress={() => router.replace("/catalogo")}>
          <Text style={styles.botonTexto}>Ir al catálogo</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.heroIcono}>✈</Text>
        <Text style={styles.codigo}>{aeronave.codigo}</Text>
        <Text style={styles.titulo}>{aeronave.titulo}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.etiqueta}>DESCRIPCIÓN</Text>
        <Text style={styles.texto}>{aeronave.descripcion}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.etiqueta}>DETALLE TÉCNICO</Text>
        <Text style={styles.texto}>{aeronave.detalle || "Sin detalle registrado."}</Text>
      </View>

      <View style={styles.precioBox}>
        <Text style={styles.etiquetaPrecio}>PRECIO</Text>
        <Text style={styles.precio}>{formatearPrecio(aeronave.precio)}</Text>
      </View>

      <Pressable
        style={({ pressed }) => [styles.boton, pressed && styles.presionado]}
        onPress={() => router.push("/formulario")}
      >
        <Text style={styles.botonTexto}>Solicitar información</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.botonSecundario, pressed && styles.presionado]}
        onPress={() => router.push("/escanear")}
      >
        <Text style={styles.botonSecundarioTexto}>Escanear otra aeronave</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    backgroundColor: "#F4F7F8",
    padding: 20,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7F8",
    padding: 25,
  },
  hero: {
    backgroundColor: "#092536",
    borderRadius: 22,
    padding: 22,
    alignItems: "center",
    marginBottom: 16,
  },
  heroIcono: { fontSize: 40, color: "#D7B56D", marginBottom: 6 },
  codigo: { color: "#D7B56D", fontSize: 12, fontWeight: "bold", letterSpacing: 1.6, marginBottom: 6 },
  titulo: { color: "#FFFFFF", fontSize: 26, fontWeight: "bold", textAlign: "center" },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#D8E1E4",
    marginBottom: 12,
  },
  etiqueta: { color: "#B17C2F", fontSize: 11, fontWeight: "bold", letterSpacing: 1.4, marginBottom: 6 },
  texto: { color: "#405560", fontSize: 15, lineHeight: 22 },
  precioBox: {
    backgroundColor: "#E5EDF0",
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
  },
  etiquetaPrecio: { color: "#607580", fontSize: 11, fontWeight: "bold", letterSpacing: 1.4, marginBottom: 4 },
  precio: { color: "#092536", fontSize: 24, fontWeight: "bold" },
  boton: {
    backgroundColor: "#B17C2F",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 4,
  },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold", fontSize: 15 },
  botonSecundario: {
    borderWidth: 1,
    borderColor: "#092536",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 10,
  },
  botonSecundarioTexto: { color: "#092536", fontWeight: "bold" },
  presionado: { opacity: 0.75 },
  tituloError: { color: "#092536", fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  error: { color: "#9E2730", textAlign: "center", marginBottom: 16 },
  secundario: { color: "#607580", textAlign: "center", marginTop: 10 },
});
