import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import { FinanzasHeader } from './components/FinanzasHeader';
import { FinanzasTable } from './components/FinanzasTable';
import { FinanzasFormModal } from './components/FinanzasFormModal';

export default function FinanzasSection() {
  const [transacciones, setTransacciones] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tipoModal, setTipoModal] = useState<'Ingreso' | 'Egreso'>('Ingreso');

  const fetchTransacciones = async () => {
    const { data } = await supabase.from('finanzas').select('*').order('created_at', { ascending: false });
    if (data) setTransacciones(data);
  };

  useEffect(() => { fetchTransacciones(); }, []);

  const balance = transacciones.reduce((acc, t) => t.tipo === 'Ingreso' ? acc + t.monto : acc - t.monto, 0);

  return (
    <div className="space-y-6">
      {/* Resumen de Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-(--bg-card) p-6 rounded-2xl border border-(--border-color) shadow-sm transition-colors">
          <p className="text-sm text-(--text-muted) font-medium">Balance Total</p>
          <p className={`text-3xl font-bold mt-2 ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      <div className="bg-(--bg-card) p-8 rounded-2xl border border-(--border-color) shadow-sm">
        <FinanzasHeader onOpenModal={(tipo) => { setTipoModal(tipo); setIsModalOpen(true); }} />
        <FinanzasTable transacciones={transacciones} />
        <FinanzasFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={() => { setIsModalOpen(false); fetchTransacciones(); }} tipoDefault={tipoModal} />
      </div>
    </div>
  );
}