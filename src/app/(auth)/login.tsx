import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async () => {
    if (!correo.trim() || !password) {
      Alert.alert("Campos incompletos", "Ingrese correo y contraseña");
      return;
    }

    try {
      setCargando(true);

      const { error } = await supabase.auth.signInWithPassword({
        email: correo.trim(),
        password,
      });

      if (error) {
        Alert.alert("Inicio de sesión", error.message);
        return;
      }

      // No se necesita router.replace("/").
      // Stack.Protected reaccionará cuando exista session.
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>☕</Text>
      <Text style={styles.titulo}>Coffee App</Text>
      <Text style={styles.subtitulo}>Inicia sesión para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Pressable style={styles.boton} onPress={iniciarSesion} disabled={cargando}>
        {cargando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.botonTexto}>Iniciar sesión</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.push("/registro")}>
        <Text style={styles.enlace}>¿No tienes cuenta? Regístrate</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#FFF8FB" },
  logo: { fontSize: 60, textAlign: "center" },
  titulo: { fontSize: 30, fontWeight: "bold", color: "#6B4234", textAlign: "center" },
  subtitulo: { color: "#8A6A5B", textAlign: "center", marginBottom: 24 },
  input: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#E5C4CF", borderRadius: 14, padding: 14, marginBottom: 14 },
  boton: { backgroundColor: "#C87591", padding: 15, borderRadius: 14, alignItems: "center" },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold" },
  enlace: { color: "#6B4234", textAlign: "center", marginTop: 18, fontWeight: "600" },
});
