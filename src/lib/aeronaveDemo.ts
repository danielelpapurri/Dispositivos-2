export type AeronaveCatalogo = {
  codigo: string | number;
  titulo: string;
  descripcion: string | null;
  detalle: string | null;
  precio: number | string | null;
};

export const aeronaveDemo: AeronaveCatalogo = {
  codigo: "LOCAL-CESSNA-182",
  titulo: "Cessna 182 Skylane",
  descripcion:
    "Aeronave de demostración agregada en la app; todavía no está registrada en Supabase. Confirma disponibilidad y precio antes de ofrecerla.",
  detalle:
    "Monomotor de ala alta para cuatro plazas, pensado para viajes personales y operación en pistas cortas. Año, motor, aviónica, horas de vuelo e historial deben verificarse para cualquier unidad real.",
  precio: 2850000000,
};
