import type { Repuesto } from '../types';

interface Props {
  repuestos: Repuesto[];
}

export function RepuestosTable({ repuestos }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Código</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Nombre</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Categoría</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Precio</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-center">Stock</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--border-color)">
          {repuestos.map((r) => (
            <tr key={r.id} className="hover:bg-neutral-50 transition-colors">
              <td className="px-4 py-5 font-bold text-black">{r.codigo}</td>
              <td className="px-4 py-5 font-medium text-neutral-600">{r.nombre}</td>
              <td className="px-4 py-5">
                <span className="px-2 py-1 text-[10px] font-bold border border-neutral-200 text-neutral-500 uppercase">{r.categoria}</span>
              </td>
              <td className="px-4 py-5 text-right font-mono font-bold text-black">${r.precio.toFixed(2)}</td>
              <td className="px-4 py-5 text-center">
                <span className={`font-bold ${r.stock <= r.stock_minimo ? 'text-red-600' : 'text-black'}`}>{r.stock}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}