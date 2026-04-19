// src/layout/Topbar.tsx
interface Props {
  onToggleSidebar: () => void;
}

export function Topbar({ onToggleSidebar }: Props) {
  return (
    <header className="h-16 bg-(--bg-card) border-b-2 border-black flex items-center justify-between px-6 z-10 transition-colors">
      <div className="flex items-center gap-4">
        {/* Botón hamburguesa: Visible en todo dispositivo */}
        <button 
          onClick={onToggleSidebar}
          className="text-black hover:text-neutral-500 focus:outline-none transition-transform active:scale-90"
          aria-label="Alternar menú"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-black hidden sm:block tracking-tight">
          Panel de Control
        </h2>
      </div>

      {/* Perfil minimalista de alta costura */}
      <div className="flex items-center gap-3">
        <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest hidden sm:block">Admin</span>
        <div className="w-9 h-9 bg-black rounded-none flex items-center justify-center text-white font-bold text-sm">
          A
        </div>
      </div>
    </header>
  );
}