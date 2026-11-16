import { useRouter } from "expo-router";
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
import { supabase, supabaseMissingKey } from "../../lib/supabase";

export default function Registro() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [aeronaveInteres, setAeronaveInteres] = useState("");
  const [verPassword, setVerPassword] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [registroCompleto, setRegistroCompleto] = useState(false);

  const crearCuenta = async () => {
    if (supabaseMissingKey) {
      setMensaje(
        "Falta la clave pública de Supabase. Agrégala a .env.local y reinicia Expo con npx expo start -c.",
      );
      return;
    }

    if (
      !nombreCompleto.trim() ||
      !correo.trim() ||
      !telefono.trim() ||
      !aeronaveInteres.trim() ||
      !password
    ) {
      setMensaje("Completa todos los campos.");
      return;
    }

    if (password.length < 6) {
      setMensaje("La contraseña debe tener mínimo 6 caracteres.");
      return;
    }

    try {
      setGuardando(true);
      setMensaje("");
      setRegistroCompleto(false);

      const { data, error } = await supabase.auth.signUp({
        email: correo.trim(),
        password,
        options: {
          data: {
            nombre_completo: nombreCompleto.trim(),
            telefono: telefono.trim(),
            aeronave_interes: aeronaveInteres.trim(),
          },
        },
      });

      if (error) {
        setMensaje(error.message === "Invalid API key"
          ? "La clave pública no corresponde a la URL del proyecto Supabase. Revisa ambos valores en .env.local."
          : error.message);
        return;
      }

      const { error: insertError } = await supabase
        .from("solicitudes_aeronova")
        .insert([
          {
            nombre_completo: nombreCompleto.trim(),
            correo: correo.trim(),
            telefono: telefono.trim(),
            aeronave_interes: aeronaveInteres.trim(),
          },
        ]);

      if (insertError) {
        await supabase.auth.signOut();
        setMensaje(
          `No se pudo guardar la solicitud: ${insertError.message}`,
        );
        return;
      }

      await supabase.auth.signOut();
      setRegistroCompleto(true);
      setMensaje(
        data.session
          ? "Cuenta creada. Ya puedes iniciar sesión."
          : "Cuenta creada. Revisa tu correo y confirma la cuenta antes de iniciar sesión.",
      );
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : String(error),
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
      <Text style={styles.logo}>✈</Text>
      <Text style={styles.marca}>AERONOVA GARAGE</Text>
      <Text style={styles.titulo}>Crear cuenta</Text>
      <Text style={styles.subtitulo}>
        Regístrate para encontrar y comprar tu próximo avión.
      </Text>
      {supabaseMissingKey ? (
        <Text style={styles.error}>
          Falta configurar la clave pública de Supabase en .env.local. Después
          reinicia Expo con npx expo start -c.
        </Text>
      ) : null}
      {mensaje ? (
        <Text style={registroCompleto ? styles.exito : styles.error}>
          {mensaje}
        </Text>
      ) : null}

      <Text style={styles.label}>Nombre completo</Text>
      <TextInput style={styles.input} placeholder="Ej. María García" value={nombreCompleto} onChangeText={setNombreCompleto} autoCapitalize="words" />

      <Text style={styles.label}>Teléfono</Text>
      <TextInput style={styles.input} placeholder="Tu número de contacto" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />

      <Text style={styles.label}>Aeronave de interés</Text>
      <TextInput style={styles.input} placeholder="Modelo o tipo de aeronave" value={aeronaveInteres} onChangeText={setAeronaveInteres} />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput style={styles.input} placeholder="nombre@correo.com" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none" autoCorrect={false} />

      <Text style={styles.label}>Contraseña</Text>
      <View style={styles.passwordRow}>
        <TextInput style={styles.passwordInput} placeholder="Crea una contraseña" value={password} onChangeText={setPassword} secureTextEntry={!verPassword} autoCapitalize="none" />
        <Pressable onPress={() => setVerPassword((value) => !value)} accessibilityRole="button" accessibilityLabel={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
          <Text style={styles.toggle}>{verPassword ? "Ocultar" : "Ver"}</Text>
        </Pressable>
      </View>
      <Text style={styles.helper}>Mínimo 6 caracteres</Text>

      <Pressable style={styles.boton} onPress={crearCuenta} disabled={guardando}>
        {guardando ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.botonTexto}>Crear cuenta</Text>
        )}
      </Pressable>

      <Pressable onPress={() => router.replace("/login")}>
        <Text style={styles.enlace}>
          {registroCompleto ? "Ir a iniciar sesión" : "Ya tengo una cuenta"}
        </Text>
      </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, justifyContent: "center", padding: 20, backgroundColor: "#EDF4F1" },
  container: { width: "100%", maxWidth: 480, alignSelf: "center", justifyContent: "center", padding: 24, backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#DCE7E1", shadowColor: "#173A34", shadowOpacity: 0.1, shadowRadius: 22, shadowOffset: { width: 0, height: 10 }, elevation: 4 },
  logo: { fontSize: 56, textAlign: "center", color: "#B17C2F" },
  marca: { color: "#B17C2F", fontSize: 12, fontWeight: "bold", letterSpacing: 2, textAlign: "center", marginTop: 8 },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#092536", textAlign: "center", marginTop: 8 },
  subtitulo: { color: "#607580", textAlign: "center", marginTop: 8, marginBottom: 24, lineHeight: 21 },
  label: { color: "#203C3A", fontSize: 13, fontWeight: "700", marginBottom: 7, marginTop: 4 },
  input: { minHeight: 48, backgroundColor: "#FBFCFB", borderWidth: 1, borderColor: "#D3DFD9", borderRadius: 11, paddingHorizontal: 13, paddingVertical: 11, marginBottom: 12, color: "#102C35" },
  passwordRow: { minHeight: 48, flexDirection: "row", alignItems: "center", backgroundColor: "#FBFCFB", borderWidth: 1, borderColor: "#D3DFD9", borderRadius: 11, paddingHorizontal: 13, marginBottom: 3 },
  passwordInput: { flex: 1, minWidth: 0, paddingVertical: 11, color: "#102C35" },
  toggle: { color: "#176C64", fontSize: 12, fontWeight: "800", paddingLeft: 8 },
  helper: { color: "#74857F", fontSize: 11, marginTop: 3, marginBottom: 12 },
  boton: { backgroundColor: "#092536", padding: 15, borderRadius: 14, alignItems: "center" },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold" },
  enlace: { color: "#092536", textAlign: "center", marginTop: 18, fontWeight: "600" },
  error: { color: "#9C2F36", textAlign: "center", marginBottom: 14, lineHeight: 20 },
  exito: { color: "#26734D", textAlign: "center", marginBottom: 14, lineHeight: 20 },
});
