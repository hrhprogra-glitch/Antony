import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import { CombustibleHeader } from './components/CombustibleHeader';
import { CombustibleTable } from './components/CombustibleTable';
import { CombustibleFormModal } from './components/CombustibleFormModal';

export default function CombustibleSection() {
  const [registros, setRegistros] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRegistros = async () => {
    const { data } = await supabase.from('combustibles').select('*, maquinas(codigo)').order('created_at', { ascending: false });
    if (data) setRegistros(data.map(reg => ({ ...reg, maquina_codigo: reg.maquinas.codigo })));
  };

  useEffect(() => { fetchRegistros(); }, []);

  return (
    <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none">
      {/* ⚠️ Nota: Ve a CombustibleHeader.tsx y agrégale la propiedad onOpenModal */}
      <CombustibleHeader onOpenModal={() => setIsModalOpen(true)} />
      <CombustibleTable registros={registros} />
      <CombustibleFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchRegistros(); }} />
    </div>
  );
}