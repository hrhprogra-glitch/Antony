import { useState } from 'react';
import type { Mantenimiento } from './types';
import { MantenimientoHeader } from './components/MantenimientoHeader';
import { MantenimientoTable } from './components/MantenimientoTable';

export default function MantenimientoSection() {
  // TODO: Conectar con base de datos real
  const [registros] = useState<Mantenimiento[]>([
    {
      id: '1',
      maquina_codigo: 'EXC-001',
      tipo: 'Preventivo',
      fecha: '2024-03-10',
      descripcion: 'Cambio de filtro de aceite y revisión de fluidos.',
      costo: 350.00,
      responsable: 'Carlos Mecánico'
    },
    {
      id: '2',
      maquina_codigo: 'CAR-002',
      tipo: 'Correctivo',
      fecha: '2024-03-15',
      descripcion: 'Reemplazo de manguera hidráulica rota.',
      costo: 890.50,
      responsable: 'Taller Central'
    }
  ]);

  return (
    <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
      <MantenimientoHeader />
      <MantenimientoTable registros={registros} />
    </div>
  );
}