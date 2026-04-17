import { useState } from 'react';
import type { Transaccion } from './types';
import { FinanzasHeader } from './components/FinanzasHeader';
import { FinanzasTable } from './components/FinanzasTable';

export default function FinanzasSection() {
  const [transacciones] = useState<Transaccion[]>([
    {
      id: '1',
      fecha: '2024-03-20',
      descripcion: 'Cobro Trabajo Constructora Beta',
      categoria: 'Trabajo',
      tipo: 'Ingreso',
      monto: 3200.00
    },
    {
      id: '2',
      fecha: '2024-03-21',
      descripcion: 'Compra Filtros de Aceite (10 unidades)',
      categoria: 'Repuestos',
      tipo: 'Egreso',
      monto: 450.00
    },
    {
      id: '3',
      fecha: '2024-03-22',
      descripcion: 'Abastecimiento Diesel EXC-001',
      categoria: 'Combustible',
      tipo: 'Egreso',
      monto: 185.50
    }
  ]);

  // Cálculo rápido para el resumen
  const balance = transacciones.reduce((acc, t) => t.tipo === 'Ingreso' ? acc + t.monto : acc - t.monto, 0);

  return (
    <div className="space-y-6">
      {/* Resumen de Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">Balance Total</p>
          <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
        <FinanzasHeader />
        <FinanzasTable transacciones={transacciones} />
      </div>
    </div>
  );
}