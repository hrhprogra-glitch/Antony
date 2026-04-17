export function CombustibleHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950">
          Control de Combustible
        </h1>
        <p className="text-neutral-500 mt-1">Registra los abastecimientos de petróleo para cada máquina.</p>
      </div>
      <button className="bg-neutral-950 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200">
        + Registrar Abastecimiento
      </button>
    </div>
  );
}