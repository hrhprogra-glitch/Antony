export function MantenimientoHeader({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-(--text-main)">Historial de Mantenimiento</h1>
        <p className="text-(--text-muted) mt-1">Registra las reparaciones y mantenimientos preventivos.</p>
      </div>
      <button onClick={onOpenModal} className="bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-none text-[11px] font-bold uppercase tracking-widest transition-colors border-2 border-black active:scale-95">
        + Registrar Mantenimiento
      </button>
    </div>
  );
}