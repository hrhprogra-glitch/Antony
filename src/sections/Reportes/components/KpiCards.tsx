interface Props {
  ingresos: number;
  gastos: number;
  maquinasActivas: number;
  alertasStock: number;
}

export function KpiCards({ ingresos, gastos, maquinasActivas, alertasStock }: Props) {
  const gananciaNeta = ingresos - gastos;
  const margen = ingresos > 0 ? ((gananciaNeta / ingresos) * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Tarjeta Ganancia */}
      <div className="bg-white p-6 rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
        <p className="text-sm font-medium text-neutral-500">Ganancia Neta</p>
        <p className={`text-3xl font-extrabold mt-2 ${gananciaNeta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          ${gananciaNeta.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-neutral-400 mt-2">Margen del {margen}%</p>
      </div>

      {/* Tarjeta Ingresos */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <p className="text-sm font-medium text-neutral-500">Ingresos Brutos</p>
        <p className="text-3xl font-bold mt-2 text-neutral-900">
          ${ingresos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-emerald-600 font-medium mt-2">↑ Por trabajos realizados</p>
      </div>

      {/* Tarjeta Gastos */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <p className="text-sm font-medium text-neutral-500">Gastos Totales</p>
        <p className="text-3xl font-bold mt-2 text-neutral-900">
          ${gastos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs text-red-500 font-medium mt-2">↓ Combustible, repuestos, etc.</p>
      </div>

      {/* Tarjeta Operatividad */}
      <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
        <p className="text-sm font-medium text-neutral-500">Estado de Flota</p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-3xl font-bold text-blue-600">{maquinasActivas}</p>
          <p className="text-sm text-neutral-500 font-medium">Activas</p>
        </div>
        <p className="text-xs text-amber-600 font-medium mt-2">
          {alertasStock > 0 ? `⚠️ ${alertasStock} repuestos con bajo stock` : '✅ Stock saludable'}
        </p>
      </div>
    </div>
  );
}