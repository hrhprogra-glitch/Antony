import type { Transaccion } from '../types';

interface Props {
  transacciones: Transaccion[];
}

export function FinanzasTable({ transacciones }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-neutral-500 border-b border-neutral-100 text-xs uppercase tracking-wider">
            <th className="px-4 py-4 font-medium">Fecha</th>
            <th className="px-4 py-4 font-medium">Descripción / Categoría</th>
            <th className="px-4 py-4 font-medium text-right">Monto</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 text-sm">
          {transacciones.map((t) => (
            <tr key={t.id} className="hover:bg-neutral-50/50 transition-colors">
              <td className="px-4 py-5 text-neutral-600 font-mono">{t.fecha}</td>
              <td className="px-4 py-5">
                <div className="font-semibold text-neutral-950">{t.descripcion}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{t.categoria}</div>
              </td>
              <td className={`px-4 py-5 text-right font-mono font-bold text-lg ${
                t.tipo === 'Ingreso' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {t.tipo === 'Ingreso' ? '+' : '-'} ${t.monto.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}