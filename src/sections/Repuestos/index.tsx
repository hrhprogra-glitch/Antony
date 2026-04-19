import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import type { Repuesto } from './types';
import { RepuestosHeader } from './components/RepuestosHeader';
import { RepuestosTable } from './components/RepuestosTable';
import { RepuestosFormModal } from './components/RepuestosFormModal';

export default function RepuestosSection() {
  const [repuestos, setRepuestos] = useState<Repuesto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRepuestos = async () => {
    const { data } = await supabase.from('repuestos').select('*').order('created_at', { ascending: false });
    if (data) setRepuestos(data as Repuesto[]);
  };

  useEffect(() => { fetchRepuestos(); }, []);

  return (
    <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none">
      <RepuestosHeader onOpenModal={() => setIsModalOpen(true)} />
      <RepuestosTable repuestos={repuestos} />
      <RepuestosFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { setIsModalOpen(false); fetchRepuestos(); }} 
      />
    </div>
  );
}