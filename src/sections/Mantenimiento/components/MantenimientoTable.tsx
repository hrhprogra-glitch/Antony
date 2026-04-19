import type { Mantenimiento } from '../types';

interface Props {
  registros: Mantenimiento[];
}

export function MantenimientoTable({ registros }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
  <tr className="border-b-2 border-black">
    <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Fecha</th>
    <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Máquina</th>
    <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Tipo</th>
    <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Descripción</th>
    <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Costo</th>
  </tr>
</thead>
        <tbody className="divide-y divide-neutral-100 text-sm">
          {registros.map((registro) => (
            <tr key={registro.id} className="hover:bg-neutral-50/50 transition-colors">
              <td className="px-4 py-5 text-neutral-600 font-mono">{registro.fecha}</td>
              <td className="px-4 py-5 font-semibold text-neutral-950">{registro.maquina_codigo}</td>
              <td className="px-4 py-5">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  registro.tipo === 'Preventivo' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                }`}>
                  {registro.tipo}
                </span>
              </td>
              <td className="px-4 py-5 text-neutral-700">{registro.descripcion}</td>
              <td className="px-4 py-5 text-right text-neutral-900 font-mono font-medium">
                ${registro.costo.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}