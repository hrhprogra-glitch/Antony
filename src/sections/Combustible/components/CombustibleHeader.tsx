export function CombustibleHeader({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-(--text-main)">Control de Combustible</h1>
        <p className="text-(--text-muted) mt-1">Registra los abastecimientos de petróleo para cada máquina.</p>
      </div>
      <button onClick={onOpenModal} className="bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-none text-[11px] font-bold uppercase tracking-widest transition-colors border-2 border-black active:scale-95">
        + Registrar Abastecimiento
      </button>
    </div>
  );
}