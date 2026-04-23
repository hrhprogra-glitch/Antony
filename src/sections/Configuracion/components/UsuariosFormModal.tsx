import { useState, useEffect } from 'react';
import { supabase } from '../../../db/supabase';

interface Props { isOpen: boolean; onClose: () => void; onSuccess: () => void; usuarioEdit?: any; }

export function UsuariosFormModal({ isOpen, onClose, onSuccess, usuarioEdit }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    nombre: '', email: '', rol: 'Operador', estado: 'Activo'
  });

  useEffect(() => {
    if (usuarioEdit) {
      setFormData(usuarioEdit);
    } else {
      setFormData({ nombre: '', email: '', rol: 'Operador', estado: 'Activo' });
    }
  }, [usuarioEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let error;
    if (usuarioEdit) {
      const { error: err } = await supabase.from('usuarios').update(formData).eq('id', usuarioEdit.id);
      error = err;
    } else {
      const { error: err } = await supabase.from('usuarios').insert([formData]);
      error = err;
    }

    setLoading(false);
    if (error) alert('Error: ' + error.message); else onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-(--bg-card) border-2 border-black w-full max-w-md rounded-none shadow-none flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-(--border-color)">
          <h2 className="text-xl font-bold text-(--text-main)">
            {usuarioEdit ? 'Editar Usuario' : 'Nuevo Usuario (Acceso)'}
          </h2>
          <button onClick={onClose} className="text-(--text-muted) hover:text-red-500">✖</button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-(--text-main)">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-neutral-500">Nombre Completo</label>
              <input required type="text" className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-neutral-500">Correo (Debe coincidir con Login)</label>
              <input required type="email" className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-neutral-500">Rol</label>
                <select className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                  value={formData.rol} onChange={e => setFormData({...formData, rol: e.target.value})}>
                  <option value="Administrador">Administrador</option>
                  <option value="Operador">Operador</option>
                  <option value="Mecánico">Mecánico</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-1 text-neutral-500">Estado</label>
                <select className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                  value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-4 px-4 rounded-none text-[11px] uppercase tracking-widest transition-colors active:scale-95 mt-4">
              {loading ? 'Guardando...' : (usuarioEdit ? 'Actualizar Usuario' : 'Registrar Usuario')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}