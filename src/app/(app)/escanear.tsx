import { useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  CameraView,
  useCameraPermissions,
  type BarcodeScanningResult,
} from "expo-camera";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

export default function Escanear() {
  const router = useRouter();
  const [permiso, solicitarPermiso] = useCameraPermissions();
  const [escaneado, setEscaneado] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const procesando = useRef(false);

  const leerQR = async ({ data }: BarcodeScanningResult) => {
    // Evita procesar el mismo QR varias veces seguidas.
    if (procesando.current) return;
    procesando.current = true;
    setEscaneado(true);
    setMensaje("");

    const codigo = data.trim();

    // Los QR de Aeronova guardan códigos cortos como AER-001,
    // NO direcciones web ni datos personales.
    if (!/^[A-Za-z0-9_-]{1,50}$/.test(codigo)) {
      setMensaje("Código QR no válido para este catálogo.");
      return;
    }

    try {
      const { data: aeronave, error } = await supabase
        .from("catalogo_qr")
        .select("codigo")
        .eq("codigo", codigo)
        .maybeSingle();

      if (error) throw error;

      if (!aeronave) {
        setMensaje(`Código leído (${codigo}), pero la aeronave no existe.`);
        return;
      }

      // replace evita volver a una cámara bloqueada al retroceder.
      router.replace({
        pathname: "/detalle-item",
        params: { codigo: aeronave.codigo },
      });
    } catch (e) {
      console.error("Error al consultar QR:", e);
      setMensaje("No se pudo consultar Supabase.");
    }
  };

  function reintentar() {
    procesando.current = false;
    setEscaneado(false);
    setMensaje("");
  }

  if (!permiso) {
    return (
      <View style={styles.centro}>
        <Text style={styles.texto}>Verificando permiso de cámara...</Text>
      </View>
    );
  }

  if (!permiso.granted) {
    return (
      <View style={styles.centro}>
        <Text style={styles.titulo}>Se necesita la cámara</Text>
        <Text style={styles.texto}>Concede el permiso para leer el QR de la aeronave.</Text>
        <Pressable style={styles.boton} onPress={solicitarPermiso}>
          <Text style={styles.botonTexto}>Permitir cámara</Text>
        </Pressable>
        {!permiso.canAskAgain && (
          <Text style={styles.error}>
            Habilita el permiso de cámara en Ajustes del celular.
          </Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escanear aeronave</Text>
      <Text style={styles.texto}>Apunta al QR impreso o en otra pantalla.</Text>
      <View style={styles.marcoCamara}>
        <CameraView
          style={styles.camara}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={escaneado ? undefined : leerQR}
        />
      </View>
      {!!mensaje && <Text style={styles.error}>{mensaje}</Text>}
      {escaneado && (
        <Pressable style={styles.boton} onPress={reintentar}>
          <Text style={styles.botonTexto}>Escanear de nuevo</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 18, backgroundColor: "#F4F7F8" },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", padding: 25, backgroundColor: "#F4F7F8" },
  titulo: { fontSize: 25, fontWeight: "bold", color: "#092536", textAlign: "center", marginBottom: 10 },
  texto: { color: "#607580", textAlign: "center", marginBottom: 16 },
  marcoCamara: { flex: 1, borderRadius: 18, overflow: "hidden", borderWidth: 3, borderColor: "#D7B56D", marginBottom: 14 },
  camara: { flex: 1 },
  boton: { backgroundColor: "#B17C2F", padding: 15, borderRadius: 13, alignItems: "center", marginTop: 10, alignSelf: "stretch" },
  botonTexto: { color: "white", fontWeight: "bold" },
  error: { color: "#9E2730", textAlign: "center", marginVertical: 12, fontWeight: "bold" },
});
