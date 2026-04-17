export function CombustibleHeader({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-(--text-main)">Control de Combustible</h1>
        <p className="text-(--text-muted) mt-1">Registra los abastecimientos de petróleo para cada máquina.</p>
      </div>
      <button onClick={onOpenModal} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200">
        + Registrar Abastecimiento
      </button>
    </div>
  );
}