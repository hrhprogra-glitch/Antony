import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import { FinanzasHeader } from './components/FinanzasHeader';
import { FinanzasTable } from './components/FinanzasTable';
import { FinanzasFormModal } from './components/FinanzasFormModal';
import type { Transaccion } from './types';

export default function FinanzasSection() {
  const [transacciones, setTransacciones] = useState<Transaccion[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoModal, setTipoModal] = useState<'Ingreso' | 'Egreso'>('Ingreso');
  const [registroAEditar, setRegistroAEditar] = useState<Transaccion | null>(null);

  const fetchTransacciones = async () => {
    const { data } = await supabase.from('finanzas').select('*').order('created_at', { ascending: false });
    if (data) setTransacciones(data as Transaccion[]);
  };

  useEffect(() => { fetchTransacciones(); }, []);

  const handleEdit = (transaccion: Transaccion) => {
    setRegistroAEditar(transaccion);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Eliminar este registro financiero?')) return;
    const { error } = await supabase.from('finanzas').delete().eq('id', id);
    if (error) alert('Error al borrar: ' + error.message);
    else fetchTransacciones();
  };

  const balance = transacciones.reduce((acc, t) => t.tipo === 'Ingreso' ? acc + t.monto : acc - t.monto, 0);

  return (
    <div className="space-y-6">
      {/* Resumen de Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-(--bg-card) p-6 rounded-none border-2 border-black shadow-none transition-colors">
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest">Balance de Caja Chica</p>
          <p className={`text-4xl font-black mt-2 tracking-tight ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="bg-(--bg-card) p-8 rounded-none border-2 border-black shadow-none">
        <FinanzasHeader onOpenModal={(tipo) => { setRegistroAEditar(null); setTipoModal(tipo); setIsModalOpen(true); }} />
        <FinanzasTable transacciones={transacciones} onEdit={handleEdit} onDelete={handleDelete} />
        <FinanzasFormModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={() => { setIsModalOpen(false); fetchTransacciones(); }} 
          tipoDefault={tipoModal}
          registroEdit={registroAEditar}
        />
      </div>
    </div>
  );
}