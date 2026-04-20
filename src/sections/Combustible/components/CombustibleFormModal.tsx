import { useState, useEffect } from 'react';
import { supabase } from '../../../db/supabase';

interface Props { isOpen: boolean; onClose: () => void; onSuccess: () => void; }

export function CombustibleFormModal({ isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [maquinas, setMaquinas] = useState<{id: string, codigo: string}[]>([]);
  
  const [formData, setFormData] = useState({
    maquina_id: '',
    fecha: new Date().toISOString().split('T')[0],
    galones: 0,
    costo_total: 0,
    responsable: '',
  });

  useEffect(() => {
    if (isOpen) {
      supabase.from('maquinas').select('id, codigo').then(({ data }) => {
        if (data) {
          setMaquinas(data);
          if (data.length > 0) setFormData(prev => ({ ...prev, maquina_id: data[0].id }));
        }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('combustibles').insert([formData]);
    setLoading(false);
    if (error) alert('Error: ' + error.message);
    else onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-(--bg-card) border-2 border-black w-full max-w-md rounded-none shadow-none flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-(--border-color)">
          <h2 className="text-xl font-bold text-(--text-main)">Registrar Combustible</h2>
          <button onClick={onClose} className="text-(--text-muted) hover:text-red-500">✖</button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-(--text-main)">
            <div>
              <label className="block text-sm font-semibold mb-1">Máquina</label>
              <select className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                value={formData.maquina_id} onChange={e => setFormData({...formData, maquina_id: e.target.value})}>
                {maquinas.map(m => <option key={m.id} value={m.id}>{m.codigo}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Fecha</label>
                <input required type="date" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.fecha} onChange={e => setFormData({...formData, fecha: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Galones</label>
                <input required type="number" step="0.1" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.galones} onChange={e => setFormData({...formData, galones: Number(e.target.value)})} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Costo Total ($)</label>
                <input required type="number" step="0.01" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.costo_total} onChange={e => setFormData({...formData, costo_total: Number(e.target.value)})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Operador</label>
                <input required type="text" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.responsable} onChange={e => setFormData({...formData, responsable: e.target.value})} />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-none text-[11px] uppercase tracking-widest transition-colors active:scale-95">
              {loading ? 'Guardando...' : 'Guardar Registro'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}