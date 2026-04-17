import { useState } from 'react';
import type { Trabajo } from './types';
import { TrabajosHeader } from './components/TrabajosHeader';
import { TrabajosTable } from './components/TrabajosTable';

export default function TrabajosSection() {
  const [trabajos] = useState<Trabajo[]>([
    {
      id: '1',
      cliente: 'Constructora Beta SAC',
      tipo_trabajo: 'Movimiento de tierras',
      maquina_codigo: 'EXC-001',
      fecha_inicio: '2024-03-15',
      fecha_fin: '2024-03-20',
      horas_trabajadas: 40,
      ingreso_generado: 3200.00,
      estado: 'Completado'
    },
    {
      id: '2',
      cliente: 'Minera Los Andes',
      tipo_trabajo: 'Carga de mineral',
      maquina_codigo: 'CAR-002',
      fecha_inicio: '2024-03-22',
      fecha_fin: null,
      horas_trabajadas: 15,
      ingreso_generado: 1350.00,
      estado: 'En Progreso'
    }
  ]);

  return (
    <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
      <TrabajosHeader />
      <TrabajosTable trabajos={trabajos} />
    </div>
  );
}