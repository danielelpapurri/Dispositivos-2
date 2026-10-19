import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

type Solicitud = {
  id: number;
  nombre_completo: string;
  correo: string;
  telefono: string;
  aeronave_interes: string;
  created_at: string;
};

export default function Registros() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let activa = true;

    const cargarSolicitudes = async () => {
      try {
        const { data, error: queryError } = await supabase
          .from("solicitudes_aeronova")
          .select("id, nombre_completo, correo, telefono, aeronave_interes, created_at")
          .order("created_at", { ascending: false });

        if (queryError) {
          throw queryError;
        }

        if (activa) {
          setSolicitudes(data ?? []);
        }
      } catch (loadError) {
        if (activa) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : String(loadError),
          );
        }
      } finally {
        if (activa) {
          setCargando(false);
        }
      }
    };

    void cargarSolicitudes();

    return () => {
      activa = false;
    };
  }, []);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#B17C2F" />
        <Text style={styles.secundario}>Cargando solicitudes...</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.container}
      data={solicitudes}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={
        <Text style={styles.titulo}>Solicitudes de compra</Text>
      }
      ListEmptyComponent={
        <Text style={styles.secundario}>
          {error ?? "Todavía no hay solicitudes registradas."}
        </Text>
      }
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.nombre}>{item.nombre_completo}</Text>
          <Text style={styles.dato}>Correo: {item.correo}</Text>
          <Text style={styles.dato}>Teléfono: {item.telefono}</Text>
          <Text style={styles.dato}>Avión de interés: {item.aeronave_interes}</Text>
          <Text style={styles.fecha}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4F7F8",
    padding: 18,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F7F8",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#092536",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#D8E1E4",
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#092536",
    marginBottom: 8,
  },
  dato: {
    color: "#607580",
    fontSize: 14,
    marginTop: 3,
  },
  fecha: {
    color: "#B17C2F",
    fontSize: 12,
    marginTop: 10,
  },
  secundario: {
    color: "#607580",
    textAlign: "center",
    marginTop: 10,
  },
});