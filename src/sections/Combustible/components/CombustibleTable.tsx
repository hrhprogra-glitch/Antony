import type { RegistroCombustible } from '../types';

interface Props {
  registros: RegistroCombustible[];
}

export function CombustibleTable({ registros }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-neutral-500 border-b border-neutral-100 text-xs uppercase tracking-wider">
            <th className="px-4 py-4 font-medium">Fecha</th>
            <th className="px-4 py-4 font-medium">Máquina</th>
            <th className="px-4 py-4 font-medium text-right">Galones</th>
            <th className="px-4 py-4 font-medium text-right">Costo Total</th>
            <th className="px-4 py-4 font-medium">Operador</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 text-sm">
          {registros.map((registro) => (
            <tr key={registro.id} className="hover:bg-neutral-50/50 transition-colors">
              <td className="px-4 py-5 text-neutral-600 font-mono">{registro.fecha}</td>
              <td className="px-4 py-5 font-semibold text-neutral-950">{registro.maquina_codigo}</td>
              <td className="px-4 py-5 text-right font-mono font-medium text-blue-700">
                {registro.galones} gal
              </td>
              <td className="px-4 py-5 text-right text-neutral-900 font-mono font-medium">
                ${registro.costo_total.toFixed(2)}
              </td>
              <td className="px-4 py-5 text-neutral-600">{registro.responsable}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}