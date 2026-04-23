import type { Transaccion } from '../types';

interface Props {
  transacciones: Transaccion[];
  onEdit: (transaccion: Transaccion) => void;
  onDelete: (id: string) => void;
}

export function FinanzasTable({ transacciones, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Fecha</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Descripción / Categoría</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Monto</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--border-color) text-sm">
          {transacciones.map((t) => (
            <tr key={t.id} className="hover:bg-neutral-50 transition-colors">
              <td className="px-4 py-5 text-(--text-main) font-mono font-bold">{t.fecha}</td>
              <td className="px-4 py-5">
                <div className="font-bold text-(--text-main)">{t.descripcion}</div>
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">{t.categoria}</div>
              </td>
              <td className={`px-4 py-5 text-right font-mono font-black text-lg ${
                t.tipo === 'Ingreso' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {t.tipo === 'Ingreso' ? '+' : '-'} ${t.monto.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </td>
              <td className="px-4 py-5 text-right space-x-4">
                <button onClick={() => onEdit(t)} className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest transition-colors">
                  Editar
                </button>
                <button onClick={() => onDelete(t.id)} className="text-[11px] font-bold text-red-600 hover:text-red-800 uppercase tracking-widest transition-colors">
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}