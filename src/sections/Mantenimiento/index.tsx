import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import { MantenimientoHeader } from './components/MantenimientoHeader';
import { MantenimientoTable } from './components/MantenimientoTable';
import { MantenimientoFormModal } from './components/MantenimientoFormModal';
import type { Mantenimiento } from './types';

export default function MantenimientoSection() {
  const [registros, setRegistros] = useState<Mantenimiento[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registroAEditar, setRegistroAEditar] = useState<Mantenimiento | null>(null);

  const fetchRegistros = async () => {
    const { data } = await supabase.from('mantenimientos').select(`*, maquinas ( codigo )`).order('created_at', { ascending: false });
    
    if (data) {
      const formateados = data.map(reg => ({
        ...reg,
        maquina_codigo: reg.maquinas?.codigo || 'N/A'
      }));
      setRegistros(formateados as Mantenimiento[]);
    }
  };

  useEffect(() => { fetchRegistros(); }, []);

  const handleEdit = (registro: Mantenimiento) => {
    setRegistroAEditar(registro);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este registro de mantenimiento de forma permanente?')) return;
    
    const { error } = await supabase.from('mantenimientos').delete().eq('id', id);
    if (error) alert('Error al borrar: ' + error.message);
    else fetchRegistros();
  };

  return (
    <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none">
      <MantenimientoHeader onOpenModal={() => { setRegistroAEditar(null); setIsModalOpen(true); }} />
      <MantenimientoTable registros={registros} onEdit={handleEdit} onDelete={handleDelete} />
      <MantenimientoFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { setIsModalOpen(false); fetchRegistros(); }} 
        registroEdit={registroAEditar}
      />
    </div>
  );
}