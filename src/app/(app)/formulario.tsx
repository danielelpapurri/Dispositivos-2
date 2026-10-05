import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
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

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [cafeFavorito, setCafeFavorito] = useState("");

  const enviar = async () => {
    if (!nombre || !correo || !telefono || !ciudad || !cafeFavorito) {
      Alert.alert("Todos los campos son obligatorios");
      return;
    }

    if (!supabase) {
      Alert.alert(
        "Falta la configuración de Supabase",
        "Agrega NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY o EXPO_PUBLIC_SUPABASE_URL y EXPO_PUBLIC_SUPABASE_ANON_KEY en tu archivo .env o .env.local"
      );
      return;
    }

    const { error } = await supabase.from("clientes_cafe").insert([
      {
        nombre,
        correo,
        telefono,
        ciudad,
        cafe_favorito: cafeFavorito,
      },
    ]);

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    router.push({
      pathname: "/resultado",
      params: {
        nombre,
        correo,
        telefono,
        ciudad,
        cafe_favorito: cafeFavorito,
      },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Descubre tu café perfecto</Text>
      <Text style={styles.subtitulo}>
        Comparte tus datos y tu café favorito para recibir recomendaciones personalizadas.
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
          placeholder="Ej: Medellín"
          value={ciudad}
          onChangeText={setCiudad}
        />

        <Text style={styles.label}>Café favorito</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Latte, Americano, Cappuccino"
          value={cafeFavorito}
          onChangeText={setCafeFavorito}
        />

        <Pressable style={styles.boton} onPress={enviar}>
          <Text style={styles.botonTexto}>Guardar mi favorito</Text>
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
