interface Props {
  ingresos: number;
  gastos: number;
  maquinasActivas: number;
  alertasStock: number;
  totalGalones: number;
}

export function KpiCards({ ingresos, gastos, maquinasActivas, alertasStock, totalGalones }: Props) {
  const gananciaNeta = ingresos - gastos;
  const margen = ingresos > 0 ? ((gananciaNeta / ingresos) * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {/* Tarjeta Ganancia */}
      <div className="bg-(--bg-card) p-5 rounded-none border-2 border-black shadow-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Ganancia Neta</p>
        <p className={`text-2xl font-black mt-2 tracking-tight ${gananciaNeta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          ${gananciaNeta.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-[10px] font-bold mt-2 uppercase tracking-widest">Margen {margen}%</p>
      </div>

      {/* Tarjeta Ingresos */}
      <div className="bg-(--bg-card) p-5 rounded-none border-2 border-black shadow-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Ingresos Brutos</p>
        <p className="text-2xl font-black mt-2 text-(--text-main) tracking-tight">
          ${ingresos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-2">↑ Trabajos</p>
      </div>

      {/* Tarjeta Gastos */}
      <div className="bg-(--bg-card) p-5 rounded-none border-2 border-black shadow-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Gastos Totales</p>
        <p className="text-2xl font-black mt-2 text-(--text-main) tracking-tight">
          ${gastos.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-2">↓ Operación</p>
      </div>

      {/* NUEVA: Tarjeta Combustible */}
      <div className="bg-(--bg-card) p-5 rounded-none border-2 border-black shadow-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Consumo Petróleo</p>
        <p className="text-2xl font-black mt-2 text-amber-600 tracking-tight">
          {totalGalones.toLocaleString('en-US', { maximumFractionDigits: 1 })} <span className="text-sm">gal</span>
        </p>
        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-2">Volumen Total</p>
      </div>

      {/* Tarjeta Flota */}
      <div className="bg-(--bg-card) p-5 rounded-none border-2 border-black shadow-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900">
        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Estado de Flota</p>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-2xl font-black text-blue-600 tracking-tight">{maquinasActivas}</p>
          <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Activas</p>
        </div>
        <p className={`text-[10px] font-bold uppercase tracking-widest mt-2 ${alertasStock > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
          {alertasStock > 0 ? `⚠️ ${alertasStock} bajo stock` : '✅ Stock OK'}
        </p>
      </div>
    </div>
  );
}