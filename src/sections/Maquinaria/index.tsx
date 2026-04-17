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

  return (
    <div className="bg-(--bg-card) p-8 rounded-2xl border border-(--border-color) shadow-sm">
      <MaquinariaHeader onOpenModal={() => setIsModalOpen(true)} />
      
      {loading ? (
        <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>
      ) : (
        <MaquinariaTable maquinas={maquinas} />
      )}

      <MaquinariaFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { setIsModalOpen(false); fetchMaquinas(); }} 
      />
    </div>
  );
}