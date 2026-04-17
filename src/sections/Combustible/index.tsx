import { useState } from 'react';
import type { RegistroCombustible } from './types';
import { CombustibleHeader } from './components/CombustibleHeader';
import { CombustibleTable } from './components/CombustibleTable';

export default function CombustibleSection() {
  const [registros] = useState<RegistroCombustible[]>([
    {
      id: '1',
      maquina_codigo: 'EXC-001',
      fecha: '2024-03-18',
      galones: 50,
      costo_total: 185.50,
      responsable: 'Juan Pérez'
    },
    {
      id: '2',
      maquina_codigo: 'CAR-002',
      fecha: '2024-03-19',
      galones: 35,
      costo_total: 129.85,
      responsable: 'Miguel Gómez'
    }
  ]);

  return (
    <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
      <CombustibleHeader />
      <CombustibleTable registros={registros} />
    </div>
  );
}