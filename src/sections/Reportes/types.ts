// src/sections/Reportes/types.ts

export interface KpiMetrics {
  ingresos: number;
  gastos: number;
  maquinasActivas: number;
  alertasStock: number;
  totalGalones: number; // NUEVO: Consumo total de combustible
}

export interface RendimientoMaquina {
  codigo: string;
  ingresos: number;
  gastos: number;
  rentabilidad?: number;
}

// NUEVO: Ranking de repuestos
export interface RepuestoTop {
  nombre: string;
  cantidad: number;
}