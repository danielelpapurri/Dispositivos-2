import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function Login() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [campoActivo, setCampoActivo] = useState("");
  const [visible, setVisible] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const iniciarSesion = async () => {
    setError("");
    if (!correo.trim() || !password) {
      setError("Completa el correo electrónico y la contraseña.");
      return;
    }

    setCargando(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: correo.trim(),
      password,
    });
    setCargando(false);

    if (authError) {
      setError(authError.message || "No fue posible iniciar sesión. Revisa tus credenciales.");
      Alert.alert("No se pudo iniciar sesión", authError.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <View style={styles.brandMark}><Text style={styles.brandGlyph}>A</Text></View>
        <Text style={styles.eyebrow}>AERONOVA GARAGE · ACCESO PRIVADO</Text>
        <Text style={styles.title}>Bienvenido{"\n"}de nuevo.</Text>
        <Text style={styles.intro}>Inicia sesión para gestionar tus solicitudes y explorar el hangar.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Correo electrónico</Text>
          <View style={[styles.inputWrap, campoActivo === "correo" && styles.inputFocused]}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              style={styles.input}
              placeholder="nombre@correo.com"
              placeholderTextColor="#81918D"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={correo}
              onChangeText={setCorreo}
              onFocus={() => setCampoActivo("correo")}
              onBlur={() => setCampoActivo("")}
              textContentType="emailAddress"
            />
          </View>

          <Text style={styles.label}>Contraseña</Text>
          <View style={[styles.inputWrap, campoActivo === "password" && styles.inputFocused]}>
            <Text style={styles.inputIcon}>⌑</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu contraseña"
              placeholderTextColor="#81918D"
              secureTextEntry={!visible}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              onFocus={() => setCampoActivo("password")}
              onBlur={() => setCampoActivo("")}
              onSubmitEditing={iniciarSesion}
              textContentType="password"
            />
            <Pressable onPress={() => setVisible((value) => !value)} accessibilityRole="button" accessibilityLabel={visible ? "Ocultar contraseña" : "Mostrar contraseña"}>
              <Text style={styles.toggle}>{visible ? "Ocultar" : "Ver"}</Text>
            </Pressable>
          </View>

          {!!error && <View style={styles.errorBanner}><Text style={styles.bannerText}>{error}</Text></View>}

          <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, cargando && styles.buttonDisabled]}
            onPress={iniciarSesion}
            disabled={cargando}
          >
            {cargando ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Iniciar sesión  →</Text>}
          </Pressable>

          <View style={styles.registerLine}>
            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
            <Pressable onPress={() => router.push("/registro")}>
              <Text style={styles.registerLink}>Regístrate</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.footer}>UNA EXPERIENCIA AERONÁUTICA A TU ALTURA</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 20, paddingVertical: 36, backgroundColor: "#EDF4F1" },
  content: { width: "100%", maxWidth: 480, alignSelf: "center" },
  brandMark: { width: 50, height: 50, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: "#C6D95B", marginBottom: 22 },
  brandGlyph: { color: "#102C35", fontSize: 26, fontWeight: "900" },
  eyebrow: { color: "#55706A", fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 13 },
  title: { color: "#102C35", fontSize: 36, lineHeight: 41, fontWeight: "800", marginBottom: 10 },
  intro: { color: "#5F716C", fontSize: 15, lineHeight: 23, marginBottom: 24, maxWidth: 380 },
  card: { padding: 24, backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#DCE7E1", shadowColor: "#173A34", shadowOpacity: 0.1, shadowRadius: 22, shadowOffset: { width: 0, height: 10 }, elevation: 4 },
  label: { color: "#203C3A", fontSize: 13, fontWeight: "700", marginBottom: 8, marginTop: 8 },
  inputWrap: { minHeight: 54, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#D3DFD9", borderRadius: 12, paddingHorizontal: 14, backgroundColor: "#FBFCFB", marginBottom: 12 },
  inputFocused: { borderColor: "#176C64", borderWidth: 1.5 },
  inputIcon: { width: 25, color: "#65827A", fontSize: 17 },
  input: { flex: 1, minWidth: 0, color: "#102C35", fontSize: 15, paddingVertical: 13, outlineStyle: "none" } as never,
  toggle: { color: "#176C64", fontSize: 12, fontWeight: "800", paddingVertical: 10, paddingLeft: 8 },
  errorBanner: { borderRadius: 12, borderWidth: 1, borderColor: "#EAB8AE", backgroundColor: "#FFF2EF", padding: 12, marginTop: 2, marginBottom: 12 },
  bannerText: { color: "#9C3326", fontSize: 13, lineHeight: 19 },
  button: { minHeight: 54, alignItems: "center", justifyContent: "center", backgroundColor: "#146B67", borderRadius: 12, marginTop: 8 },
  buttonPressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  registerLine: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginTop: 20 },
  registerText: { color: "#657771", fontSize: 13 },
  registerLink: { color: "#146B67", fontSize: 13, fontWeight: "800" },
  footer: { textAlign: "center", color: "#8A9B94", fontSize: 9, fontWeight: "700", letterSpacing: 1.1, marginTop: 24 },
});
