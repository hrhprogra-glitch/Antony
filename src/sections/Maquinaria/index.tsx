import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase'; // Asegúrate de que la ruta sea correcta
import type { Maquina } from './types';
import { MaquinariaHeader } from './components/MaquinariaHeader';
import { MaquinariaTable } from './components/MaquinariaTable';

export default function MaquinariaSection() {
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔍 Función para traer los datos de Supabase
  const fetchMaquinas = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('maquinas')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setMaquinas(data as Maquina[]);
    } catch (error) {
      console.error('Error cargando máquinas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta una sola vez al montar el componente
  useEffect(() => {
    fetchMaquinas();
  }, []);

  return (
    <div className="bg-white p-8 rounded-2xl border border-neutral-100 shadow-sm">
      <MaquinariaHeader />
      
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-neutral-900"></div>
        </div>
      ) : (
        <MaquinariaTable maquinas={maquinas} />
      )}
    </div>
  );
}