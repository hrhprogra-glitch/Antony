import type { RegistroCombustible } from '../types';

interface Props {
  registros: RegistroCombustible[];
  onEdit: (registro: RegistroCombustible) => void;
  onDelete: (id: string) => void;
}

export function CombustibleTable({ registros, onEdit, onDelete }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-black">
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Fecha</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Máquina</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Galones</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Costo Total</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Operador</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-(--border-color) text-sm">
          {registros.map((registro) => (
            <tr key={registro.id} className="hover:bg-neutral-50 transition-colors">
              <td className="px-4 py-5 text-(--text-main) font-mono font-bold">{registro.fecha}</td>
              <td className="px-4 py-5 font-black text-(--text-main)">{registro.maquina_codigo}</td>
              <td className="px-4 py-5 text-right font-mono font-bold text-blue-600">
                {registro.galones} gal
              </td>
              <td className="px-4 py-5 text-right font-mono font-black text-lg text-(--text-main)">
                ${registro.costo_total?.toFixed(2)}
              </td>
              <td className="px-4 py-5 text-neutral-800 font-bold">{registro.responsable}</td>
              <td className="px-4 py-5 text-right space-x-4">
                <button onClick={() => onEdit(registro)} className="text-[11px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest transition-colors">
                  Editar
                </button>
                <button onClick={() => onDelete(registro.id)} className="text-[11px] font-bold text-red-600 hover:text-red-800 uppercase tracking-widest transition-colors">
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