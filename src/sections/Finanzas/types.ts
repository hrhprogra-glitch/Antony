export interface Transaccion {
  id: string;
  fecha: string;
  descripcion: string;
  categoria: 'Trabajo' | 'Repuestos' | 'Combustible' | 'Mantenimiento' | 'Otros';
  tipo: 'Ingreso' | 'Egreso';
  monto: number;
}