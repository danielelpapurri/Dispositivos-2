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

export default function Registro() {
  const router = useRouter();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [nombreCompleto, setNombreCompleto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [aeronaveInteres, setAeronaveInteres] = useState("");
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

      const { error } = await supabase.auth.signUp({
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
        setMensaje(error.message);
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
        setMensaje(
          `La cuenta se creó, pero no se pudo guardar la solicitud: ${insertError.message}`,
        );
        return;
      }

      setRegistroCompleto(true);
      setMensaje("Cuenta creada y solicitud guardada correctamente.");
    } catch (error) {
      setMensaje(
        error instanceof Error ? error.message : String(error),
      );
    } finally {
      setGuardando(false);
    }
  };

  return (
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

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombreCompleto}
        onChangeText={setNombreCompleto}
        autoCapitalize="words"
      />

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
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        placeholder="Avión de interés (ej. Cessna 172)"
        value={aeronaveInteres}
        onChangeText={setAeronaveInteres}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

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
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#F4F7F8" },
  logo: { fontSize: 56, textAlign: "center", color: "#B17C2F" },
  marca: { color: "#B17C2F", fontSize: 12, fontWeight: "bold", letterSpacing: 2, textAlign: "center", marginTop: 8 },
  titulo: { fontSize: 28, fontWeight: "bold", color: "#092536", textAlign: "center", marginTop: 8 },
  subtitulo: { color: "#607580", textAlign: "center", marginTop: 8, marginBottom: 24, lineHeight: 21 },
  input: { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: "#D8E1E4", borderRadius: 14, padding: 14, marginBottom: 14 },
  boton: { backgroundColor: "#092536", padding: 15, borderRadius: 14, alignItems: "center" },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold" },
  enlace: { color: "#092536", textAlign: "center", marginTop: 18, fontWeight: "600" },
  error: { color: "#9C2F36", textAlign: "center", marginBottom: 14, lineHeight: 20 },
  exito: { color: "#26734D", textAlign: "center", marginBottom: 14, lineHeight: 20 },
});
