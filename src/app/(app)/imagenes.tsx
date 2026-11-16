import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  aeronaveDemo,
  type AeronaveCatalogo,
} from "../../lib/aeronaveDemo";
import { getErrorMessage } from "../../lib/errorMessage";
import { supabase } from "../../lib/supabase";

export default function Imagenes() {
  const router = useRouter();
  const [aeronaves, setAeronaves] = useState<AeronaveCatalogo[]>([
    aeronaveDemo,
  ]);
  const [busqueda, setBusqueda] = useState("");
  const [cargando, setCargando] = useState(true);
  const [actualizando, setActualizando] = useState(false);
  const [errorTexto, setErrorTexto] = useState("");
  const [versionCatalogo, setVersionCatalogo] = useState(0);

  useEffect(() => {
    let activa = true;

    const cargarCatalogo = async () => {
      try {
        const { data, error } = await supabase
          .from("catalogo")
          .select("codigo, titulo, descripcion, detalle, precio")
          .order("titulo", { ascending: true });

        if (error) {
          throw error;
        }

        if (activa) {
          const aeronavesSupabase = data ?? [];
          setAeronaves(
            aeronavesSupabase.some(
              (item) => String(item.codigo) === String(aeronaveDemo.codigo),
            )
              ? aeronavesSupabase
              : [...aeronavesSupabase, aeronaveDemo],
          );
          setErrorTexto("");
        }
      } catch (error) {
        if (activa) {
          setAeronaves([aeronaveDemo]);
          setErrorTexto(getErrorMessage(error));
        }
      } finally {
        if (activa) {
          setCargando(false);
          setActualizando(false);
        }
      }
    };

    void cargarCatalogo();

    return () => {
      activa = false;
    };
  }, [versionCatalogo]);

  const aeronavesFiltradas = useMemo(() => {
    const termino = busqueda.trim().toLocaleLowerCase("es-CO");
    if (!termino) {
      return aeronaves;
    }

    return aeronaves.filter((aeronave) =>
      [
        aeronave.titulo,
        aeronave.descripcion,
        aeronave.detalle,
        String(aeronave.codigo),
      ]
        .filter((valor): valor is string => Boolean(valor))
        .some((valor) => valor.toLocaleLowerCase("es-CO").includes(termino)),
    );
  }, [aeronaves, busqueda]);

  const actualizarCatalogo = () => {
    setErrorTexto("");
    setActualizando(true);
    setVersionCatalogo((version) => version + 1);
  };

  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={styles.container}
      data={aeronavesFiltradas}
      keyExtractor={(item) => String(item.codigo)}
      refreshControl={
        <RefreshControl
          refreshing={actualizando}
          onRefresh={actualizarCatalogo}
          tintColor="#B17C2F"
          colors={["#B17C2F"]}
        />
      }
      ListHeaderComponent={
        <View>
          <View style={styles.portada}>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=85",
              }}
              style={styles.imagenPortada}
              contentFit="cover"
            />
            <View style={styles.portadaTexto}>
              <Text style={styles.portadaEtiqueta}>AERONOVA GARAGE</Text>
              <Text style={styles.portadaTitulo}>
                Encuentra tu próxima aeronave
              </Text>
            </View>
          </View>

          <Text style={styles.eyebrow}>INVENTARIO DE AERONAVES</Text>
          <Text style={styles.titulo}>Aviones en venta</Text>
          <Text style={styles.subtitulo}>
            Explora las aeronaves registradas y escanea su código QR para abrir
            la ficha completa.
          </Text>

          <View style={styles.resumen}>
            <Text style={styles.resumenNumero}>{aeronaves.length}</Text>
            <Text style={styles.resumenTexto}>
              {aeronaves.length === 1
                ? "aeronave disponible"
                : "aeronaves disponibles"}
            </Text>
          </View>

          <View style={styles.acciones}>
            <Pressable
              style={({ pressed }) => [
                styles.botonCamara,
                pressed && styles.botonPresionado,
              ]}
              onPress={() => router.push("/escanear")}
              accessibilityRole="button"
            >
              <Text style={styles.botonCamaraIcono}>▣</Text>
              <Text style={styles.botonCamaraTexto}>Escanear código QR</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.botonActualizar,
                pressed && styles.botonPresionado,
              ]}
              onPress={actualizarCatalogo}
              disabled={actualizando}
              accessibilityRole="button"
            >
              {actualizando ? (
                <ActivityIndicator color="#092536" />
              ) : (
                <Text style={styles.botonActualizarTexto}>
                  Actualizar catálogo
                </Text>
              )}
            </Pressable>
          </View>

          <TextInput
            style={styles.busqueda}
            placeholder="Buscar por modelo, código o descripción"
            placeholderTextColor="#78909A"
            value={busqueda}
            onChangeText={setBusqueda}
            autoCapitalize="none"
            accessibilityLabel="Buscar aeronaves"
          />
          {errorTexto ? (
            <View style={styles.errorCaja}>
              <Text style={styles.errorTexto}>{errorTexto}</Text>
              <Pressable onPress={actualizarCatalogo}>
                <Text style={styles.reintentar}>Reintentar</Text>
              </Pressable>
            </View>
          ) : null}
          {cargando ? (
            <View style={styles.centro}>
              <ActivityIndicator size="large" color="#B17C2F" />
              <Text style={styles.estadoTexto}>Consultando inventario...</Text>
            </View>
          ) : null}
        </View>
      }
      ListEmptyComponent={
        !cargando ? (
          <View style={styles.vacioCaja}>
            <Text style={styles.vacioIcono}>✈</Text>
            <Text style={styles.vacioTitulo}>
              {errorTexto
                ? "No se pudo cargar el inventario"
                : busqueda
                  ? "No encontramos coincidencias"
                  : "Aún no hay aeronaves registradas"}
            </Text>
            <Text style={styles.estadoTexto}>
              {busqueda
                ? "Prueba con otro modelo o código."
                : "El catálogo también incluye una aeronave de demostración local."}
            </Text>
          </View>
        ) : undefined
      }
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [
            styles.card,
            pressed && styles.cardPresionado,
          ]}
          onPress={() =>
            router.push({
              pathname: "/detalle",
              params: { codigo: String(item.codigo) },
            })
          }
          accessibilityRole="button"
          accessibilityLabel={`Ver detalles de ${item.titulo}`}
        >
          <View style={styles.iconoCaja}>
            <Text style={styles.icono}>✈</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.codigo}>CÓDIGO {String(item.codigo)}</Text>
            <Text style={styles.nombre}>{item.titulo}</Text>
            {item.descripcion ? (
              <Text style={styles.descripcion} numberOfLines={3}>
                {item.descripcion}
              </Text>
            ) : null}
            {item.detalle ? (
              <Text style={styles.detalle} numberOfLines={2}>
                {item.detalle}
              </Text>
            ) : null}
            <View style={styles.filaPie}>
              <Text style={styles.precio}>
                {item.precio === null || item.precio === undefined
                  ? "Precio a consultar"
                  : formatearPrecio(item.precio)}
              </Text>
              <Text style={styles.enlace}>Ver ficha →</Text>
            </View>
          </View>
        </Pressable>
      )}
    />
  );
}

function formatearPrecio(precio: number | string) {
  const valor = Number(precio);
  if (!Number.isFinite(valor)) {
    return `COP ${precio}`;
  }

  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}

const styles = StyleSheet.create({
  lista: { flex: 1, backgroundColor: "#EEF3F4" },
  container: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 920,
    alignSelf: "center",
    padding: 20,
  },
  portada: {
    height: 190,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 22,
    elevation: 4,
  },
  imagenPortada: { width: "100%", height: "100%" },
  portadaTexto: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    backgroundColor: "rgba(9, 37, 54, 0.78)",
  },
  portadaEtiqueta: {
    color: "#D7B56D",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 5,
  },
  portadaTitulo: { color: "#FFFFFF", fontSize: 22, fontWeight: "bold" },
  eyebrow: {
    color: "#B17C2F",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  titulo: { color: "#092536", fontSize: 30, fontWeight: "bold", marginBottom: 8 },
  subtitulo: {
    color: "#607580",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 18,
  },
  resumen: {
    backgroundColor: "#092536",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    elevation: 2,
  },
  resumenNumero: {
    color: "#D7B56D",
    fontSize: 24,
    fontWeight: "bold",
    marginRight: 10,
  },
  resumenTexto: { color: "#E7EFF1", fontSize: 13 },
  acciones: { gap: 10, marginBottom: 14 },
  botonCamara: {
    backgroundColor: "#092536",
    borderRadius: 14,
    minHeight: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  botonCamaraIcono: {
    color: "#D7B56D",
    fontSize: 20,
    marginRight: 9,
  },
  botonCamaraTexto: { color: "#FFFFFF", fontWeight: "bold" },
  botonActualizar: {
    backgroundColor: "#E1E9EB",
    borderRadius: 14,
    minHeight: 46,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  botonActualizarTexto: { color: "#092536", fontWeight: "bold" },
  botonPresionado: { opacity: 0.78 },
  busqueda: {
    backgroundColor: "#FFFFFF",
    borderColor: "#D8E1E4",
    borderRadius: 12,
    borderWidth: 1,
    color: "#092536",
    fontSize: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  errorCaja: {
    backgroundColor: "#FFF1F0",
    borderRadius: 12,
    padding: 13,
    marginBottom: 14,
  },
  errorTexto: { color: "#9C2F36", fontSize: 13, lineHeight: 19 },
  reintentar: {
    color: "#092536",
    fontWeight: "bold",
    marginTop: 8,
    textDecorationLine: "underline",
  },
  centro: { alignItems: "center", paddingVertical: 24 },
  estadoTexto: {
    color: "#607580",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
  },
  vacioCaja: { alignItems: "center", padding: 24 },
  vacioIcono: { color: "#B17C2F", fontSize: 38 },
  vacioTitulo: {
    color: "#092536",
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#D8E1E4",
    flexDirection: "row",
    alignItems: "flex-start",
    elevation: 3,
  },
  cardPresionado: { opacity: 0.8, transform: [{ scale: 0.99 }] },
  iconoCaja: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#E5EDF0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  icono: { color: "#092536", fontSize: 25 },
  info: { flex: 1, minWidth: 0 },
  codigo: {
    color: "#B17C2F",
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 5,
  },
  nombre: {
    color: "#092536",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  descripcion: { color: "#607580", fontSize: 13, lineHeight: 19 },
  detalle: { color: "#607580", fontSize: 12, lineHeight: 18, marginTop: 5 },
  filaPie: {
    borderTopColor: "#E5EDF0",
    borderTopWidth: 1,
    marginTop: 12,
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },
  precio: { color: "#176C64", fontSize: 14, fontWeight: "bold" },
  enlace: { color: "#B17C2F", fontSize: 13, fontWeight: "bold" },
});
