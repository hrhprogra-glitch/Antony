import type { Maquina } from '../types';

interface Props {
  maquinas: Maquina[];
  onEdit: (maquina: Maquina) => void;
  onDelete: (id: string) => void;
}

export function MaquinariaTable({ maquinas, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Código</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Tipo</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Equipo</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Estado</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Horas</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--border-color)">
          {maquinas.map((maquina) => (
            <tr key={maquina.id} className="hover:bg-neutral-50 transition-colors group">
              <td className="px-4 py-5 font-bold text-black">{maquina.codigo}</td>
              <td className="px-4 py-5 font-medium text-neutral-600">{maquina.tipo}</td>
              <td className="px-4 py-5 font-medium text-neutral-600">{maquina.marca} {maquina.modelo}</td>
              <td className="px-4 py-5">
                <span className="px-2 py-1 text-xs font-bold border border-neutral-200 text-black uppercase tracking-wider">
                  {maquina.estado}
                </span>
              </td>
              <td className="px-4 py-5 text-right font-mono font-bold text-black">
                {maquina.horas_uso.toLocaleString()} h
              </td>
              {/* Nueva columna de Acciones */}
              <td className="px-4 py-5 text-right space-x-4">
                <button onClick={() => onEdit(maquina)} className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest transition-colors">
                  Editar
                </button>
                <button onClick={() => onDelete(maquina.id)} className="text-[11px] font-bold text-red-600 hover:text-red-800 uppercase tracking-widest transition-colors">
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