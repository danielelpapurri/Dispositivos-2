WITH aeronaves (
  codigo,
  titulo,
  descripcion,
  detalle,
  precio
) AS (
  VALUES
    (
      'AER-001',
      'Cessna 172 Skyhawk',
      'Aeronave de demostración. Monomotor de ala alta, popular para turismo y entrenamiento. Verificar disponibilidad y precio antes de publicar.',
      'Referencia de ejemplo: 4 plazas, motor Lycoming, aviónica Garmin. Año, horas de vuelo, matrícula e historial sujetos a confirmación.',
      1650000000::numeric
    ),
    (
      'AER-002',
      'Piper PA-28 Archer',
      'Aeronave de demostración. Avión monomotor versátil para vuelos recreativos y formación de pilotos. Verificar disponibilidad y precio antes de publicar.',
      'Referencia de ejemplo: 4 plazas, motor Lycoming, cabina cómoda y aviónica para navegación. Año, horas de vuelo, matrícula e historial sujetos a confirmación.',
      1420000000::numeric
    ),
    (
      'AER-003',
      'Cirrus SR22',
      'Aeronave de demostración. Monomotor de alto rendimiento con cabina moderna. Verificar disponibilidad, configuración y precio antes de publicar.',
      'Referencia de ejemplo: 4 plazas, aviónica avanzada y sistema CAPS de paracaídas. Año, versión, horas de vuelo, matrícula e historial sujetos a confirmación.',
      3800000000::numeric
    ),
    (
      'AER-004',
      'Beechcraft Bonanza G36',
      'Aeronave de demostración. Monomotor de seis plazas para viajes ejecutivos y familiares. Verificar disponibilidad y precio antes de publicar.',
      'Referencia de ejemplo: motor Continental, cabina de seis plazas y aviónica de navegación. Año, horas de vuelo, matrícula e historial sujetos a confirmación.',
      5900000000::numeric
    ),
    (
      'AER-005',
      'Diamond DA40 NG',
      'Aeronave de demostración. Monomotor eficiente, apropiado para entrenamiento y viajes cortos. Verificar disponibilidad y precio antes de publicar.',
      'Referencia de ejemplo: 4 plazas, motor diésel Austro y cabina de materiales compuestos. Año, horas de vuelo, matrícula e historial sujetos a confirmación.',
      1800000000::numeric
    ),
    (
      'AER-006',
      'Pilatus PC-12 NGX',
      'Aeronave de demostración. Turbohélice monomotor para transporte ejecutivo y operación regional. Verificar disponibilidad y precio antes de publicar.',
      'Referencia de ejemplo: cabina ejecutiva, aviónica avanzada y capacidad para operar en pistas exigentes. Año, horas de motor, matrícula e historial sujetos a confirmación.',
      13500000000::numeric
    ),
    (
      'AER-007',
      'Cessna Citation CJ3+',
      'Aeronave de demostración. Jet ligero para viajes ejecutivos regionales. Verificar disponibilidad, configuración y precio antes de publicar.',
      'Referencia de ejemplo: dos motores turbofán, cabina ejecutiva y aviónica Garmin. Año, horas de motor, ciclos, matrícula e historial sujetos a confirmación.',
      18500000000::numeric
    ),
    (
      'AER-008',
      'Embraer Phenom 300E',
      'Aeronave de demostración. Jet ejecutivo ligero para vuelos regionales y corporativos. Verificar disponibilidad, configuración y precio antes de publicar.',
      'Referencia de ejemplo: dos motores turbofán, cabina ejecutiva y aviónica Prodigy Touch. Año, horas de motor, ciclos, matrícula e historial sujetos a confirmación.',
      31000000000::numeric
    )
)
INSERT INTO public.catalogo (codigo, titulo, descripcion, detalle, precio)
SELECT
  semilla.codigo,
  semilla.titulo,
  semilla.descripcion,
  semilla.detalle,
  semilla.precio
FROM aeronaves AS semilla
WHERE NOT EXISTS (
  SELECT 1
  FROM public.catalogo AS existente
  WHERE existente.codigo::text = semilla.codigo
);
