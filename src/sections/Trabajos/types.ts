export interface Trabajo {
  id: string;
  cliente: string;
  tipo_trabajo: string;
  maquina_codigo: string;
  fecha_inicio: string;
  fecha_fin: string | null;
  horas_trabajadas: number;
  ingreso_generado: number;
  estado: 'Pendiente' | 'En Progreso' | 'Completado';
}