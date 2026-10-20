import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function Formulario() {
  const router = useRouter();
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [aeronaveInteres, setAeronaveInteres] = useState("");
  const [campoActivo, setCampoActivo] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const guardar = async () => {
    setError("");
    if (!nombreCompleto.trim() || !correo.trim() || !telefono.trim() || !aeronaveInteres.trim()) {
      setError("Completa todos los campos para enviar la solicitud.");
      return;
    }

    setGuardando(true);
    const { error: insertError } = await supabase.from("solicitudes_aeronova").insert([{
      nombre_completo: nombreCompleto.trim(),
      correo: correo.trim(),
      telefono: telefono.trim(),
      aeronave_interes: aeronaveInteres.trim(),
    }]);
    setGuardando(false);

    if (insertError) {
      setError(insertError.message || "No fue posible guardar la solicitud. Inténtalo de nuevo.");
      return;
    }
    router.push("/resultado");
  };

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <Text style={styles.eyebrow}>SOLICITUD AERONOVA</Text>
        <Text style={styles.title}>Hablemos de tu{ "\n" }próxima aeronave.</Text>
        <Text style={styles.intro}>Déjanos tus datos. Un asesor se pondrá en contacto contigo.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre completo</Text>
          <TextInput style={[styles.input, campoActivo === "nombre" && styles.inputFocused]} placeholder="Ej. María García" placeholderTextColor="#81918D" autoCapitalize="words" value={nombreCompleto} onChangeText={setNombreCompleto} onFocus={() => setCampoActivo("nombre")} onBlur={() => setCampoActivo("")} />

          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput style={[styles.input, campoActivo === "correo" && styles.inputFocused]} placeholder="nombre@correo.com" placeholderTextColor="#81918D" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} value={correo} onChangeText={setCorreo} onFocus={() => setCampoActivo("correo")} onBlur={() => setCampoActivo("")} />

          <Text style={styles.label}>Teléfono</Text>
          <TextInput style={[styles.input, campoActivo === "telefono" && styles.inputFocused]} placeholder="Tu número de contacto" placeholderTextColor="#81918D" keyboardType="phone-pad" value={telefono} onChangeText={setTelefono} onFocus={() => setCampoActivo("telefono")} onBlur={() => setCampoActivo("")} />

          <Text style={styles.label}>Aeronave de interés</Text>
          <TextInput style={[styles.input, styles.lastInput, campoActivo === "aeronave" && styles.inputFocused]} placeholder="Modelo o tipo de aeronave" placeholderTextColor="#81918D" value={aeronaveInteres} onChangeText={setAeronaveInteres} onFocus={() => setCampoActivo("aeronave")} onBlur={() => setCampoActivo("")} />

          {!!error && <View style={styles.errorBanner}><Text style={styles.errorText}>{error}</Text></View>}

          <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed, guardando && styles.buttonDisabled]} onPress={guardar} disabled={guardando}>
            {guardando ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Enviar solicitud  →</Text>}
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, justifyContent: "center", padding: 20, backgroundColor: "#F3F6F4" },
  content: { width: "100%", maxWidth: 480, alignSelf: "center", paddingVertical: 24 },
  eyebrow: { color: "#176C64", fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 12 },
  title: { color: "#102C35", fontSize: 32, lineHeight: 37, fontWeight: "800", marginBottom: 8 },
  intro: { color: "#5F716C", fontSize: 14, lineHeight: 21, marginBottom: 20 },
  card: { padding: 24, backgroundColor: "#FFFFFF", borderRadius: 20, borderWidth: 1, borderColor: "#DCE7E1", shadowColor: "#173A34", shadowOpacity: 0.09, shadowRadius: 20, shadowOffset: { width: 0, height: 9 }, elevation: 4 },
  label: { color: "#203C3A", fontSize: 13, fontWeight: "700", marginBottom: 7, marginTop: 4 },
  input: { minHeight: 50, color: "#102C35", fontSize: 14, paddingHorizontal: 14, paddingVertical: 12, borderRadius: 11, borderWidth: 1, borderColor: "#D3DFD9", backgroundColor: "#FBFCFB", marginBottom: 13, outlineStyle: "none" } as never,
  inputFocused: { borderColor: "#176C64", borderWidth: 1.5 },
  lastInput: { marginBottom: 16 },
  errorBanner: { borderRadius: 11, borderWidth: 1, borderColor: "#EAB8AE", backgroundColor: "#FFF2EF", padding: 11, marginBottom: 12 },
  errorText: { color: "#9C3326", fontSize: 12, lineHeight: 18 },
  button: { minHeight: 53, alignItems: "center", justifyContent: "center", backgroundColor: "#146B67", borderRadius: 11, marginTop: 2 },
  buttonPressed: { opacity: 0.88, transform: [{ scale: 0.99 }] },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
});