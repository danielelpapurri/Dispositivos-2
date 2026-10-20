import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Resultado() {
  const router = useRouter();

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <View style={styles.icon}><Text style={styles.check}>✓</Text></View>
        <Text style={styles.eyebrow}>SOLICITUD RECIBIDA</Text>
        <Text style={styles.title}>Gracias por confiar en Aeronova.</Text>
        <Text style={styles.copy}>Tus datos quedaron guardados. Nuestro equipo se pondrá en contacto contigo pronto.</Text>
        <Pressable style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]} onPress={() => router.push("/registros")}>
          <Text style={styles.buttonText}>Ver solicitudes  →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#F3F6F4" },
  content: { width: "100%", maxWidth: 480, alignSelf: "center", alignItems: "center", padding: 28, borderRadius: 20, borderWidth: 1, borderColor: "#DCE7E1", backgroundColor: "#FFFFFF", shadowColor: "#173A34", shadowOpacity: 0.08, shadowRadius: 20, shadowOffset: { width: 0, height: 9 }, elevation: 3 },
  icon: { width: 62, height: 62, alignItems: "center", justifyContent: "center", borderRadius: 21, backgroundColor: "#E4EEDC", marginBottom: 19 },
  check: { color: "#146B67", fontSize: 33, fontWeight: "800" },
  eyebrow: { color: "#176C64", fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 9 },
  title: { color: "#102C35", fontSize: 27, lineHeight: 33, fontWeight: "800", textAlign: "center", marginBottom: 10 },
  copy: { color: "#657771", fontSize: 14, lineHeight: 22, textAlign: "center", marginBottom: 22 },
  button: { minHeight: 51, width: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "#146B67", borderRadius: 11 },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: "#FFFFFF", fontSize: 14, fontWeight: "800" },
});