export function FinanzasHeader({ onOpenModal }: { onOpenModal: (tipo: 'Ingreso' | 'Egreso') => void }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-(--text-main)">Gestión Financiera</h1>
      </div>
      <div className="flex gap-4">
      <button onClick={() => onOpenModal('Ingreso')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-none text-[11px] font-bold uppercase tracking-widest transition-colors border-2 border-black active:scale-95">
        + Ingreso
      </button>
      <button onClick={() => onOpenModal('Egreso')} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-none text-[11px] font-bold uppercase tracking-widest transition-colors border-2 border-black active:scale-95">
        - Egreso
      </button>
    </div>
    </div>
  );
}