export interface Mantenimiento {
  id: string;
  maquina_codigo: string;
  tipo: 'Preventivo' | 'Correctivo';
  fecha: string;
  descripcion: string;
  costo: number;
  responsable: string;
}