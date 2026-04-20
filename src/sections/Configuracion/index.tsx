import { useState } from 'react';
import { ThemeSettings } from './components/ThemeSettings';
import type { Usuario } from './types';

export default function ConfiguracionSection() {
  const [usuarios] = useState<Usuario[]>([]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-(--text-main)">
          Configuración
        </h1>
        <p className="text-(--text-muted) mt-1 font-medium">Gestiona tus preferencias y accesos del sistema.</p>
      </div>

      <ThemeSettings />

      {/* Cascarón para la futura gestión de usuarios */}
      <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none transition-colors">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-black text-(--text-main) uppercase tracking-widest">Gestión de Usuarios</h2>
            <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest mt-1">Controla accesos al sistema</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-none text-[11px] font-bold uppercase tracking-widest transition-colors border-2 border-black shadow-none active:scale-95">
            + Nuevo Usuario
          </button>
        </div>
        
        {/* Panel interior */}
        <div className="p-8 text-center border-2 border-black rounded-none bg-neutral-100 dark:bg-neutral-900 shadow-none">
          <p className="text-(--text-main) font-bold uppercase tracking-widest text-xs">
            Módulo de usuarios listo para conexión a BD
          </p>
          <p className="mt-3 text-[11px] font-black text-blue-600 uppercase tracking-widest">
            Usuarios registrados: {usuarios.length}
          </p>
        </div>
      </div>
    </div>
  );
}