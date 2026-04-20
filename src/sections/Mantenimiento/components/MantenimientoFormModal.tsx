import { useState, useEffect } from 'react';
import { supabase } from '../../../db/supabase';

interface Props { isOpen: boolean; onClose: () => void; onSuccess: () => void; }

export function MantenimientoFormModal({ isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [maquinas, setMaquinas] = useState<{id: string, codigo: string}[]>([]);
  
  const [formData, setFormData] = useState({
    maquina_id: '',
    tipo: 'Preventivo',
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '',
    costo: 0,
    responsable: '',
  });

  // Cargar máquinas para el selector
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
    const { error } = await supabase.from('mantenimientos').insert([formData]);
    setLoading(false);
    if (error) alert('Error: ' + error.message);
    else onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-(--bg-card) border-2 border-black w-full max-w-md rounded-none shadow-none flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-(--border-color)">
          <h2 className="text-xl font-bold text-(--text-main)">Registrar Mantenimiento</h2>
          <button onClick={onClose} className="text-(--text-muted) hover:text-red-500">✖</button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-(--text-main)">
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Máquina</label>
                <select className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.maquina_id} onChange={e => setFormData({...formData, maquina_id: e.target.value})}>
                  {maquinas.map(m => <option key={m.id} value={m.id}>{m.codigo}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Tipo</label>
                <select className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                  <option value="Preventivo">Preventivo</option>
                  <option value="Correctivo">Correctivo</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Fecha</label>
                <input required type="date" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.fecha} onChange={e => setFormData({...formData, fecha: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Costo ($)</label>
                <input required type="number" step="0.01" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.costo} onChange={e => setFormData({...formData, costo: Number(e.target.value)})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Descripción del Trabajo</label>
              <textarea required rows={2} className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Mecánico / Responsable</label>
              <input required type="text" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                value={formData.responsable} onChange={e => setFormData({...formData, responsable: e.target.value})} />
            </div>

            <button type="submit" disabled={loading} className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-none text-[11px] uppercase tracking-widest transition-colors active:scale-95">
              {loading ? 'Guardando...' : 'Guardar Historial'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}