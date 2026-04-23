import type { Trabajo } from '../types';

interface Props {
  trabajos: Trabajo[];
  onEdit: (trabajo: Trabajo) => void;
  onDelete: (id: string) => void;
}

export function TrabajosTable({ trabajos, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Cliente & Servicio</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Máquina</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Fechas</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Estado</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Horas / Ingreso</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--border-color) text-sm">
          {trabajos.map((trabajo) => (
            <tr key={trabajo.id} className="hover:bg-neutral-50 transition-colors">
              <td className="px-4 py-5">
                <div className="font-bold text-(--text-main)">{trabajo.cliente}</div>
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">{trabajo.tipo_trabajo}</div>
              </td>
              <td className="px-4 py-5 font-black text-(--text-main)">{trabajo.maquina_codigo}</td>
              <td className="px-4 py-5">
                <div className="font-mono font-bold text-(--text-main) text-xs">{trabajo.fecha_inicio}</div>
                <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">
                  {trabajo.fecha_fin ? `Fin: ${trabajo.fecha_fin}` : 'En curso'}
                </div>
              </td>
              <td className="px-4 py-5">
                <span className={`px-2 py-1 text-[10px] font-bold border border-neutral-200 uppercase tracking-wider ${
                  trabajo.estado === 'Completado' ? 'text-emerald-600' : 
                  trabajo.estado === 'En Progreso' ? 'text-amber-600' : 
                  'text-neutral-500'
                }`}>
                  {trabajo.estado}
                </span>
              </td>
              <td className="px-4 py-5 text-right">
                <div className="font-mono font-bold text-neutral-500">{trabajo.horas_trabajadas} h</div>
                <div className="font-mono font-black text-emerald-600 text-lg mt-1">
                  ${trabajo.ingreso_generado.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </td>
              <td className="px-4 py-5 text-right space-x-4">
                <button onClick={() => onEdit(trabajo)} className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest transition-colors">
                  Editar
                </button>
                <button onClick={() => onDelete(trabajo.id)} className="text-[11px] font-bold text-red-600 hover:text-red-800 uppercase tracking-widest transition-colors">
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