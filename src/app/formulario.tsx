import { useState } from "react";
import { useRouter } from "expo-router";
import {
  ScrollView,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

export default function Formulario() {
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");

  const enviar = () => {
    if (!nombre || !correo || !telefono || !ciudad) {
      alert("Todos los campos son obligatorios");
      return;
    }

    router.push({
      pathname: "/resultado",
      params: {
        nombre,
        correo,
        telefono,
        ciudad,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Registro de usuario</Text>
      <Text style={styles.subtitulo}>
        Completa la información para continuar.
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingrese su nombre"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Correo</Text>
        <TextInput
          style={styles.input}
          placeholder="correo@dominio.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />

        <Text style={styles.label}>Teléfono</Text>
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
          placeholder="Ej: Pasto"
          value={ciudad}
          onChangeText={setCiudad}
        />

        <Pressable style={styles.boton} onPress={enviar}>
          <Text style={styles.botonTexto}>Enviar información</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF7FA",
    padding: 20,
    justifyContent: "center",
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6C4051",
    textAlign: "center",
  },

  subtitulo: {
    color: "#8A727C",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2D5E0",
    elevation: 3,
  },

  label: {
    color: "#684552",
    fontWeight: "600",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#FFF9FB",
    borderWidth: 1,
    borderColor: "#EBC8D6",
    borderRadius: 13,
    padding: 12,
    marginBottom: 14,
  },

  boton: {
    backgroundColor: "#C96A8B",
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
