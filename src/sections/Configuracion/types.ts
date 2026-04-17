export interface Usuario {
  id: string;
  nombre: string;
  rol: 'Administrador' | 'Operador' | 'Mecánico';
  email: string;
  estado: 'Activo' | 'Inactivo';
}