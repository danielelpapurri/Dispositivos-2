import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function Formulario() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [avionFavorito, setAvionFavorito] = useState("");
  const [tipoVuelo, setTipoVuelo] = useState("");
  const [guardando, setGuardando] = useState(false);

  const guardar = async () => {
    if (!nombre || !correo || !telefono || !ciudad || !avionFavorito || !tipoVuelo) {
      Alert.alert("Todos los campos son obligatorios");
      return;
    }

    try {
      setGuardando(true);

      const { data, error } = await supabase
        .from("clientes_avion")
        .insert([
          {
            nombre,
            correo,
            telefono,
            ciudad,
            avion_favorito: avionFavorito,
            tipo_vuelo: tipoVuelo,
          },
        ])
        .select();

      if (error) {
        console.log("Error Supabase:", error);

        const mensajeError = String(error.message ?? "").toLowerCase();
        const faltaRegistro =
          mensajeError.includes("does not exist") ||
          mensajeError.includes("not found") ||
          mensajeError.includes("relation") ||
          mensajeError.includes("table") ||
          mensajeError.includes("invalid url") ||
          mensajeError.includes("jwt") ||
          mensajeError.includes("unauthorized");

        Alert.alert(
          faltaRegistro ? "Falta registrar en Supabase" : "Error",
          faltaRegistro
            ? "Crea la tabla clientes_avion en Supabase antes de guardar los datos."
            : error.message,
        );
        return;
      }

      Alert.alert("Guardado", "que se ha guardado todo");

      const registro = data?.[0];

      if (registro) {
        router.push({
          pathname: "/resultado",
          params: {
            id: String(registro.id),
            nombre: registro.nombre,
            correo: registro.correo,
            telefono: registro.telefono,
            ciudad: registro.ciudad,
            avionFavorito: registro.avion_favorito,
            tipoVuelo: registro.tipo_vuelo,
          },
        });
      } else {
        router.push("/resultado");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No fue posible guardar la información");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Agenda tu visita</Text>
      <Text style={styles.subtitulo}>
        Comparte tus datos y tu aeronave favorita para recibir atención personalizada.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Alejandro Rivera"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@dominio.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />

        <Text style={styles.label}>Teléfono de contacto</Text>
        <TextInput
          style={styles.input}
          placeholder="3001234567"
          keyboardType="numeric"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Text style={styles.label}>Ciudad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Bogotá"
          value={ciudad}
          onChangeText={setCiudad}
        />

        <Text style={styles.label}>Aeronave favorita</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Cessna 172, Piper PA-28, Boeing 737"
          value={avionFavorito}
          onChangeText={setAvionFavorito}
        />

        <Text style={styles.label}>Tipo de vuelo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Recreativo, Comercial, Carga, Militar"
          value={tipoVuelo}
          onChangeText={setTipoVuelo}
        />

        <Pressable
          style={styles.boton}
          onPress={guardar}
          disabled={guardando}
        >
          {guardando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.botonTexto}>Guardar en Supabase</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F4F7F8",
    padding: 20,
    justifyContent: "center",
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#092536",
    textAlign: "center",
  },
  subtitulo: {
    color: "#607580",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D8E1E4",
    elevation: 3,
  },
  label: {
    color: "#294856",
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#F8FAFA",
    borderWidth: 1,
    borderColor: "#C8D6DA",
    borderRadius: 13,
    padding: 12,
    marginBottom: 14,
  },
  boton: {
    backgroundColor: "#0B3448",
    paddingVertical: 14,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 4,
  },
  botonTexto: {
    color: "white",
    fontWeight: "bold",
  },
});
