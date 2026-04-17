// src/sections/Maquinaria/components/MaquinariaHeader.tsx

export function MaquinariaHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950">
        Maquinaria
      </h1>
      <button className="bg-neutral-950 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200">
        + Nueva Máquina
      </button>
    </div>
  );
}