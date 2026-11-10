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
import {
  aeronaveDemo,
  type AeronaveCatalogo,
} from "../../lib/aeronaveDemo";
import { getErrorMessage } from "../../lib/errorMessage";
import { supabase } from "../../lib/supabase";

export default function DetalleItem() {
  const { codigo } = useLocalSearchParams<{
    codigo?: string | string[];
  }>();
  const codigoAeronave = Array.isArray(codigo) ? codigo[0] : codigo;
  const router = useRouter();
  const [aeronave, setAeronave] = useState<AeronaveCatalogo | null>(null);
  const [cargando, setCargando] = useState(true);
  const [errorTexto, setErrorTexto] = useState("");

  useEffect(() => {
    let activa = true;

    const cargarAeronave = async () => {
      if (!codigoAeronave) {
        setAeronave(null);
        setErrorTexto("Falta el código de la aeronave.");
        setCargando(false);
        return;
      }

      setCargando(true);
      setErrorTexto("");

      if (codigoAeronave === String(aeronaveDemo.codigo)) {
        setAeronave(aeronaveDemo);
        setCargando(false);
        return;
      }

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
          setErrorTexto(
            `No fue posible cargar el detalle: ${getErrorMessage(error)}`,
          );
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
          Consultando el detalle de la aeronave...
        </Text>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {aeronave ? (
        <>
          <View style={styles.iconoCaja}>
            <Text style={styles.icono}>✈</Text>
          </View>
          <Text style={styles.etiqueta}>AERONAVE DISPONIBLE</Text>
          <Text style={styles.titulo}>{aeronave.titulo}</Text>
          <Text style={styles.codigo}>{String(aeronave.codigo)}</Text>
          <Text style={styles.descripcion}>{aeronave.descripcion}</Text>
          <View style={styles.detalleCaja}>
            <Text style={styles.detalleTitulo}>Detalles de la aeronave</Text>
            <Text style={styles.detalle}>{aeronave.detalle}</Text>
          </View>
          {aeronave.precio !== null && aeronave.precio !== undefined ? (
            <Text style={styles.precio}>
              {formatearPrecio(aeronave.precio)}
            </Text>
          ) : (
            <Text style={styles.secundario}>
              Precio disponible bajo consulta.
            </Text>
          )}
          <Pressable
            style={styles.boton}
            onPress={() =>
              router.push({
                pathname: "/formulario",
                params: { aeronaveInteres: aeronave.titulo },
              })
            }
          >
            <Text style={styles.botonTexto}>Solicitar información</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.mensaje}>
            {errorTexto || "No hay información para mostrar."}
          </Text>
          <Pressable style={styles.botonSecundario} onPress={() => router.back()}>
            <Text style={styles.botonSecundarioTexto}>Volver al catálogo</Text>
          </Pressable>
        </>
      )}
    </ScrollView>
  );
}

function formatearPrecio(precio: number | string) {
  const valor = Number(precio);
  if (!Number.isFinite(valor)) {
    return `Precio: ${precio}`;
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4F7F8",
    padding: 20,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  icono: { color: "#092536", fontSize: 36 },
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
  },
  descripcion: {
    color: "#607580",
    fontSize: 15,
    lineHeight: 23,
    marginTop: 12,
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
  detalle: { color: "#607580", fontSize: 14, lineHeight: 21 },
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
  botonTexto: { color: "#FFFFFF", fontWeight: "bold" },
  botonSecundario: {
    backgroundColor: "#E5EDF0",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginTop: 18,
  },
  botonSecundarioTexto: { color: "#092536", fontWeight: "bold" },
});
