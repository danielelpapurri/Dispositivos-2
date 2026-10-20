import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function Registro() {
  const router = useRouter();
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [aeronaveInteres, setAeronaveInteres] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [campoActivo, setCampoActivo] = useState("");
  const [visible, setVisible] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const crearCuenta = async () => {
    setError("");
    setExito("");
    if (!nombreCompleto.trim() || !telefono.trim() || !aeronaveInteres.trim() || !correo.trim() || !password) {
      setError("Completa todos los campos para continuar.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    setCargando(true);
    let paso = "crear la cuenta";
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: correo.trim(),
        password,
      });
      if (signUpError) throw signUpError;

      paso = "guardar la solicitud";
      const { error: insertError } = await supabase.from("solicitudes_aeronova").insert([{
        nombre_completo: nombreCompleto.trim(),
        correo: correo.trim(),
        telefono: telefono.trim(),
        aeronave_interes: aeronaveInteres.trim(),
      }]);
      if (insertError) {
        await supabase.auth.signOut();
        throw insertError;
      }

      await supabase.auth.signOut();
      setExito("Cuenta creada. Ahora puede iniciar sesión");
      setTimeout(() => router.replace("/login"), 1200);
    } catch (caughtError) {
      const detalle = caughtError instanceof Error ? caughtError.message : "Error desconocido";
      const esErrorDeRed = /failed to fetch|network request failed/i.test(detalle);
      setError(esErrorDeRed
        ? `No se pudo ${paso}: no hay conexión con Supabase. Verifica EXPO_PUBLIC_SUPABASE_URL en .env.local y reinicia Expo.`
        : `No se pudo ${paso}: ${detalle}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <Pressable onPress={() => router.replace("/login")} style={styles.back}>
          <Text style={styles.backText}>←  Volver al acceso</Text>
        </Pressable>
        <Text style={styles.eyebrow}>AERONOVA GARAGE · NUEVA CUENTA</Text>
        <Text style={styles.title}>Tu próximo vuelo{ "\n" }empieza aquí.</Text>
        <Text style={styles.intro}>Crea tu cuenta y cuéntanos qué aeronave tienes en mente.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre completo</Text>
          <View style={[styles.inputWrap, campoActivo === "nombre" && styles.inputFocused]}><Text style={styles.inputIcon}>◉</Text><TextInput style={styles.input} placeholder="Ej. María García" placeholderTextColor="#81918D" autoCapitalize="words" value={nombreCompleto} onChangeText={setNombreCompleto} onFocus={() => setCampoActivo("nombre")} onBlur={() => setCampoActivo("")} /></View>

          <Text style={styles.label}>Teléfono</Text>
          <View style={[styles.inputWrap, campoActivo === "telefono" && styles.inputFocused]}><Text style={styles.inputIcon}>⌕</Text><TextInput style={styles.input} placeholder="Tu número de contacto" placeholderTextColor="#81918D" keyboardType="phone-pad" value={telefono} onChangeText={setTelefono} onFocus={() => setCampoActivo("telefono")} onBlur={() => setCampoActivo("")} /></View>

          <Text style={styles.label}>Aeronave de interés</Text>
          <View style={[styles.inputWrap, campoActivo === "aeronave" && styles.inputFocused]}><Text style={styles.inputIcon}>✈</Text><TextInput style={styles.input} placeholder="Modelo o tipo de aeronave" placeholderTextColor="#81918D" value={aeronaveInteres} onChangeText={setAeronaveInteres} onFocus={() => setCampoActivo("aeronave")} onBlur={() => setCampoActivo("")} /></View>

          <Text style={styles.label}>Correo electrónico</Text>
          <View style={[styles.inputWrap, campoActivo === "correo" && styles.inputFocused]}><Text style={styles.inputIcon}>✉</Text><TextInput style={styles.input} placeholder="nombre@correo.com" placeholderTextColor="#81918D" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} value={correo} onChangeText={setCorreo} onFocus={() => setCampoActivo("correo")} onBlur={() => setCampoActivo("")} textContentType="emailAddress" /></View>

          <Text style={styles.label}>Contraseña</Text>
          <View style={[styles.inputWrap, campoActivo === "password" && styles.inputFocused]}>
            <Text style={styles.inputIcon}>⌑</Text>
            <TextInput style={styles.input} placeholder="Crea una contraseña" placeholderTextColor="#81918D" secureTextEntry={!visible} autoCapitalize="none" value={password} onChangeText={setPassword} onFocus={() => setCampoActivo("password")} onBlur={() => setCampoActivo("")} textContentType="newPassword" />
            <Pressable onPress={() => setVisible((value) => !value)} accessibilityRole="button" accessibilityLabel={visible ? "Ocultar contraseña" : "Mostrar contraseña"}><Text style={styles.toggle}>{visible ? "Ocultar" : "Ver"}</Text></Pressable>
          </View>
          <Text style={styles.helper}>Mínimo 6 caracteres</Text>

          {!!error && <View style={styles.errorBanner}><Text style={styles.bannerText}>{error}</Text></View>}
          {!!exito && <View style={styles.successBanner}><Text style={styles.successText}>{exito}</Text></View>}

          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, cargando && styles.buttonDisabled]} onPress={crearCuenta} disabled={cargando}>
            {cargando ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Crear cuenta  →</Text>}
          </Pressable>
          <View style={styles.loginLine}><Text style={styles.loginText}>¿Ya tienes cuenta? </Text><Pressable onPress={() => router.replace("/login")}><Text style={styles.loginLink}>Inicia sesión</Text></Pressable></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 20, paddingVertical: 28, backgroundColor: "#EDF4F1" },
  content: { width: "100%", maxWidth: 480, alignSelf: "center" },
  back: { alignSelf: "flex-start", paddingVertical: 8, marginBottom: 14 },
  backText: { color: "#176C64", fontSize: 13, fontWeight: "700" },
  eyebrow: { color: "#55706A", fontSize: 10, fontWeight: "800", letterSpacing: 1.1, marginBottom: 12 },
  title: { color: "#102C35", fontSize: 32, lineHeight: 37, fontWeight: "800", marginBottom: 8 },
  intro: { color: "#5F716C", fontSize: 14, lineHeight: 21, marginBottom: 18 },
  card: { padding: 22, backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#DCE7E1", shadowColor: "#173A34", shadowOpacity: 0.1, shadowRadius: 22, shadowOffset: { width: 0, height: 10 }, elevation: 4 },
  label: { color: "#203C3A", fontSize: 12, fontWeight: "700", marginBottom: 6, marginTop: 7 },
  inputWrap: { minHeight: 48, flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#D3DFD9", borderRadius: 11, paddingHorizontal: 12, backgroundColor: "#FBFCFB", marginBottom: 5 },
  inputFocused: { borderColor: "#176C64", borderWidth: 1.5 },
  inputIcon: { width: 24, color: "#65827A", fontSize: 16 },
  input: { flex: 1, minWidth: 0, color: "#102C35", fontSize: 14, paddingVertical: 11, outlineStyle: "none" } as never,
  toggle: { color: "#176C64", fontSize: 11, fontWeight: "800", paddingVertical: 8, paddingLeft: 6 },
  helper: { color: "#74857F", fontSize: 11, marginTop: 1, marginBottom: 9, marginLeft: 2 },
  errorBanner: { borderRadius: 11, borderWidth: 1, borderColor: "#EAB8AE", backgroundColor: "#FFF2EF", padding: 11, marginBottom: 10 },
  bannerText: { color: "#9C3326", fontSize: 12, lineHeight: 18 },
  successBanner: { borderRadius: 11, borderWidth: 1, borderColor: "#B6DCC4", backgroundColor: "#EDF8F0", padding: 11, marginBottom: 10 },
  successText: { color: "#25633C", fontSize: 12, lineHeight: 18, fontWeight: "700" },
  button: { minHeight: 51, alignItems: "center", justifyContent: "center", backgroundColor: "#146B67", borderRadius: 11, marginTop: 5 },
  buttonPressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
  loginLine: { flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginTop: 15 },
  loginText: { color: "#657771", fontSize: 12 },
  loginLink: { color: "#146B67", fontSize: 12, fontWeight: "800" },
});
