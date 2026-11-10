<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
=======
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
>>>>>>> 69db181 (Mejora catálogo y escaneo de aeronaves)
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";
<<<<<<< HEAD
import type { CatalogoItem } from "../../types/catalogo";

export default function DetalleCatalogo() {
  const params = useLocalSearchParams<{ codigo?: string | string[] }>();
  const codigo = Array.isArray(params.codigo) ? params.codigo[0] : params.codigo;
  const [producto, setProducto] = useState<CatalogoItem | null>(null);
=======
import { getErrorMessage } from "../../lib/errorMessage";

type Aeronave = {
  codigo: string | number;
  titulo: string;
  descripcion: string | null;
  detalle: string | null;
  precio: number | string | null;
};

export default function DetalleItem() {
  const { codigo } = useLocalSearchParams<{
    codigo?: string | string[];
  }>();
  const codigoAeronave = Array.isArray(codigo) ? codigo[0] : codigo;
  const router = useRouter();
  const [aeronave, setAeronave] = useState<Aeronave | null>(null);
>>>>>>> 69db181 (Mejora catálogo y escaneo de aeronaves)
  const [cargando, setCargando] = useState(true);
  const [errorTexto, setErrorTexto] = useState("");

  useEffect(() => {
<<<<<<< HEAD
    let activo = true;

    async function obtenerProducto() {
      setCargando(true);
      setErrorTexto("");

      if (!codigo) {
        setErrorTexto("No se recibió el código del producto.");
=======
    let activa = true;

    const cargarAeronave = async () => {
      if (!codigoAeronave) {
        setAeronave(null);
        setErrorTexto("Falta el código de la aeronave.");
>>>>>>> 69db181 (Mejora catálogo y escaneo de aeronaves)
        setCargando(false);
        return;
      }

<<<<<<< HEAD
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
=======
      setCargando(true);
      setErrorTexto("");

      try {
        const { data, error } = await supabase
          .from("catalogo")
          .select("codigo, titulo, descripcion, detalle, precio")
          .eq("codigo", codigoAeronave)
          .maybeSingle();

        if (error) {
          throw error;
        }

        if (activa) {
          setAeronave(data);
          if (!data) {
            setErrorTexto("No encontramos esta aeronave en el inventario.");
          }
        }
      } catch (error) {
        if (activa) {
          setAeronave(null);
          const mensaje = getErrorMessage(error);
          setErrorTexto(`No fue posible cargar el detalle: ${mensaje}`);
        }
      } finally {
        if (activa) {
          setCargando(false);
        }
      }
    };

    void cargarAeronave();

    return () => {
      activa = false;
    };
  }, [codigoAeronave]);

  if (cargando) {
    return (
      <ScrollView contentContainerStyle={[styles.container, styles.centro]}>
        <ActivityIndicator size="large" color="#B17C2F" />
        <Text style={styles.secundario}>
          Consultando el detalle de la aeronave en Supabase...
        </Text>
      </ScrollView>
>>>>>>> 69db181 (Mejora catálogo y escaneo de aeronaves)
    );
  }

  return (
<<<<<<< HEAD
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
=======
    <ScrollView contentContainerStyle={styles.container}>
      {aeronave ? (
        <>
          <View style={styles.iconoCaja}>
            <Text style={styles.icono}>✈</Text>
          </View>
          <Text style={styles.etiqueta}>AERONAVE DISPONIBLE</Text>
          <Text style={styles.titulo}>{aeronave.titulo}</Text>
          <Text style={styles.codigo}>{String(aeronave.codigo)}</Text>
          {aeronave.descripcion ? (
            <Text style={styles.descripcion}>{aeronave.descripcion}</Text>
          ) : null}
          {aeronave.detalle ? (
            <View style={styles.detalleCaja}>
              <Text style={styles.detalleTitulo}>Detalles de la aeronave</Text>
              <Text style={styles.detalle}>{aeronave.detalle}</Text>
            </View>
          ) : null}
          {aeronave.precio !== null && aeronave.precio !== undefined ? (
            <Text style={styles.precio}>
              {formatearPrecio(aeronave.precio)}
            </Text>
          ) : (
            <Text style={styles.secundario}>
              Precio disponible bajo consulta.
            </Text>
          )}
        </>
      ) : (
        <Text style={styles.mensaje}>
          {errorTexto || "No hay información para mostrar."}
        </Text>
      )}
      <Pressable
        style={aeronave ? styles.boton : styles.botonSecundario}
        onPress={() => {
          if (aeronave) {
            router.push({
              pathname: "/formulario",
              params: { aeronaveInteres: aeronave.titulo },
            });
          } else {
            router.back();
          }
        }}
      >
        <Text style={aeronave ? styles.botonTexto : styles.botonSecundarioTexto}>
          {aeronave ? "Solicitar información" : "Regresar al catálogo"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

function formatearPrecio(precio: number | string) {
  const precioNumerico = Number(precio);
  if (!Number.isFinite(precioNumerico)) {
    return `Precio: ${precio}`;
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(precioNumerico);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4F7F8",
    padding: 20,
>>>>>>> 69db181 (Mejora catálogo y escaneo de aeronaves)
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
<<<<<<< HEAD
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
=======
    backgroundColor: "#F4F7F8",
    padding: 24,
  },
  iconoCaja: {
    width: 76,
    height: 76,
    borderRadius: 24,
    backgroundColor: "#E5EDF0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  icono: {
    color: "#092536",
    fontSize: 36,
  },
  etiqueta: {
    color: "#B17C2F",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  titulo: {
    color: "#092536",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  codigo: {
    color: "#176C64",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 0.7,
    marginTop: 8,
    textTransform: "uppercase",
>>>>>>> 69db181 (Mejora catálogo y escaneo de aeronaves)
  },
  descripcion: {
    color: "#607580",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
<<<<<<< HEAD
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
=======
    textAlign: "center",
  },
  detalleCaja: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D8E1E4",
    padding: 16,
    marginTop: 22,
  },
  detalleTitulo: {
    color: "#092536",
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
  },
  detalle: {
    color: "#607580",
    fontSize: 14,
    lineHeight: 21,
  },
  precio: {
    color: "#B17C2F",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 22,
  },
  secundario: {
    color: "#607580",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    textAlign: "center",
  },
  mensaje: {
    color: "#607580",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 28,
    textAlign: "center",
  },
  boton: {
    width: "100%",
    backgroundColor: "#092536",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 28,
  },
  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  botonSecundario: {
    backgroundColor: "#E5EDF0",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginTop: 18,
  },
  botonSecundarioTexto: {
    color: "#092536",
    fontWeight: "bold",
>>>>>>> 69db181 (Mejora catálogo y escaneo de aeronaves)
  },
});
