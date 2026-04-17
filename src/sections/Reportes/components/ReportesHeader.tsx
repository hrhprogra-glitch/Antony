export function ReportesHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950">
          Dashboard y Reportes
        </h1>
        <p className="text-neutral-500 mt-1">Visión general del rendimiento y rentabilidad de la flota.</p>
      </div>
      <button className="bg-neutral-950 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 flex items-center gap-2">
        <span>📥</span> Exportar PDF
      </button>
    </div>
  );
}