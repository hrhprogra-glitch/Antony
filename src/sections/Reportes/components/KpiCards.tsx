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
      <div className="bg-(--bg-card) p-6 rounded-none border-2 border-black shadow-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
        <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Ganancia Neta</p>
        <p className={`text-3xl font-black mt-2 ${gananciaNeta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          ${gananciaNeta.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-xs font-bold mt-2">Margen del {margen}%</p>
      </div>

      {/* Tarjeta Ingresos */}
      <div className="bg-(--bg-card) p-6 rounded-none border-2 border-black shadow-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
        <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Ingresos Brutos</p>
        <p className="text-3xl font-black mt-2 text-(--text-main)">
          ${ingresos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-widest mt-2">↑ Por trabajos</p>
      </div>

      {/* Tarjeta Gastos */}
      <div className="bg-(--bg-card) p-6 rounded-none border-2 border-black shadow-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
        <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Gastos Totales</p>
        <p className="text-3xl font-black mt-2 text-(--text-main)">
          ${gastos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-[11px] text-red-500 font-bold uppercase tracking-widest mt-2">↓ Operación</p>
      </div>

      {/* Tarjeta Flota */}
      <div className="bg-(--bg-card) p-6 rounded-none border-2 border-black shadow-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
        <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Estado de Flota</p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-3xl font-black text-blue-600">{maquinasActivas}</p>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Activas</p>
        </div>
        <p className={`text-[11px] font-bold uppercase tracking-widest mt-2 ${alertasStock > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
          {alertasStock > 0 ? `⚠️ ${alertasStock} bajo stock` : '✅ Stock OK'}
        </p>
      </div>
    </div>
  );
}