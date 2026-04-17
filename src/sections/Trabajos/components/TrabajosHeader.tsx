export function TrabajosHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950">
          Registro de Trabajos
        </h1>
        <p className="text-neutral-500 mt-1">Controla los servicios realizados por cliente y las horas facturadas.</p>
      </div>
      <button className="bg-neutral-950 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200">
        + Nuevo Trabajo
      </button>
    </div>
  );
}