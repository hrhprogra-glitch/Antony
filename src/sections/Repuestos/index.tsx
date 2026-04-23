import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import type { Repuesto } from './types';
import { RepuestosHeader } from './components/RepuestosHeader';
import { RepuestosTable } from './components/RepuestosTable';
import { RepuestosFormModal } from './components/RepuestosFormModal';

export default function RepuestosSection() {
  const [repuestos, setRepuestos] = useState<Repuesto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [repuestoAEditar, setRepuestoAEditar] = useState<Repuesto | null>(null);

  const fetchRepuestos = async () => {
    const { data } = await supabase.from('repuestos').select('*').order('created_at', { ascending: false });
    if (data) setRepuestos(data as Repuesto[]);
  };

  useEffect(() => { fetchRepuestos(); }, []);

  const handleEdit = (repuesto: Repuesto) => {
    setRepuestoAEditar(repuesto);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este repuesto del inventario?')) return;
    const { error } = await supabase.from('repuestos').delete().eq('id', id);
    if (error) alert('No se puede eliminar: El repuesto está referenciado en un mantenimiento.');
    else fetchRepuestos();
  };

  return (
    <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black">
      <RepuestosHeader onOpenModal={() => { setRepuestoAEditar(null); setIsModalOpen(true); }} />
      <RepuestosTable repuestos={repuestos} onEdit={handleEdit} onDelete={handleDelete} />
      <RepuestosFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { setIsModalOpen(false); fetchRepuestos(); }}
        repuestoEdit={repuestoAEditar}
      />
    </div>
  );
}