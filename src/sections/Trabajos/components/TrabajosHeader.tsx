export function TrabajosHeader({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-(--text-main)">Registro de Trabajos</h1>
        <p className="text-(--text-muted) mt-1">Controla los servicios realizados por cliente.</p>
      </div>
      <button onClick={onOpenModal} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200">
        + Nuevo Trabajo
      </button>
    </div>
  );
}