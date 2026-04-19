// src/sections/Maquinaria/components/MaquinariaTable.tsx
import type { Maquina } from '../types';

interface Props {
  maquinas: Maquina[];
}

export function MaquinariaTable({ maquinas }: Props) {
  return (
    <div className="overflow-x-auto">
      {/* Eliminamos bordes externos y fondos raros */}
      <table className="w-full text-left border-collapse">
        
        {/* Encabezado: Fondo blanco, línea inferior negra gruesa para marcar autoridad */}
        <thead>
          <tr className="border-b-2 border-black">
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Código</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Tipo</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Equipo</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Estado</th>
            <th className="px-4 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Horas</th>
          </tr>
        </thead>
        
        {/* Cuerpo: Solo líneas divisorias horizontales muy suaves */}
        <tbody className="divide-y divide-(--border-color)">
          {maquinas.map((maquina) => (
            <tr key={maquina.id} className="hover:bg-neutral-50 transition-colors group">
              {/* Quitamos los border-r. Todo limpio. */}
              <td className="px-4 py-5 font-bold text-black">{maquina.codigo}</td>
              <td className="px-4 py-5 font-medium text-neutral-600">{maquina.tipo}</td>
              <td className="px-4 py-5 font-medium text-neutral-600">{maquina.marca} {maquina.modelo}</td>
              <td className="px-4 py-5">
                {/* Badges minimalistas: Texto negro, borde gris suave */}
                <span className="px-2 py-1 text-xs font-bold border border-neutral-200 text-black uppercase tracking-wider">
                  {maquina.estado}
                </span>
              </td>
              <td className="px-4 py-5 text-right font-mono font-bold text-black">
                {maquina.horas_uso.toLocaleString()} h
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}