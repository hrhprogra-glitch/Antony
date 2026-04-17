import { useState } from 'react';
import { ThemeSettings } from './components/ThemeSettings';
import type { Usuario } from './types';

export default function ConfiguracionSection() {
  // Ahora sí, esta variable será "leída" en nuestro HTML
  const [usuarios] = useState<Usuario[]>([]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-950 dark:text-white">
          Configuración
        </h1>
        <p className="text-neutral-500 dark:text-slate-400 mt-1">Gestiona tus preferencias y accesos del sistema.</p>
      </div>

      {/* Aquí inyectamos el panel de cambio de colores */}
      <ThemeSettings />

      {/* Cascarón para la futura gestión de usuarios */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-neutral-100 dark:border-slate-700 shadow-sm transition-colors">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Gestión de Usuarios</h2>
            <p className="text-sm text-neutral-500 dark:text-slate-400">Controla quién tiene acceso al sistema.</p>
          </div>
          <button className="bg-neutral-950 dark:bg-blue-600 hover:bg-neutral-800 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            + Nuevo Usuario
          </button>
        </div>
        
        <div className="p-8 text-center border-2 border-dashed border-neutral-200 dark:border-slate-700 rounded-xl">
          <p className="text-neutral-500 dark:text-slate-400">
            Módulo de usuarios listo para ser conectado a la Base de Datos.
          </p>
          {/* ¡Aquí está el truco! Leemos la variable para satisfacer a TypeScript */}
          <p className="mt-3 text-sm font-bold text-blue-600 dark:text-blue-400">
            Usuarios registrados actualmente: {usuarios.length}
          </p>
        </div>
      </div>
    </div>
  );
}