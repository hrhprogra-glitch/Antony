export function ReportesHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950">
          Dashboard y Reportes
        </h1>
        <p className="text-neutral-500 mt-1">Visión general del rendimiento y rentabilidad de la flota.</p>
      </div>
      <button className="bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-none text-[11px] font-bold uppercase tracking-widest transition-colors border-2 border-black active:scale-95 flex items-center gap-2">
        <span>📥</span> Exportar PDF
      </button>
    </div>
  );
}