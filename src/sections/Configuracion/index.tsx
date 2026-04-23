import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import { ThemeSettings } from './components/ThemeSettings';
import { UsuariosTable } from './components/UsuariosTable';
import { UsuariosFormModal } from './components/UsuariosFormModal';
import type { Usuario } from './types';

export default function ConfiguracionSection() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarioAEditar, setUsuarioAEditar] = useState<Usuario | null>(null);

  const fetchUsuarios = async () => {
    const { data } = await supabase.from('usuarios').select('*').order('created_at', { ascending: true });
    if (data) setUsuarios(data as Usuario[]);
  };

  useEffect(() => { fetchUsuarios(); }, []);

  const handleEdit = (usuario: Usuario) => {
    setUsuarioAEditar(usuario);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar el perfil de este usuario del sistema?')) return;
    const { error } = await supabase.from('usuarios').delete().eq('id', id);
    if (error) alert('Error al borrar: ' + error.message);
    else fetchUsuarios();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-(--text-main)">
          Configuración
        </h1>
        <p className="text-(--text-muted) mt-1 font-medium">Gestiona tus preferencias y accesos del sistema.</p>
      </div>

      <ThemeSettings />

      {/* Panel de Gestión de Usuarios 100% Funcional */}
      <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none transition-colors">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-4">
          <div>
            <h2 className="text-xl font-black text-(--text-main) uppercase tracking-widest">Gestión de Usuarios</h2>
            <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest mt-1">Control de roles del equipo</p>
          </div>
          <button 
            onClick={() => { setUsuarioAEditar(null); setIsModalOpen(true); }} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-none text-[11px] font-bold uppercase tracking-widest transition-colors border-2 border-black shadow-none active:scale-95"
          >
            + Nuevo Usuario
          </button>
        </div>
        
        {/* Aquí inyectamos la Tabla */}
        <UsuariosTable usuarios={usuarios} onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* Aquí inyectamos el Modal */}
      <UsuariosFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { setIsModalOpen(false); fetchUsuarios(); }}
        usuarioEdit={usuarioAEditar}
      />
    </div>
  );
}