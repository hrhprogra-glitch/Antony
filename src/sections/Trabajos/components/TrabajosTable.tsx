import type { Trabajo } from '../types';

interface Props {
  trabajos: Trabajo[];
}

export function TrabajosTable({ trabajos }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-neutral-500 border-b border-neutral-100 text-xs uppercase tracking-wider">
            <th className="px-4 py-4 font-medium">Cliente & Servicio</th>
            <th className="px-4 py-4 font-medium">Máquina</th>
            <th className="px-4 py-4 font-medium">Estado</th>
            <th className="px-4 py-4 font-medium text-right">Horas</th>
            <th className="px-4 py-4 font-medium text-right">Ingreso</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 text-sm">
          {trabajos.map((trabajo) => (
            <tr key={trabajo.id} className="hover:bg-neutral-50/50 transition-colors">
              <td className="px-4 py-4">
                <div className="font-semibold text-neutral-950">{trabajo.cliente}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{trabajo.tipo_trabajo}</div>
              </td>
              <td className="px-4 py-4 font-semibold text-neutral-800">{trabajo.maquina_codigo}</td>
              <td className="px-4 py-4">
                <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                  trabajo.estado === 'Completado' ? 'bg-emerald-50 text-emerald-700' : 
                  trabajo.estado === 'En Progreso' ? 'bg-amber-50 text-amber-700' : 
                  'bg-slate-100 text-slate-700'
                }`}>
                  {trabajo.estado}
                </span>
              </td>
              <td className="px-4 py-4 text-right font-mono text-neutral-600">
                {trabajo.horas_trabajadas} h
              </td>
              <td className="px-4 py-4 text-right font-mono font-bold text-emerald-700">
                ${trabajo.ingreso_generado.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}