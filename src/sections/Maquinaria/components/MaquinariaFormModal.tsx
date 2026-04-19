import { useState } from 'react';
import { supabase } from '../../../db/supabase';

interface Props { isOpen: boolean; onClose: () => void; onSuccess: () => void; }

export function MaquinariaFormModal({ isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '', tipo: 'Excavadora', marca: '', modelo: '', estado: 'operativa', horas_uso: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('maquinas').insert([formData]);
    setLoading(false);
    if (error) alert('Error: ' + error.message);
    else onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-(--bg-card) border-2 border-black w-full max-w-md rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-(--border-color)">
          <h2 className="text-xl font-bold text-(--text-main)">Registrar Nueva Máquina</h2>
          <button onClick={onClose} className="text-(--text-muted) hover:text-red-500">✖</button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-(--text-main)">
            <input required type="text" placeholder="Código (Ej: EXC-005)" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
              value={formData.codigo} onChange={e => setFormData({...formData, codigo: e.target.value})} />
            
            <div className="grid grid-cols-2 gap-4">
              <select className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)" value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                <option value="Excavadora">Excavadora</option>
                <option value="Cargador Frontal">Cargador Frontal</option>
                <option value="Volquete">Volquete</option>
                <option value="Motoniveladora">Motoniveladora</option>
              </select>
              <select className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)" value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})}>
                <option value="operativa">Operativa</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="inactiva">Inactiva</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="Marca" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)" value={formData.marca} onChange={e => setFormData({...formData, marca: e.target.value})} />
              <input required type="text" placeholder="Modelo" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)" value={formData.modelo} onChange={e => setFormData({...formData, modelo: e.target.value})} />
            </div>

            <input required type="number" placeholder="Horas de uso" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)" value={formData.horas_uso} onChange={e => setFormData({...formData, horas_uso: Number(e.target.value)})} />

            <button type="submit" disabled={loading} className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-none text-[11px] uppercase tracking-widest transition-colors active:scale-95">
              {loading ? 'Guardando...' : 'Registrar Máquina'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}