import { CameraView, useCameraPermissions } from "expo-camera";
import { useFocusEffect, useIsFocused, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Escanear() {
  const router = useRouter();
  const enfocada = useIsFocused();
  const [permiso, solicitarPermiso] = useCameraPermissions();
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const escaneoProcesado = useRef(false);

  useFocusEffect(
    useCallback(() => {
      escaneoProcesado.current = false;
      return () => {
        escaneoProcesado.current = true;
      };
    }, []),
  );

  const abrirAeronave = (valor: string) => {
    const codigoEscaneado = valor.trim();
    if (!codigoEscaneado) {
      setError("Ingresa o escanea el código de una aeronave.");
      return;
    }

    escaneoProcesado.current = true;
    setError("");
    router.push({
      pathname: "/detalle",
      params: { codigo: codigoEscaneado },
    });
  };

  const escanearCodigo = ({ data }: { data: string }) => {
    if (escaneoProcesado.current) {
      return;
    }
    abrirAeronave(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Escanea una aeronave</Text>
      <Text style={styles.subtitulo}>
        Apunta la cámara a un código QR que contenga el código de la aeronave en
        el catálogo.
      </Text>

      {permiso === null ? (
        <View style={styles.estado}>
          <ActivityIndicator size="large" color="#B17C2F" />
          <Text style={styles.estadoTexto}>Verificando permiso de cámara...</Text>
        </View>
      ) : permiso.granted ? (
        <View style={styles.cameraCaja}>
          {enfocada ? (
            <CameraView
              style={styles.camera}
              facing="back"
              barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
              onBarcodeScanned={escanearCodigo}
            />
          ) : null}
          <View pointerEvents="none" style={styles.marco}>
            <View style={styles.esquinaSuperiorIzquierda} />
            <View style={styles.esquinaSuperiorDerecha} />
            <View style={styles.esquinaInferiorIzquierda} />
            <View style={styles.esquinaInferiorDerecha} />
          </View>
        </View>
      ) : (
        <View style={styles.permisoCaja}>
          <Text style={styles.estadoTexto}>
            Para escanear códigos QR, permite el acceso a la cámara.
          </Text>
          <Pressable
            style={styles.boton}
            onPress={() => void solicitarPermiso()}
          >
            <Text style={styles.botonTexto}>Permitir cámara</Text>
          </Pressable>
        </View>
      )}

      <Text style={styles.ayuda}>
        También puedes buscar la aeronave escribiendo su código.
      </Text>
      <View style={styles.filaCodigo}>
        <TextInput
          style={styles.input}
          placeholder="Código de aeronave"
          placeholderTextColor="#78909A"
          value={codigo}
          onChangeText={setCodigo}
          autoCapitalize="none"
          onSubmitEditing={() => abrirAeronave(codigo)}
          returnKeyType="search"
        />
        <Pressable
          style={styles.botonBuscar}
          onPress={() => abrirAeronave(codigo)}
          accessibilityRole="button"
        >
          <Text style={styles.botonTexto}>Buscar</Text>
        </Pressable>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Pressable style={styles.volver} onPress={() => router.back()}>
        <Text style={styles.volverTexto}>Volver al catálogo</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F8",
    padding: 20,
  },
  titulo: {
    color: "#092536",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitulo: {
    color: "#607580",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 18,
    textAlign: "center",
  },
  cameraCaja: {
    width: "100%",
    height: 300,
    backgroundColor: "#092536",
    borderRadius: 18,
    overflow: "hidden",
    alignSelf: "center",
  },
  camera: { flex: 1 },
  marco: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
  },
  esquinaSuperiorIzquierda: {
    position: "absolute",
    width: 48,
    height: 48,
    top: "27%",
    left: "15%",
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#D7B56D",
    borderTopLeftRadius: 10,
  },
  esquinaSuperiorDerecha: {
    position: "absolute",
    width: 48,
    height: 48,
    top: "27%",
    right: "15%",
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "#D7B56D",
    borderTopRightRadius: 10,
  },
  esquinaInferiorIzquierda: {
    position: "absolute",
    width: 48,
    height: 48,
    bottom: "27%",
    left: "15%",
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#D7B56D",
    borderBottomLeftRadius: 10,
  },
  esquinaInferiorDerecha: {
    position: "absolute",
    width: 48,
    height: 48,
    bottom: "27%",
    right: "15%",
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#D7B56D",
    borderBottomRightRadius: 10,
  },
  estado: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
  },
  estadoTexto: {
    color: "#607580",
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    textAlign: "center",
  },
  permisoCaja: {
    minHeight: 180,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#E5EDF0",
    borderRadius: 18,
  },
  boton: {
    backgroundColor: "#092536",
    borderRadius: 12,
    marginTop: 14,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  botonBuscar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#092536",
    borderRadius: 12,
    paddingHorizontal: 18,
  },
  botonTexto: { color: "#FFFFFF", fontWeight: "bold" },
  ayuda: {
    color: "#607580",
    fontSize: 13,
    marginTop: 18,
    marginBottom: 8,
  },
  filaCodigo: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    minWidth: 0,
    backgroundColor: "#FFFFFF",
    borderColor: "#D8E1E4",
    borderRadius: 12,
    borderWidth: 1,
    color: "#092536",
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  error: {
    color: "#9C2F36",
    fontSize: 13,
    marginTop: 10,
    textAlign: "center",
  },
  volver: { alignItems: "center", marginTop: 20, padding: 10 },
  volverTexto: { color: "#176C64", fontWeight: "bold" },
});
