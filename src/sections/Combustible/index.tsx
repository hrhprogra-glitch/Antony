import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import { CombustibleHeader } from './components/CombustibleHeader';
import { CombustibleTable } from './components/CombustibleTable';
import { CombustibleFormModal } from './components/CombustibleFormModal';
import type { RegistroCombustible } from './types';

export default function CombustibleSection() {
  const [registros, setRegistros] = useState<RegistroCombustible[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registroAEditar, setRegistroAEditar] = useState<RegistroCombustible | null>(null);

  const fetchRegistros = async () => {
    const { data } = await supabase.from('combustibles').select('*, maquinas(codigo)').order('created_at', { ascending: false });
    if (data) {
      const formateados = data.map(reg => ({ ...reg, maquina_codigo: reg.maquinas?.codigo || 'N/A' }));
      setRegistros(formateados as RegistroCombustible[]);
    }
  };

  useEffect(() => { fetchRegistros(); }, []);

  const handleEdit = (registro: RegistroCombustible) => {
    setRegistroAEditar(registro);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este registro de combustible?')) return;
    const { error } = await supabase.from('combustibles').delete().eq('id', id);
    if (error) alert('Error al borrar: ' + error.message);
    else fetchRegistros();
  };

  return (
    <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none">
      <CombustibleHeader onOpenModal={() => { setRegistroAEditar(null); setIsModalOpen(true); }} />
      <CombustibleTable registros={registros} onEdit={handleEdit} onDelete={handleDelete} />
      <CombustibleFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => { setIsModalOpen(false); fetchRegistros(); }} 
        registroEdit={registroAEditar}
      />
    </div>
  );
}