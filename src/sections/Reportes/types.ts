// src/sections/Reportes/types.ts

export interface KpiMetrics {
  ingresos: number;
  gastos: number;
  maquinasActivas: number;
  alertasStock: number;
}

export interface RendimientoMaquina {
  codigo: string;
  ingresos: number;
  gastos: number;
  rentabilidad?: number; // Opcional, lo podemos calcular al vuelo
}