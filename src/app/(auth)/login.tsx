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
import { supabase, supabaseMissingKey } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [verPassword, setVerPassword] = useState(false);
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
        const mensajeError =
          error.message === "Invalid API key"
            ? "La clave pública no corresponde a la URL del proyecto Supabase. Revisa ambos valores en .env.local."
            : error.message === "Invalid login credentials"
              ? "Correo o contraseña incorrectos. Si aún no tienes una cuenta, regístrate. Si acabas de registrarte, confirma tu correo y vuelve a intentarlo."
              : error.message;
        setMensaje(mensajeError);
        Alert.alert("No se pudo iniciar sesión", mensajeError);
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
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
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

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput style={styles.input} placeholder="nombre@correo.com" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordRow}>
        <TextInput style={styles.passwordInput} placeholder="Tu contraseña" value={password} onChangeText={setPassword} secureTextEntry={!verPassword} autoCapitalize="none" onSubmitEditing={iniciarSesion} />
        <Pressable onPress={() => setVerPassword((value) => !value)} accessibilityRole="button" accessibilityLabel={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
          <Text style={styles.toggle}>{verPassword ? "Ocultar" : "Ver"}</Text>
        </Pressable>
      </View>

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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, justifyContent: "center", padding: 20, backgroundColor: "#EDF4F1" },
  container: { width: "100%", maxWidth: 480, alignSelf: "center", justifyContent: "center", padding: 24, backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#DCE7E1", shadowColor: "#173A34", shadowOpacity: 0.1, shadowRadius: 22, shadowOffset: { width: 0, height: 10 }, elevation: 4 },
  logo: { fontSize: 60, textAlign: "center", color: "#B17C2F" },
  marca: { color: "#B17C2F", fontSize: 12, fontWeight: "bold", letterSpacing: 2, textAlign: "center", marginTop: 8 },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#092536", textAlign: "center", marginTop: 8 },
  subtitulo: { color: "#607580", textAlign: "center", marginTop: 8, marginBottom: 24, lineHeight: 21 },
  label: { color: "#203C3A", fontSize: 13, fontWeight: "700", marginBottom: 7, marginTop: 4 },
  input: { minHeight: 50, backgroundColor: "#FBFCFB", borderWidth: 1, borderColor: "#D3DFD9", borderRadius: 11, paddingHorizontal: 13, paddingVertical: 11, marginBottom: 12, color: "#102C35" },
  passwordRow: { minHeight: 50, flexDirection: "row", alignItems: "center", backgroundColor: "#FBFCFB", borderWidth: 1, borderColor: "#D3DFD9", borderRadius: 11, paddingHorizontal: 13, marginBottom: 16 },
  passwordInput: { flex: 1, minWidth: 0, paddingVertical: 11, color: "#102C35" },
  toggle: { color: "#176C64", fontSize: 12, fontWeight: "800", paddingLeft: 8 },
  boton: { backgroundColor: "#092536", padding: 15, borderRadius: 14, alignItems: "center" },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold" },
  enlace: { color: "#092536", textAlign: "center", marginTop: 18, fontWeight: "600" },
  error: { color: "#9C2F36", textAlign: "center", marginBottom: 14, lineHeight: 20 },
});
