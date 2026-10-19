import { useRouter } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { supabase, supabaseMissingKey } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async () => {
    if (supabaseMissingKey) {
      setMensaje(
        "Falta la clave pública de Supabase. Agrégala a .env.local y reinicia Expo con npx expo start -c.",
      );
      return;
    }

    if (!correo.trim() || !password) {
      setMensaje("Ingresa tu correo y contraseña.");
      return;
    }

    try {
      setCargando(true);
      setMensaje("");

      const { error } = await supabase.auth.signInWithPassword({
        email: correo.trim(),
        password,
      });

      if (error) {
        setMensaje(error.message);
        return;
      }

      router.replace("/");
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : String(error),
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>✈</Text>
      <Text style={styles.marca}>AERONOVA GARAGE</Text>
      <Text style={styles.titulo}>Compra y venta de aviones</Text>
      <Text style={styles.subtitulo}>
        Inicia sesión y encuentra el avión ideal para tu próxima aventura.
      </Text>
      {supabaseMissingKey ? (
        <Text style={styles.error}>
          Falta configurar la clave pública de Supabase en .env.local. Después
          reinicia Expo con npx expo start -c.
        </Text>
      ) : null}
      {mensaje ? <Text style={styles.error}>{mensaje}</Text> : null}

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
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#F4F7F8" },
  logo: { fontSize: 60, textAlign: "center", color: "#B17C2F" },
  marca: { color: "#B17C2F", fontSize: 12, fontWeight: "bold", letterSpacing: 2, textAlign: "center", marginTop: 8 },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#092536", textAlign: "center", marginTop: 8 },
  subtitulo: { color: "#607580", textAlign: "center", marginTop: 8, marginBottom: 24, lineHeight: 21 },
  input: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D8E1E4", borderRadius: 14, padding: 14, marginBottom: 14 },
  boton: { backgroundColor: "#092536", padding: 15, borderRadius: 14, alignItems: "center" },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold" },
  enlace: { color: "#092536", textAlign: "center", marginTop: 18, fontWeight: "600" },
  error: { color: "#9C2F36", textAlign: "center", marginBottom: 14, lineHeight: 20 },
});
