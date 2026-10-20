import { Session } from "@supabase/supabase-js";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { supabase } from "../lib/supabase";

type AuthContextType = {
  session: Session | null;
  cargando: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  cargando: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setCargando(false);
    });

    let activo = true;
    void supabase.auth
      .getSession()
      .then(({ data, error }) => {
        if (error) {
          console.error("No se pudo recuperar la sesión de Supabase:", error);
          return;
        }
        if (activo) {
          setSession(data.session);
        }
      })
      .catch((error: unknown) => {
        console.error("No se pudo recuperar la sesión de Supabase:", error);
      })
      .finally(() => {
        if (activo) {
          setCargando(false);
        }
      });

    return () => {
      activo = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ session, cargando }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}