// src/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom';

export function Sidebar() {
  // Función para dar estilo al enlace activo
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 p-3 rounded transition-colors ${
      isActive ? 'bg-blue-600 text-white font-semibold' : 'hover:bg-slate-800 text-slate-300'
    }`;

  return (
    <aside className="w-64 bg-(--brand-primary) text-white h-full hidden md:flex flex-col shadow-xl z-20 transition-colors duration-300">
      <div className="p-6 font-bold text-2xl border-b border-slate-800 tracking-wider">
        HeavyTrack
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2 text-sm font-medium">
  <li>
    <NavLink to="/maquinaria" className={linkClasses}><span>🚜</span> Maquinaria</NavLink>
  </li>
  <li>
    <NavLink to="/repuestos" className={linkClasses}><span>🔩</span> Repuestos</NavLink>
  </li>
  <li>
    <NavLink to="/mantenimiento" className={linkClasses}><span>🔧</span> Mantenimiento</NavLink>
  </li>
  <li>
    <NavLink to="/combustible" className={linkClasses}><span>⛽</span> Combustible</NavLink>
  </li>
  <li>
    <NavLink to="/trabajos" className={linkClasses}><span>📋</span> Trabajos</NavLink>
  </li>
  <li>
    <NavLink to="/finanzas" className={linkClasses}><span>💰</span> Finanzas</NavLink>
  </li>
  <li>
    <NavLink to="/reportes" className={linkClasses}><span>📊</span> Reportes</NavLink>
  </li>
  <li>
    <NavLink to="/configuracion" className={linkClasses}><span>⚙️</span> Configuración</NavLink>
  </li>
</ul>
      </nav>
    </aside>
  );
}