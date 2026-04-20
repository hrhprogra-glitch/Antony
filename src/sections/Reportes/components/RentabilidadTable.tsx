import type { RendimientoMaquina } from '../types';

interface Props {
  datos: RendimientoMaquina[];
}

export function RentabilidadTable({ datos }: Props) {
  return (
    <div className="bg-(--bg-card) rounded-none border-2 border-black shadow-none overflow-hidden">
      <div className="p-6 border-b-2 border-black bg-neutral-100 dark:bg-neutral-900">
        <h3 className="font-extrabold text-[13px] text-(--text-main) uppercase tracking-widest">Rentabilidad por Equipo</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="px-6 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Máquina</th>
              <th className="px-6 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Ingresos</th>
              <th className="px-6 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Costos</th>
              <th className="px-6 py-4 text-[11px] text-neutral-500 font-bold uppercase tracking-widest text-right">Rentabilidad</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-(--border-color)">
            {datos.map((maquina) => {
              const rentabilidad = maquina.ingresos - maquina.gastos;
              return (
                <tr key={maquina.codigo} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-5 font-bold text-(--text-main)">{maquina.codigo}</td>
                  <td className="px-6 py-5 text-right font-mono text-emerald-600 font-bold">
                    ${maquina.ingresos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-5 text-right font-mono text-red-500 font-bold">
                    ${maquina.gastos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className={`px-6 py-5 text-right font-mono font-black text-lg ${
                    rentabilidad >= 0 ? 'text-emerald-700' : 'text-red-700'
                  }`}>
                    ${rentabilidad.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}