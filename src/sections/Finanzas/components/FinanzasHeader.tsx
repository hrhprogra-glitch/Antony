export function FinanzasHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950">
          Gestión Financiera
        </h1>
        <p className="text-neutral-500 mt-1">Monitorea el flujo de caja, ingresos por servicios y gastos operativos.</p>
      </div>
      <div className="flex gap-3">
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          + Ingreso
        </button>
        <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors">
          + Egreso
        </button>
      </div>
    </div>
  );
}