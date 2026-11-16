import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
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

export default function Catalogo() {
  const router = useRouter();
  const [aeronaves, setAeronaves] = useState<Aeronave[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activa = true;

    const cargarCatalogo = async () => {
      try {
        // SELECT codigo, titulo, descripcion, detalle, precio
        // FROM catalogo_qr ORDER BY codigo ASC
        const { data, error: consultaError } = await supabase
          .from("catalogo_qr")
          .select("codigo,titulo,descripcion,detalle,precio")
          .order("codigo", { ascending: true });

        if (consultaError) throw consultaError;
        if (activa) setAeronaves(data ?? []);
      } catch (e) {
        console.error("Error al cargar catalogo_qr:", e);
        if (activa) {
          setError(
            e instanceof Error
              ? e.message
              : (e as { message?: string })?.message ?? String(e),
          );
        }
      } finally {
        if (activa) setCargando(false);
      }
    };

    void cargarCatalogo();

    return () => {
      activa = false;
    };
  }, []);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#B17C2F" />
        <Text style={styles.secundario}>Cargando aeronaves...</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={aeronaves}
      keyExtractor={(item) => item.codigo}
      ListHeaderComponent={
        <View>
          <Text style={styles.eyebrow}>CATÁLOGO INTERACTIVO</Text>
          <Text style={styles.titulo}>Aeronaves disponibles</Text>
          <Text style={styles.subtitulo}>
            Toca &quot;Ver detalles&quot; o escanea el código QR de una aeronave.
          </Text>

          <Pressable
            style={({ pressed }) => [styles.botonEscanear, pressed && styles.presionado]}
            onPress={() => router.push("/escanear")}
          >
            <Text style={styles.botonEscanearTexto}>▣  Escanear código QR</Text>
          </Pressable>

          {!!error && (
            <Text style={styles.error}>
              No se pudo consultar Supabase: {error}
            </Text>
          )}
        </View>
      }
      ListEmptyComponent={
        error ? undefined : (
          <Text style={styles.secundario}>No hay aeronaves en el catálogo.</Text>
        )
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.codigo}>{item.codigo}</Text>
          <Text style={styles.nombre}>{item.titulo}</Text>
          <Text style={styles.descripcion} numberOfLines={2}>
            {item.descripcion}
          </Text>
          <Text style={styles.precio}>{formatearPrecio(item.precio)}</Text>

          <Pressable
            style={({ pressed }) => [styles.botonDetalle, pressed && styles.presionado]}
            onPress={() =>
              router.push({
                pathname: "/detalle-item",
                params: { codigo: item.codigo },
              })
            }
          >
            <Text style={styles.botonDetalleTexto}>Ver detalles</Text>
          </Pressable>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 760,
    alignSelf: "center",
    backgroundColor: "#F4F7F8",
    padding: 18,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7F8",
  },
  eyebrow: { color: "#B17C2F", fontSize: 11, fontWeight: "bold", letterSpacing: 1.5, marginBottom: 8 },
  titulo: { color: "#092536", fontSize: 28, fontWeight: "bold", marginBottom: 6 },
  subtitulo: { color: "#607580", fontSize: 14, lineHeight: 21, marginBottom: 16 },
  botonEscanear: {
    backgroundColor: "#092536",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 18,
  },
  botonEscanearTexto: { color: "#FFFFFF", fontWeight: "bold", fontSize: 15 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D8E1E4",
    elevation: 2,
  },
  codigo: { color: "#B17C2F", fontSize: 12, fontWeight: "bold", letterSpacing: 1.2, marginBottom: 4 },
  nombre: { color: "#092536", fontSize: 19, fontWeight: "bold", marginBottom: 6 },
  descripcion: { color: "#607580", fontSize: 14, lineHeight: 20, marginBottom: 10 },
  precio: { color: "#092536", fontSize: 16, fontWeight: "bold", marginBottom: 12 },
  botonDetalle: {
    backgroundColor: "#D7B56D",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  botonDetalleTexto: { color: "#092536", fontWeight: "bold" },
  presionado: { opacity: 0.75, transform: [{ scale: 0.98 }] },
  error: { color: "#9E2730", fontSize: 13, lineHeight: 19, marginBottom: 12 },
  secundario: { color: "#607580", textAlign: "center", marginTop: 10 },
});
