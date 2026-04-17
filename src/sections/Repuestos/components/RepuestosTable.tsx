import type { Repuesto } from '../types';

interface Props {
  repuestos: Repuesto[];
}

export function RepuestosTable({ repuestos }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-neutral-500 border-b border-neutral-100 text-xs uppercase tracking-wider">
            <th className="px-4 py-4 font-medium">Código</th>
            <th className="px-4 py-4 font-medium">Nombre</th>
            <th className="px-4 py-4 font-medium">Categoría</th>
            <th className="px-4 py-4 font-medium text-right">Precio</th>
            <th className="px-4 py-4 font-medium text-center">Stock</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 text-sm">
          {repuestos.map((repuesto) => {
            const stockBajo = repuesto.stock <= repuesto.stock_minimo;
            
            return (
              <tr key={repuesto.id} className="hover:bg-neutral-50/50 transition-colors">
                <td className="px-4 py-5 font-semibold text-neutral-950">{repuesto.codigo}</td>
                <td className="px-4 py-5 font-medium text-neutral-800">{repuesto.nombre}</td>
                <td className="px-4 py-5 text-neutral-600">
                  <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium">
                    {repuesto.categoria}
                  </span>
                </td>
                <td className="px-4 py-5 text-right text-neutral-600 font-mono tabular-nums">
                  ${repuesto.precio.toFixed(2)}
                </td>
                <td className="px-4 py-5 text-center">
                  <span className={`font-mono font-bold px-3 py-1 rounded-full text-xs ${
                    stockBajo ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {repuesto.stock} {stockBajo && '⚠️'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}