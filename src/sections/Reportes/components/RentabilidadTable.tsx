import type { RendimientoMaquina } from '../types';

interface Props {
  datos: RendimientoMaquina[];
}

export function RentabilidadTable({ datos }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-neutral-100 bg-slate-50/50">
        <h3 className="font-bold text-lg text-neutral-900">Rentabilidad por Equipo</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-neutral-500 border-b border-neutral-100 text-xs uppercase tracking-wider bg-white">
              <th className="px-6 py-4 font-medium">Máquina</th>
              <th className="px-6 py-4 font-medium text-right">Ingresos Generados</th>
              <th className="px-6 py-4 font-medium text-right">Costos (Mantenimiento/Combustible)</th>
              <th className="px-6 py-4 font-medium text-right">Rentabilidad Neta</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-sm bg-white">
            {datos.map((maquina) => {
              const rentabilidad = maquina.ingresos - maquina.gastos;
              return (
                <tr key={maquina.codigo} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-5 font-bold text-neutral-900">{maquina.codigo}</td>
                  <td className="px-6 py-5 text-right font-mono text-emerald-600 font-medium">
                    ${maquina.ingresos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-6 py-5 text-right font-mono text-red-500 font-medium">
                    ${maquina.gastos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td className={`px-6 py-5 text-right font-mono font-bold text-lg ${
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