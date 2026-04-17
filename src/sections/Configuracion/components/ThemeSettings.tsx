import { useEffect, useState } from 'react';

type ThemeType = 'light' | 'dark' | 'pink';

export function ThemeSettings() {
  // Inicializamos con el tema guardado o 'light' por defecto
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const root = document.documentElement;
    // Limpiamos clases anteriores
    root.classList.remove('dark', 'pink');
    
    // Aplicamos la clase correspondiente (excepto para light que es el default)
    if (theme !== 'light') {
      root.classList.add(theme);
    }
  }, [theme]);

  return (
    <div className="bg-(--bg-card) border-(--border-color) text-(--text-main) p-6 rounded-2xl border shadow-sm transition-colors duration-300">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">Apariencia del Sistema</h2>
      <p className="text-sm text-neutral-500 dark:text-slate-400 mb-6">
        Selecciona la combinación de colores que prefieras para trabajar.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Opción Normal */}
        <button 
          onClick={() => setTheme('light')}
          className={`py-4 px-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
            theme === 'light' 
              ? 'border-neutral-950 bg-neutral-50 text-neutral-950 font-bold' 
              : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
          }`}
        >
          <span className="text-xl">☀️</span>
          Normal
        </button>

        {/* Opción Oscuro */}
        <button 
          onClick={() => setTheme('dark')}
          className={`py-4 px-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
            theme === 'dark' 
              ? 'border-blue-500 bg-slate-700 text-blue-400 font-bold' 
              : 'border-neutral-200 dark:border-slate-600 text-neutral-600 dark:text-slate-300 hover:border-blue-400'
          }`}
        >
          <span className="text-xl">🌙</span>
          Oscuro
        </button>

        {/* Opción Rosado */}
        <button 
          onClick={() => setTheme('pink')}
          className={`py-4 px-6 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
            theme === 'pink' 
              ? 'border-rose-600 bg-rose-50 text-rose-700 font-bold' 
              : 'border-neutral-200 text-neutral-600 hover:border-rose-300'
          }`}
        >
          <span className="text-xl">🌸</span>
          Rosado
        </button>
      </div>
    </div>
  );
}