import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function Registros() {
  const [registros, setRegistros] = useState<any[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;

    const cargarRegistros = async () => {
      setCargando(true);

      const { data, error } = await supabase
        .from("clientes_avion")
        .select("*")
        .order("id", { ascending: false });

      if (!activo) return;

      if (error) {
        alert(error.message);
        setCargando(false);
        return;
      }

      setRegistros(data || []);
      setCargando(false);
    };

    void cargarRegistros();

    return () => {
      activo = false;
    };
  }, []);

  if (cargando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#D7B56D" />
        <Text>Consultando Supabase...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pilotos Registrados ✈</Text>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text>{item.correo}</Text>
            <Text>Ciudad: {item.ciudad}</Text>
            <Text>Aeronave favorita: {item.avion_favorito}</Text>
            <Text>Tipo de vuelo: {item.tipo_vuelo}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F8",
    padding: 18,
  },
  centro: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#092536",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: "#D7B56D",
  },
  nombre: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#092536",
    marginBottom: 5,
  },
});