import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import { TrabajosHeader } from './components/TrabajosHeader';
import { TrabajosTable } from './components/TrabajosTable';
import { TrabajosFormModal } from './components/TrabajosFormModal';
import type { Trabajo } from './types';

export default function TrabajosSection() {
  const [trabajos, setTrabajos] = useState<Trabajo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registroAEditar, setRegistroAEditar] = useState<Trabajo | null>(null);

  const fetchTrabajos = async () => {
    const { data } = await supabase.from('trabajos').select('*, maquinas(codigo)').order('created_at', { ascending: false });
    if (data) setTrabajos(data.map(t => ({ ...t, maquina_codigo: t.maquinas?.codigo || 'N/A' })));
  };

  useEffect(() => { fetchTrabajos(); }, []);

  const handleEdit = (trabajo: Trabajo) => {
    setRegistroAEditar(trabajo);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este trabajo?')) return;
    const { error } = await supabase.from('trabajos').delete().eq('id', id);
    if (error) alert('Error al borrar: ' + error.message);
    else fetchTrabajos();
  };

  return (
    <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none">
      <TrabajosHeader onOpenModal={() => { setRegistroAEditar(null); setIsModalOpen(true); }} />
      <TrabajosTable trabajos={trabajos} onEdit={handleEdit} onDelete={handleDelete} />
      <TrabajosFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { setIsModalOpen(false); fetchTrabajos(); }}
        registroEdit={registroAEditar}
      />
    </div>
  );
}