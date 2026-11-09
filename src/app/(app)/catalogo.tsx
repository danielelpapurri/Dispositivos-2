import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import type { CatalogoItem } from "../../types/catalogo";

export default function Catalogo() {
  const router = useRouter();
  const [productos, setProductos] = useState<CatalogoItem[]>([]);
  const [cargando, setCargando] = useState(true);
  const [errorTexto, setErrorTexto] = useState("");
  const [intentos, setIntentos] = useState(0);

  // Consulta en Supabase los campos que existen en la tabla catalogo.
  useEffect(() => {
    let activo = true;

    async function obtenerCatalogo() {
      try {
        const { data, error } = await supabase
          .from("catalogo")
          .select("codigo,titulo,descripcion,detalle")
          .returns<CatalogoItem[]>()
          .order("codigo", { ascending: true });

        if (!activo) return;
        if (error) {
          console.error("Error de Supabase al consultar el catálogo:", error);
          throw error;
        }

        console.log("Productos recibidos:", data);
        setProductos(data ?? []);
      } catch (error: unknown) {
        console.error("Error al cargar el catálogo:", error);
        const mensaje =
          error instanceof Error
            ? error.message
            : typeof error === "object" &&
                error !== null &&
                "message" in error
              ? String(error.message)
              : String(error);

        if (activo) {
          setErrorTexto(`No fue posible cargar el catálogo: ${mensaje}`);
          setProductos([]);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    void obtenerCatalogo();

    return () => {
      activo = false;
    };
  }, [intentos]);

  // Muestra un indicador mientras Supabase devuelve los productos.
  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#B17C2F" />
        <Text style={styles.textoEstado}>Cargando catálogo...</Text>
      </View>
    );
  }

  // La lista refleja los registros actuales de Supabase.
  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.contenido}
      data={productos}
      keyExtractor={(item) => item.codigo}
      ListHeaderComponent={
        <View style={styles.encabezado}>
          <Text style={styles.etiqueta}>AERONOVA GARAGE</Text>
          <Text style={styles.titulo}>Catálogo</Text>
          <Text style={styles.subtitulo}>
            Productos disponibles en nuestro inventario.
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.estadoVacio}>
          <Text style={styles.estadoTitulo}>
            {errorTexto ? "No se pudo mostrar el catálogo" : "Catálogo vacío"}
          </Text>
          <Text style={styles.textoEstado}>
            {errorTexto || "Cuando agregues productos en Supabase, aparecerán aquí."}
          </Text>
          {errorTexto ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                setErrorTexto("");
                setCargando(true);
                setIntentos((valor) => valor + 1);
              }}
              style={({ pressed }) => [
                styles.boton,
                pressed && styles.botonPresionado,
              ]}
            >
              <Text style={styles.textoBoton}>Intentar de nuevo</Text>
            </Pressable>
          ) : null}
        </View>
      }
      renderItem={({ item }) => (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ver ${item.titulo || item.codigo}`}
          style={({ pressed }) => [
            styles.tarjeta,
            pressed && styles.tarjetaPresionada,
          ]}
          onPress={() =>
            router.push({
              pathname: "/detalle",
              params: { codigo: item.codigo },
            })
          }
        >
          <View style={styles.codigo}>
            <Text style={styles.codigoTexto}>{item.codigo}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.nombre}>
              {item.titulo?.trim() || "Producto sin título"}
            </Text>
            {item.descripcion?.trim() ? (
              <Text style={styles.descripcion} numberOfLines={2}>
                {item.descripcion}
              </Text>
            ) : null}
          </View>
          <Text style={styles.flecha}>›</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: "#F4F7F8",
  },
  contenido: {
    flexGrow: 1,
    padding: 18,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7F8",
    padding: 24,
  },
  encabezado: {
    marginBottom: 20,
  },
  etiqueta: {
    color: "#B17C2F",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 6,
  },
  titulo: {
    color: "#092536",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#607580",
    fontSize: 15,
    lineHeight: 22,
    marginTop: 6,
  },
  tarjeta: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E1E4",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  tarjetaPresionada: {
    opacity: 0.75,
  },
  codigo: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5EDF0",
    marginRight: 13,
  },
  codigoTexto: {
    color: "#092536",
    fontSize: 11,
    fontWeight: "bold",
    textAlign: "center",
  },
  info: {
    flex: 1,
  },
  nombre: {
    color: "#092536",
    fontSize: 17,
    fontWeight: "bold",
  },
  descripcion: {
    color: "#607580",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 4,
  },
  flecha: {
    color: "#B17C2F",
    fontSize: 28,
    marginLeft: 8,
  },
  estadoVacio: {
    alignItems: "center",
    padding: 22,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
  },
  estadoTitulo: {
    color: "#092536",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  textoEstado: {
    color: "#607580",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 8,
  },
  boton: {
    backgroundColor: "#092536",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginTop: 16,
  },
  botonPresionado: {
    opacity: 0.75,
  },
  textoBoton: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
