export function RepuestosHeader({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-(--text-main)">Inventario de Repuestos</h1>
        <p className="text-(--text-muted) mt-1">Controla el stock y evita la escasez de piezas clave.</p>
      </div>
      <button onClick={onOpenModal} className="bg-neutral-950 dark:bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-80">
        + Nuevo Repuesto
      </button>
    </div>
  );
}