import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import { MantenimientoHeader } from './components/MantenimientoHeader';
import { MantenimientoTable } from './components/MantenimientoTable';
import { MantenimientoFormModal } from './components/MantenimientoFormModal';

export default function MantenimientoSection() {
  const [registros, setRegistros] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchRegistros = async () => {
    // Usamos la relación para traer el código de la máquina en la misma consulta
    const { data } = await supabase.from('mantenimientos').select(`
      *,
      maquinas ( codigo )
    `).order('created_at', { ascending: false });
    
    if (data) {
      // Mapeamos para que la tabla lo entienda igual que antes
      const formateados = data.map(reg => ({
        ...reg,
        maquina_codigo: reg.maquinas.codigo
      }));
      setRegistros(formateados);
    }
  };

  useEffect(() => { fetchRegistros(); }, []);

  return (
    <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none">
      <MantenimientoHeader onOpenModal={() => setIsModalOpen(true)} />
      <MantenimientoTable registros={registros} />
      <MantenimientoFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { setIsModalOpen(false); fetchRegistros(); }} 
      />
    </div>
  );
}