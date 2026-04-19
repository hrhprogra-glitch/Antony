// src/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { supabase } from '../db/supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const Logo = () => (
  <div className="shrink-0 w-8 h-8 bg-white text-black flex items-center justify-center font-black text-lg">
    H
  </div>
);

const Icons = {
  maquinaria: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M5 17h14v-4H5v4zM3 13h18V7H3v6z"></path></svg>,
  repuestos: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path></svg>,
  mantenimiento: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 9.36l-7.1 7.1a1 1 0 01-1.41-1.41l7.1-7.1a6 6 0 019.36-7.94l-3.77 3.77z"></path></svg>,
  combustible: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M3 21V5a2 2 0 012-2h4a2 2 0 012 2v16M11 13h4a2 2 0 012 2v2a2 2 0 01-2 2h-4M21 10v9M17 10h4"></path></svg>,
  trabajos: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>,
  finanzas: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  reportes: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M18 20V10M12 20V4M6 20v-4"></path></svg>,
  config: <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="square" strokeLinejoin="miter" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
};

// AGRUPACIÓN ESTRATÉGICA DE MÓDULOS
const menuGroups = [
  {
    title: 'Operaciones',
    links: [
      { to: '/maquinaria', icon: Icons.maquinaria, label: 'Maquinaria' },
      { to: '/trabajos', icon: Icons.trabajos, label: 'Trabajos' },
      { to: '/combustible', icon: Icons.combustible, label: 'Combustible' },
    ]
  },
  {
    title: 'Taller e Inventario',
    links: [
      { to: '/mantenimiento', icon: Icons.mantenimiento, label: 'Mantenimiento' },
      { to: '/repuestos', icon: Icons.repuestos, label: 'Repuestos' },
    ]
  },
  {
    title: 'Administración',
    links: [
      { to: '/finanzas', icon: Icons.finanzas, label: 'Finanzas' },
      { to: '/reportes', icon: Icons.reportes, label: 'Reportes' },
      { to: '/configuracion', icon: Icons.config, label: 'Ajustes' },
    ]
  }
];

export function Sidebar({ isOpen, onClose }: Props) {
  const handleLogout = async () => await supabase.auth.signOut();

  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-4 py-3.5 transition-all duration-300 border-l-4 overflow-hidden ${
      isOpen ? 'px-6' : 'px-0 justify-center'
    } ${
      isActive 
        ? 'bg-white text-black font-bold border-white' 
        : 'text-neutral-400 border-transparent hover:text-white hover:bg-white/5'
    }`;

  return (
    <>
      <style>{`
        .sidebar-scroll-invisible::-webkit-scrollbar { display: none !important; }
        .sidebar-scroll-invisible { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}</style>

      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden" onClick={onClose} />}

      <aside 
        className={`fixed md:relative inset-y-0 left-0 bg-black text-white h-full z-50 transition-all duration-300 ease-in-out shrink-0 border-r-2 border-neutral-800
          ${isOpen ? 'w-64 translate-x-0' : 'w-20 -translate-x-full md:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full overflow-hidden">
          
          <div className={`h-16 px-6 border-b-2 border-neutral-800 shrink-0 flex items-center transition-all duration-300 ${isOpen ? 'gap-3 justify-between' : 'justify-center'}`}>
            <div className="flex items-center gap-3">
              <Logo />
              <span className={`font-black text-xl tracking-tighter italic transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                HEAVYTRACK
              </span>
            </div>
            {isOpen && (
              <button onClick={onClose} className="md:hidden text-neutral-500 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="square" strokeLinejoin="miter" d="M15 19l-7-7 7-7" /></svg>
              </button>
            )}
          </div>
          
          {/* Mapeo de grupos con Subtítulos */}
          <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden sidebar-scroll-invisible">
            {menuGroups.map((group, index) => (
              <div key={index} className="mb-6">
                <div className={`px-6 mb-2 transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                  <span className="text-[10px] font-extrabold text-neutral-600 uppercase tracking-widest">
                    {group.title}
                  </span>
                </div>
                {!isOpen && index > 0 && <div className="w-8 h-px bg-neutral-800 mx-auto mb-4"></div>}
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.to}>
                      <NavLink to={link.to} onClick={() => window.innerWidth < 768 && onClose()} className={linkClasses}>
                        {link.icon}
                        <span className={`transition-opacity duration-300 whitespace-nowrap ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                          {link.label}
                        </span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="p-4 border-t border-neutral-800">
            <button 
              onClick={handleLogout}
              className={`w-full flex items-center transition-all duration-300 text-red-400 hover:text-red-300 hover:bg-red-500/10 font-bold border-l-4 border-transparent hover:border-red-400 ${
                isOpen ? 'px-5 py-3 gap-3' : 'py-3 justify-center'
              }`}
            >
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              <span className={`transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>Salir</span>
            </button>
          </div>

        </div>
      </aside>
    </>
  );
}