import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Formulario() {
  const router = useRouter();
  const { aeronaveInteres: aeronaveParam } = useLocalSearchParams<{
    aeronaveInteres?: string;
  }>();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [aeronaveInteres, setAeronaveInteres] = useState(aeronaveParam ?? "");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const guardar = async () => {
    if (!nombre.trim() || !correo.trim() || !telefono.trim() || !aeronaveInteres.trim()) {
      setMensaje("Completa todos los campos para enviar la solicitud.");
      return;
    }

    try {
      setGuardando(true);
      setMensaje("");

      const { error } = await supabase
        .from("solicitudes_aeronova")
        .insert([
          {
            nombre_completo: nombre.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            aeronave_interes: aeronaveInteres.trim(),
          },
        ]);

      if (error) {
        setMensaje(`No se pudo guardar la solicitud: ${error.message}`);
        return;
      }

      router.push({
        pathname: "/resultado",
        params: {
          nombre: nombre.trim(),
          correo: correo.trim(),
          telefono: telefono.trim(),
          aeronaveInteres: aeronaveInteres.trim(),
        },
      });
    } catch (error) {
      setMensaje(
        `No se pudo guardar la solicitud: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Solicita información</Text>
      <Text style={styles.subtitulo}>
        Déjanos tus datos y el avión que te interesa comprar.
      </Text>
      {mensaje ? <Text style={styles.error}>{mensaje}</Text> : null}

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

        <Text style={styles.label}>Avión de interés</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Cessna 172, Piper M350"
          value={aeronaveInteres}
          onChangeText={setAeronaveInteres}
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
  error: {
    color: "#9C2F36",
    textAlign: "center",
    marginBottom: 14,
    lineHeight: 20,
  },
});
