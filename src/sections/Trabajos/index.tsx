import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import { TrabajosHeader } from './components/TrabajosHeader';
import { TrabajosTable } from './components/TrabajosTable';
import { TrabajosFormModal } from './components/TrabajosFormModal';

export default function TrabajosSection() {
  const [trabajos, setTrabajos] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTrabajos = async () => {
    const { data } = await supabase.from('trabajos').select('*, maquinas(codigo)').order('created_at', { ascending: false });
    if (data) setTrabajos(data.map(t => ({ ...t, maquina_codigo: t.maquinas.codigo })));
  };

  useEffect(() => { fetchTrabajos(); }, []);

  return (
    <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none">
      {/* ⚠️ Agrega onOpenModal a TrabajosHeader.tsx */}
      <TrabajosHeader onOpenModal={() => setIsModalOpen(true)} />
      <TrabajosTable trabajos={trabajos} />
      <TrabajosFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchTrabajos(); }} />
    </div>
  );
}