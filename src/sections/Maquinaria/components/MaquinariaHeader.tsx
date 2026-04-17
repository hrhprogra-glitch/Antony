export function MaquinariaHeader({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-(--text-main)">Maquinaria</h1>
      <button onClick={onOpenModal} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200">
        + Nueva Máquina
      </button>
    </div>
  );
}