// src/layout/Topbar.tsx

export function Topbar() {
  return (
    <header className="h-16 bg-(--bg-card) border-b border-(--border-color) text-(--text-main) flex items-center justify-between px-6 shadow-sm z-10 transition-colors duration-300">
      <div className="flex items-center gap-4">
        {/* Botón hamburguesa visible solo en móviles */}
        <button 
          className="md:hidden text-slate-600 hover:text-slate-900 focus:outline-none"
          aria-label="Abrir menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-slate-800 hidden sm:block">
          Panel de Control
        </h2>
      </div>

      {/* Perfil de usuario / Sesión */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-slate-600">Admin</span>
        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
      </div>
    </header>
  );
}