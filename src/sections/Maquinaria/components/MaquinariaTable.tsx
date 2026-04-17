// src/sections/Maquinaria/components/MaquinariaTable.tsx
import type { Maquina } from '../types';

interface Props {
  maquinas: Maquina[];
}

export function MaquinariaTable({ maquinas }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-neutral-500 border-b border-neutral-100 text-xs uppercase tracking-wider">
            <th className="px-4 py-4 font-medium">Código</th>
            <th className="px-4 py-4 font-medium">Tipo</th>
            <th className="px-4 py-4 font-medium">Equipo</th>
            <th className="px-4 py-4 font-medium">Estado</th>
            <th className="px-4 py-4 font-medium text-right">Horas</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 text-sm">
          {maquinas.map((maquina) => (
            <tr key={maquina.id} className="hover:bg-neutral-50/50 transition-colors">
              <td className="px-4 py-5 font-semibold text-neutral-950">{maquina.codigo}</td>
              <td className="px-4 py-5 text-neutral-600">{maquina.tipo}</td>
              <td className="px-4 py-5 text-neutral-600">{maquina.marca} {maquina.modelo}</td>
              <td className="px-4 py-5">
                <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                  maquina.estado === 'operativa' ? 'bg-emerald-50 text-emerald-800' :
                  maquina.estado === 'mantenimiento' ? 'bg-amber-50 text-amber-800' :
                  'bg-red-50 text-red-800'
                }`}>
                  {maquina.estado.charAt(0).toUpperCase() + maquina.estado.slice(1)}
                </span>
              </td>
              <td className="px-4 py-5 text-right text-neutral-600 font-mono tabular-nums">
                {maquina.horas_uso.toLocaleString()} h
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}