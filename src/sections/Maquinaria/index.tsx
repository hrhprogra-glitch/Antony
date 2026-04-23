import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import type { Maquina } from './types';
import { MaquinariaHeader } from './components/MaquinariaHeader';
import { MaquinariaTable } from './components/MaquinariaTable';
import { MaquinariaFormModal } from './components/MaquinariaFormModal';

export default function MaquinariaSection() {
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [maquinaAEditar, setMaquinaAEditar] = useState<Maquina | null>(null);

  const fetchMaquinas = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.from('maquinas').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setMaquinas(data as Maquina[]);
    } catch (error) {
      console.error('Error cargando máquinas:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMaquinas(); }, []);

  // Función de ingeniero para borrar con seguridad
  const handleDelete = async (id: string) => {
    const confirmar = window.confirm('¿Estás seguro de que deseas eliminar esta máquina? Esto no se puede deshacer.');
    if (!confirmar) return;

    const { error } = await supabase.from('maquinas').delete().eq('id', id);
    if (error) {
      alert('No se pudo borrar: Es posible que esta máquina tenga mantenimientos o trabajos asociados (Error de Foreign Key).');
    } else {
      fetchMaquinas();
    }
  };

  // Prepara el modal para edición
  const handleEdit = (maquina: Maquina) => {
    setMaquinaAEditar(maquina);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none">
      <MaquinariaHeader onOpenModal={() => { setMaquinaAEditar(null); setIsModalOpen(true); }} />
      
      {loading ? (
        <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>
      ) : (
        <MaquinariaTable maquinas={maquinas} onEdit={handleEdit} onDelete={handleDelete} />
      )}

      <MaquinariaFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { setIsModalOpen(false); fetchMaquinas(); }} 
        maquinaEdit={maquinaAEditar}
      />
    </div>
  );
}