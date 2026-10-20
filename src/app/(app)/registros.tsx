import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { supabase } from "../../lib/supabase";

type Solicitud = {
  id: number;
  nombre_completo: string;
  correo: string;
  telefono: string;
  aeronave_interes: string;
  created_at: string;
};

const consultarSolicitudes = () => supabase
  .from("solicitudes_aeronova")
  .select("*")
  .order("created_at", { ascending: false });

export default function Registros() {
  const [registros, setRegistros] = useState<Solicitud[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarRegistros = useCallback(async () => {
    setCargando(true);
    setError("");
    const { data, error: queryError } = await consultarSolicitudes();

    if (queryError) {
      setError(queryError.message || "No fue posible cargar las solicitudes.");
    } else {
      setRegistros(data ?? []);
    }
    setCargando(false);
  }, []);

  useEffect(() => {
    let activo = true;
    void consultarSolicitudes().then(({ data, error: queryError }) => {
      if (!activo) return;
      if (queryError) {
        setError(queryError.message || "No fue posible cargar las solicitudes.");
      } else {
        setRegistros(data ?? []);
      }
      setCargando(false);
    });

    return () => {
      activo = false;
    };
  }, [cargarRegistros]);

  const fecha = (value: string) => new Date(value).toLocaleString("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>AERONOVA GARAGE</Text>
            <Text style={styles.title}>Solicitudes</Text>
            <Text style={styles.subtitle}>Contactos interesados en nuestras aeronaves</Text>
          </View>
          <Pressable style={({ pressed }) => [styles.reload, pressed && styles.pressed]} onPress={() => void cargarRegistros()} accessibilityRole="button" accessibilityLabel="Recargar solicitudes" disabled={cargando}>
            <Text style={styles.reloadIcon}>↻</Text>
          </Pressable>
        </View>

        {!!error && <View style={styles.errorBanner}><Text style={styles.errorText}>{error}</Text></View>}
        <Text style={styles.count}>{registros.length} {registros.length === 1 ? "solicitud" : "solicitudes"}</Text>

        {cargando ? (
          <View style={styles.state}><ActivityIndicator size="large" color="#146B67" /><Text style={styles.stateText}>Consultando Supabase...</Text></View>
        ) : (
          <FlatList
            data={registros}
            keyExtractor={(item) => String(item.id)}
            contentContainerStyle={registros.length === 0 ? styles.emptyList : styles.list}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardTop}>
                  <View style={styles.avatar}><Text style={styles.avatarText}>{item.nombre_completo.trim().charAt(0).toUpperCase()}</Text></View>
                  <View style={styles.person}>
                    <Text style={styles.name}>{item.nombre_completo}</Text>
                    <Text style={styles.date}>{fecha(item.created_at)}</Text>
                  </View>
                </View>
                <View style={styles.divider} />
                <Text style={styles.detail}><Text style={styles.detailLabel}>Correo  </Text>{item.correo}</Text>
                <Text style={styles.detail}><Text style={styles.detailLabel}>Teléfono  </Text>{item.telefono}</Text>
                <Text style={styles.detail}><Text style={styles.detailLabel}>Aeronave  </Text>{item.aeronave_interes}</Text>
              </View>
            )}
            ListEmptyComponent={<View style={styles.empty}><Text style={styles.emptyTitle}>Todavía no hay solicitudes</Text><Text style={styles.emptyText}>Las nuevas solicitudes aparecerán aquí.</Text></View>}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 20, backgroundColor: "#F3F6F4" },
  content: { width: "100%", maxWidth: 760, alignSelf: "center", flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 19 },
  headerText: { flex: 1, minWidth: 0 },
  eyebrow: { color: "#176C64", fontSize: 10, fontWeight: "800", letterSpacing: 1.2, marginBottom: 5 },
  title: { color: "#102C35", fontSize: 30, fontWeight: "800" },
  subtitle: { color: "#687A74", fontSize: 13, marginTop: 4 },
  reload: { width: 46, height: 46, alignItems: "center", justifyContent: "center", borderRadius: 14, borderWidth: 1, borderColor: "#D6E1DB", backgroundColor: "#FFFFFF", marginLeft: 14 },
  reloadIcon: { color: "#146B67", fontSize: 27, lineHeight: 31 },
  pressed: { opacity: 0.7 },
  errorBanner: { borderRadius: 11, borderWidth: 1, borderColor: "#EAB8AE", backgroundColor: "#FFF2EF", padding: 12, marginBottom: 12 },
  errorText: { color: "#9C3326", fontSize: 13, lineHeight: 19 },
  count: { color: "#657771", fontSize: 12, fontWeight: "700", marginBottom: 12 },
  list: { paddingBottom: 20 },
  emptyList: { flexGrow: 1, justifyContent: "center" },
  card: { padding: 18, borderRadius: 16, borderWidth: 1, borderColor: "#DCE7E1", backgroundColor: "#FFFFFF", marginBottom: 12, shadowColor: "#173A34", shadowOpacity: 0.05, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  cardTop: { flexDirection: "row", alignItems: "center" },
  avatar: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: "#E4EEDC", marginRight: 12 },
  avatarText: { color: "#146B67", fontSize: 17, fontWeight: "800" },
  person: { flex: 1, minWidth: 0 },
  name: { color: "#102C35", fontSize: 16, fontWeight: "800" },
  date: { color: "#7B8C85", fontSize: 11, marginTop: 4 },
  divider: { height: 1, backgroundColor: "#E8EEEA", marginVertical: 13 },
  detail: { color: "#4D625B", fontSize: 13, lineHeight: 21 },
  detailLabel: { color: "#81918A", fontWeight: "700" },
  state: { flex: 1, alignItems: "center", justifyContent: "center", gap: 10 },
  stateText: { color: "#657771", fontSize: 13 },
  empty: { alignItems: "center", padding: 28, borderRadius: 16, borderWidth: 1, borderColor: "#DCE7E1", backgroundColor: "#FFFFFF" },
  emptyTitle: { color: "#102C35", fontSize: 16, fontWeight: "800", textAlign: "center" },
  emptyText: { color: "#71827B", fontSize: 13, textAlign: "center", marginTop: 6 },
});