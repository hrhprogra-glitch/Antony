export function FinanzasHeader({ onOpenModal }: { onOpenModal: (tipo: 'Ingreso' | 'Egreso') => void }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-(--text-main)">Gestión Financiera</h1>
      </div>
      <div className="flex gap-3">
        <button onClick={() => onOpenModal('Ingreso')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
          + Ingreso
        </button>
        <button onClick={() => onOpenModal('Egreso')} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold">
          + Egreso
        </button>
      </div>
    </div>
  );
}