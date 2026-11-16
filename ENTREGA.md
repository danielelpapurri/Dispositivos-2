# Entrega · Taller final · Aeronova Garage

App Expo (SDK 58) + expo-router + Supabase. Funcionalidad nueva: catálogo, ficha de aeronave y escáner QR que consulta la tabla `public.catalogo_qr`.

Integrantes: Daniel y Helde.

---

## 1. Cómo correr el proyecto

1. Crear `.env.local` a partir de `.env.example` con la URL y la clave pública de Supabase.
2. En Supabase → SQL Editor, ejecutar `supabase/catalogo_qr.sql` (crea o completa la tabla, aplica RLS de solo lectura y muestra las comprobaciones).
3. Instalar dependencias: `npm install`
4. Generar los QR de prueba: `npm run qr` (los crea en `assets/qr/`).
5. Iniciar: `npx expo start -c`
6. En el celular Android abrir **Expo Go para SDK 58** (el de Google Play) y escanear el QR de la terminal.
   - El proyecto usa `"expo": "~58.0.23"`; en Expo Go, Settings → System Information debe decir **Expo SDK 58**.
   - El QR de la terminal ABRE la app; no es el QR de un producto.
7. Iniciar sesión (las pantallas del catálogo están en el grupo protegido `(app)`).
8. Abrir `assets/qr/hoja-qr.html` en el computador para mostrar los QR en pantalla, o imprimirla.

---

## 2. Prueba completa (apartado 9 de la guía)

| # | Acción | Resultado esperado |
|---|---|---|
| 1 | `npx expo start -c` y abrir en Expo Go | Abre el Login; tras iniciar sesión, Inicio |
| 2 | Inicio → **Catálogo interactivo** | Lista de aeronaves de `catalogo_qr` ordenadas por código |
| 3 | Tocar **Ver detalles** en una aeronave | Ficha con título, descripción, detalle técnico y precio |
| 4 | Volver a Inicio → **Escanear código QR** | Pide permiso de cámara → **Permitir cámara** |
| 5 | Enfocar el QR **AER-001** | Abre la ficha del **Cessna 172 Skyhawk** |
| 6 | **Escanear otra aeronave** → QR **AER-003** | Abre la ficha del **Cirrus SR22** |
| 7 | **Escanear otra aeronave** → QR **QR-TRAMPA** | Mensaje: *Código leído (QR-TRAMPA), pero el producto no existe.* y botón **Escanear de nuevo** |
| 8 | Si algo falla | Revisar la consola de Metro y el mensaje exacto de Supabase |

Errores frecuentes:
- Catálogo vacío o *permission denied* → ejecutar `supabase/catalogo_qr.sql`.
- *Project is incompatible with this version of Expo Go* → usar Expo Go SDK 58.
- El QR no abre la ficha → el texto del QR debe ser EXACTAMENTE el `codigo` (ej. `AER-001`).

---

## 3. Guion del video (máx. 5 minutos)

[Corchetes] = lo que se muestra. Comillas = lo que se dice.

### 3.1 Presentación · 0:00 – 0:30 (Daniel y Helde)
[Los dos en cámara o la app en Inicio]

**Daniel:** "Hola, profe. Soy Daniel Cabezas."
**Helde:** "Y yo soy Helde. Este es nuestro taller final."
**Daniel:** "Nuestra app se llama Aeronova Garage, para la compra y venta de aviones. Está hecha con React Native, Expo SDK 58 y Supabase."
**Helde:** "Ya tenía login, formulario de solicitudes, galería, contacto y vuelos de prueba. Ahora le agregamos un catálogo interactivo y un escáner QR: se apunta la cámara al QR de un avión y la app abre su ficha desde Supabase."

### 3.2 Código · 0:30 – 2:40

**Daniel · conexión, rutas e Inicio (0:30 – 1:20)**
- [`src/lib/supabase.ts` línea 38] "Con `createClient` creamos el cliente de Supabase con la URL y la clave pública del `.env.local`."
- [`src/app/(app)/_layout.tsx` líneas 24–26] "Como la app tiene rutas protegidas, registramos `catalogo`, `detalle-item` y `escanear` dentro del `Stack` del grupo privado `(app)`."
- [`src/app/(app)/index.tsx` líneas 150, 158 y 175] "En Inicio agregamos dos botones sin borrar los anteriores: `router.push("/catalogo")` y `router.push("/escanear")`."

**Daniel · catálogo (1:20 – 1:50)**
- [`catalogo.tsx` líneas 40–42] "Consultamos `catalogo_qr` con `select` de código, título, descripción, detalle y precio, ordenado por código. Es un SELECT ... ORDER BY."
- [línea 77 y línea 121] "Mostramos los resultados con un `FlatList`, y 'Ver detalles' hace `router.push` a `detalle-item` con el `codigo` como parámetro."

**Helde · detalle (1:50 – 2:10)**
- [`detalle-item.tsx` línea 29 y líneas 47–50] "Con `useLocalSearchParams` recibimos el `codigo`, venga del catálogo o del escáner, y consultamos una sola fila con `.eq("codigo", codigo)` y `.maybeSingle()`. Si existe mostramos la ficha; si no, un mensaje de que no se encontró."

**Helde · escáner (2:10 – 2:40)**
- [`escanear.tsx` línea 13, líneas 95–99] "Instalamos `expo-camera`. `useCameraPermissions` pide el permiso. `CameraView` usa la cámara trasera, lee solo QR y, al detectar uno, `onBarcodeScanned` llama a `leerQR`."
- [líneas 21, 29, 36–39, 44 y 49] "En `leerQR` bloqueamos con `procesando` para no leer el mismo QR varias veces, validamos que sea un código corto, lo buscamos en `catalogo_qr` y, si existe, `router.replace` abre la ficha. Si no existe, mostramos 'el producto no existe' y el botón 'Escanear de nuevo'."

### 3.3 Interfaz · 2:40 – 3:30 (Daniel)
[Celular grabado, en Inicio]
- "Esta es la pantalla de Inicio con la sección nueva Catálogo QR."
- [Catálogo interactivo, hacer scroll] "Aquí aparecen las aeronaves de la tabla `catalogo_qr` con su código y su precio."
- [Ver detalles en AER-002] "Abrimos el Piper PA-28 Archer: descripción, detalle técnico y precio, todo desde Supabase."
- [Volver a Inicio]

### 3.4 Escaneo real desde el celular · 3:30 – 4:35 (Helde y Daniel)
[QR en el computador con `assets/qr/hoja-qr.html` o impresos]
- **Helde:** [Escanear código QR → Permitir cámara] "La primera vez la app pide permiso de cámara."
- **Helde:** [Apuntar a AER-001] "Este QR solo guarda el texto AER-001, sin URL ni datos del avión... y se abrió la ficha del Cessna 172 Skyhawk."
- **Daniel:** [Escanear otra aeronave → AER-003] "Probamos otro: AER-003... y nos muestra el Cirrus SR22, el producto correcto."
- **Helde:** [Escanear otra aeronave → QR-TRAMPA] "Ahora el caso de error: QR-TRAMPA no existe en la base de datos. La app lo lee, consulta Supabase y muestra 'el producto no existe' con el botón 'Escanear de nuevo'."
- **Helde:** [Escanear de nuevo → AER-001] "Y vuelve a funcionar normal."

### 3.5 Cierre · 4:35 – 4:55 (los dos)
**Daniel:** "En resumen: el catálogo hace un SELECT a Supabase y lo muestra en un FlatList, el detalle consulta una aeronave por su código y el escáner usa CameraView para leer el QR y abrir la ficha correcta."
**Helde:** "La tabla `catalogo_qr` tiene RLS de solo lectura porque son datos públicos de aviones, no datos personales. Muchas gracias, profe."

---

## 4. Checklist de entrega

- [ ] `supabase/catalogo_qr.sql` ejecutado; la comprobación `has_table_privilege` devuelve `true`.
- [ ] Catálogo muestra los registros (1,0).
- [ ] Ver detalles abre el producto correcto (1,0).
- [ ] Escáner funciona con la cámara real del celular (1,0).
- [ ] QR válido (mín. 3: AER-001, AER-002, AER-003) e inexistente (QR-TRAMPA) con manejo de error (1,0).
- [ ] Video ≤ 5 min con los dos integrantes, mostrando código, interfaz y escaneo real (1,0).
- [ ] Enlace del video compartido con permiso de visualización.
