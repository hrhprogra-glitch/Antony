export interface Maquina {
  id: string;
  codigo: string;
  tipo: string;
  marca: string;
  modelo: string;
  estado: 'operativa' | 'mantenimiento' | 'inactiva';
  horas_uso: number;
}