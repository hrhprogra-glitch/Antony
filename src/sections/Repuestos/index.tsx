import { useState } from 'react';
import type { Repuesto } from './types';
import { RepuestosHeader } from './components/RepuestosHeader';
import { RepuestosTable } from './components/RepuestosTable';

export default function RepuestosSection() {
  // TODO: Conectar con Supabase/Backend
  const [repuestos] = useState<Repuesto[]>([
    {
      id: '1',
      codigo: 'FIL-001',
      nombre: 'Filtro de Aceite CAT',
      categoria: 'Filtros',
      precio: 45.50,
      stock: 12,
      stock_minimo: 5,
    },
    {
      id: '2',
      codigo: 'MANG-014',
      nombre: 'Manguera Hidráulica 3/4"',
      categoria: 'Sistemas Hidráulicos',
      precio: 120.00,
      stock: 2, // Stock bajo para probar la alerta
      stock_minimo: 4,
    }
  ]);

  return (
    <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
      <RepuestosHeader />
      <RepuestosTable repuestos={repuestos} />
    </div>
  );
}