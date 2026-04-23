import { useEffect, useState } from 'react';

type ThemeType = 'light' | 'dark' | 'pink';

export function ThemeSettings() {
  // 🔥 SOLUCIÓN: Leemos de la memoria del navegador al iniciar
  const [theme, setTheme] = useState<ThemeType>(() => {
    return (localStorage.getItem('app_theme') as ThemeType) || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'pink');
    if (theme !== 'light') {
      root.classList.add(theme);
    }
    // 🔥 SOLUCIÓN: Guardamos la preferencia del usuario
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  return (
    <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none transition-colors duration-300">
      <h2 className="text-xl font-black text-(--text-main) uppercase tracking-widest mb-2">Apariencia</h2>
      <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest mb-6">
        Selecciona el entorno de trabajo
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button onClick={() => setTheme('light')} className={`py-4 px-6 rounded-none border-2 border-black transition-all flex flex-col items-center gap-2 ${ theme === 'light' ? 'bg-neutral-950 text-white shadow-none' : 'bg-white text-black hover:bg-neutral-100 shadow-none' }`}>
          <span className="text-2xl">☀️</span> <span className="font-black uppercase tracking-widest text-[11px]">Normal</span>
        </button>
        <button onClick={() => setTheme('dark')} className={`py-4 px-6 rounded-none border-2 border-black transition-all flex flex-col items-center gap-2 ${ theme === 'dark' ? 'bg-blue-600 text-white shadow-none' : 'bg-neutral-800 text-white hover:bg-neutral-700 shadow-none' }`}>
          <span className="text-2xl">🌙</span> <span className="font-black uppercase tracking-widest text-[11px]">Oscuro</span>
        </button>
        <button onClick={() => setTheme('pink')} className={`py-4 px-6 rounded-none border-2 border-black transition-all flex flex-col items-center gap-2 ${ theme === 'pink' ? 'bg-rose-500 text-white shadow-none' : 'bg-rose-100 text-rose-900 hover:bg-rose-200 shadow-none' }`}>
          <span className="text-2xl">🌸</span> <span className="font-black uppercase tracking-widest text-[11px]">Rosado</span>
        </button>
      </div>
    </div>
  );
}