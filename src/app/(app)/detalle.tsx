import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
import type { CatalogoItem } from "../../types/catalogo";

export default function DetalleCatalogo() {
  const params = useLocalSearchParams<{ codigo?: string | string[] }>();
  const codigo = Array.isArray(params.codigo) ? params.codigo[0] : params.codigo;
  const [producto, setProducto] = useState<CatalogoItem | null>(null);
  const [cargando, setCargando] = useState(true);
  const [errorTexto, setErrorTexto] = useState("");

  useEffect(() => {
    let activo = true;

    async function obtenerProducto() {
      setCargando(true);
      setErrorTexto("");

      if (!codigo) {
        setErrorTexto("No se recibió el código del producto.");
        setCargando(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("catalogo")
          .select("codigo,titulo,descripcion,detalle")
          .eq("codigo", codigo)
          .returns<CatalogoItem[]>()
          .maybeSingle();

        if (error) {
          console.error("Error de Supabase al consultar el producto:", error);
          throw error;
        }

        if (activo) {
          setProducto(data);
          if (!data) {
            setErrorTexto("El producto ya no está disponible en el catálogo.");
          }
        }
      } catch (error: unknown) {
        console.error("Error al cargar el detalle del producto:", error);
        const mensaje =
          error instanceof Error
            ? error.message
            : typeof error === "object" &&
                error !== null &&
                "message" in error
              ? String(error.message)
              : String(error);

        if (activo) {
          setErrorTexto(`No fue posible cargar el producto: ${mensaje}`);
          setProducto(null);
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    }

    void obtenerProducto();

    return () => {
      activo = false;
    };
  }, [codigo]);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#B17C2F" />
        <Text style={styles.textoSecundario}>Cargando producto...</Text>
      </View>
    );
  }

  if (!producto) {
    return (
      <View style={styles.centro}>
        <Text style={styles.titulo}>Producto no disponible</Text>
        <Text style={styles.textoSecundario}>{errorTexto}</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedor}>
      <View style={styles.tarjeta}>
        <Text style={styles.etiqueta}>CÓDIGO {producto.codigo}</Text>
        <Text style={styles.titulo}>
          {producto.titulo?.trim() || "Producto sin título"}
        </Text>
        {producto.descripcion?.trim() ? (
          <Text style={styles.descripcion}>{producto.descripcion}</Text>
        ) : null}
        {producto.detalle?.trim() ? (
          <View style={styles.detalle}>
            <Text style={styles.subtitulo}>Detalle</Text>
            <Text style={styles.textoDetalle}>{producto.detalle}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 18,
    backgroundColor: "#F4F7F8",
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#F4F7F8",
  },
  tarjeta: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D8E1E4",
    padding: 22,
    elevation: 3,
  },
  etiqueta: {
    color: "#B17C2F",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
  },
  titulo: {
    color: "#092536",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  descripcion: {
    color: "#607580",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
  },
  detalle: {
    borderTopWidth: 1,
    borderTopColor: "#E5EDF0",
    marginTop: 20,
    paddingTop: 16,
  },
  subtitulo: {
    color: "#092536",
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 8,
  },
  textoDetalle: {
    color: "#607580",
    fontSize: 15,
    lineHeight: 23,
  },
  textoSecundario: {
    color: "#607580",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
    marginTop: 10,
  },
});
