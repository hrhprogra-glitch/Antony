export function TrabajosHeader({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-(--text-main)">Registro de Trabajos</h1>
        <p className="text-(--text-muted) mt-1">Controla los servicios realizados por cliente.</p>
      </div>
      <button onClick={onOpenModal} className="bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-none text-[11px] font-bold uppercase tracking-widest transition-colors border-2 border-black active:scale-95">
        + Nuevo Trabajo
      </button>
    </div>
  );
}