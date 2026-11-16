-- Aeronova Garage · Taller final (Anexo A adaptado)
-- Ejecutar en Supabase → SQL Editor → New query.
-- Es seguro ejecutarlo varias veces: no borra la tabla ni duplica filas.

CREATE TABLE IF NOT EXISTS public.catalogo_qr (
  codigo TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  detalle TEXT,
  -- NUMERIC(12,2) solo admite hasta 9.999.999.999,99; los jets (AER-006 a
  -- AER-008) cuestan más, por eso se usa NUMERIC(14,2).
  precio NUMERIC(14,2)
);

-- Si la tabla ya existía con NUMERIC(12,2), se amplía sin perder datos.
ALTER TABLE public.catalogo_qr ALTER COLUMN precio TYPE NUMERIC(14,2);

-- Los códigos deben coincidir EXACTAMENTE con el texto de cada QR.
INSERT INTO public.catalogo_qr (codigo, titulo, descripcion, detalle, precio)
VALUES
  ('AER-001', 'Cessna 172 Skyhawk',
   'Aeronave de demostración. Monomotor de ala alta, popular para turismo y entrenamiento. Verificar disponibilidad y precio antes de publicar.',
   'Referencia de ejemplo: 4 plazas, motor Lycoming, aviónica Garmin. Año, horas de vuelo, matrícula e historial sujetos a confirmación.',
   1650000000),
  ('AER-002', 'Piper PA-28 Archer',
   'Aeronave de demostración. Avión monomotor versátil para vuelos recreativos y formación de pilotos. Verificar disponibilidad y precio antes de publicar.',
   'Referencia de ejemplo: 4 plazas, motor Lycoming, cabina cómoda y aviónica para navegación. Año, horas de vuelo, matrícula e historial sujetos a confirmación.',
   1420000000),
  ('AER-003', 'Cirrus SR22',
   'Aeronave de demostración. Monomotor de alto rendimiento con cabina moderna. Verificar disponibilidad, configuración y precio antes de publicar.',
   'Referencia de ejemplo: 4 plazas, aviónica avanzada y sistema CAPS de paracaídas. Año, versión, horas de vuelo, matrícula e historial sujetos a confirmación.',
   3800000000),
  ('AER-004', 'Beechcraft Bonanza G36',
   'Aeronave de demostración. Monomotor de seis plazas para viajes ejecutivos y familiares. Verificar disponibilidad y precio antes de publicar.',
   'Referencia de ejemplo: motor Continental, cabina de seis plazas y aviónica de navegación. Año, horas de vuelo, matrícula e historial sujetos a confirmación.',
   5900000000),
  ('AER-005', 'Diamond DA40 NG',
   'Aeronave de demostración. Monomotor eficiente, apropiado para entrenamiento y viajes cortos. Verificar disponibilidad y precio antes de publicar.',
   'Referencia de ejemplo: 4 plazas, motor diésel Austro y cabina de materiales compuestos. Año, horas de vuelo, matrícula e historial sujetos a confirmación.',
   1800000000),
  ('AER-006', 'Pilatus PC-12 NGX',
   'Aeronave de demostración. Turbohélice monomotor para transporte ejecutivo y operación regional. Verificar disponibilidad y precio antes de publicar.',
   'Referencia de ejemplo: cabina ejecutiva, aviónica avanzada y capacidad para operar en pistas exigentes. Año, horas de motor, matrícula e historial sujetos a confirmación.',
   13500000000),
  ('AER-007', 'Cessna Citation CJ3+',
   'Aeronave de demostración. Jet ligero para viajes ejecutivos regionales. Verificar disponibilidad, configuración y precio antes de publicar.',
   'Referencia de ejemplo: dos motores turbofán, cabina ejecutiva y aviónica Garmin. Año, horas de motor, ciclos, matrícula e historial sujetos a confirmación.',
   18500000000),
  ('AER-008', 'Embraer Phenom 300E',
   'Aeronave de demostración. Jet ejecutivo ligero para vuelos regionales y corporativos. Verificar disponibilidad, configuración y precio antes de publicar.',
   'Referencia de ejemplo: dos motores turbofán, cabina ejecutiva y aviónica Prodigy Touch. Año, horas de motor, ciclos, matrícula e historial sujetos a confirmación.',
   31000000000)
ON CONFLICT (codigo) DO NOTHING;

-- Catálogo público y solo de lectura para el cliente.
ALTER TABLE public.catalogo_qr ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.catalogo_qr FROM anon, authenticated;
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON TABLE public.catalogo_qr TO anon, authenticated;

DROP POLICY IF EXISTS "lectura_catalogo_publico" ON public.catalogo_qr;
CREATE POLICY "lectura_catalogo_publico"
  ON public.catalogo_qr FOR SELECT
  TO anon, authenticated
  USING (true);

-- Comprobaciones:
SELECT codigo, titulo, precio FROM public.catalogo_qr ORDER BY codigo;
SELECT has_table_privilege('anon', 'public.catalogo_qr', 'SELECT');
