import { useState, useEffect } from 'react';
import { supabase } from '../../../db/supabase';

export function TrabajosFormModal({ isOpen, onClose, onSuccess }: any) {
  const [loading, setLoading] = useState(false);
  const [maquinas, setMaquinas] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    cliente: '', tipo_trabajo: '', maquina_id: '',
    fecha_inicio: new Date().toISOString().split('T')[0],
    horas_trabajadas: 0, ingreso_generado: 0, estado: 'Pendiente'
  });

  useEffect(() => {
    if (isOpen) {
      supabase.from('maquinas').select('id, codigo').then(({ data }) => {
        if (data) { setMaquinas(data); if (data.length > 0) setFormData(p => ({ ...p, maquina_id: data[0].id })); }
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('trabajos').insert([formData]);
    setLoading(false);
    if (error) alert('Error: ' + error.message); else onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-(--bg-card) border-2 border-black w-full max-w-md rounded-none shadow-none flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-(--border-color)">
          <h2 className="text-xl font-bold text-(--text-main)">Nuevo Trabajo</h2>
          <button onClick={onClose} className="text-(--text-muted) hover:text-red-500">✖</button>
        </div>
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4 text-(--text-main)">
            <input required type="text" placeholder="Cliente" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
              value={formData.cliente} onChange={e => setFormData({...formData, cliente: e.target.value})} />
            
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="Tipo (ej. Zanja)" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                value={formData.tipo_trabajo} onChange={e => setFormData({...formData, tipo_trabajo: e.target.value})} />
              <select className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                value={formData.maquina_id} onChange={e => setFormData({...formData, maquina_id: e.target.value})}>
                {maquinas.map(m => <option key={m.id} value={m.id}>{m.codigo}</option>)}
              </select>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <input required type="date" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                value={formData.fecha_inicio} onChange={e => setFormData({...formData, fecha_inicio: e.target.value})} />
              <input required type="number" placeholder="Horas" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                value={formData.horas_trabajadas} onChange={e => setFormData({...formData, horas_trabajadas: Number(e.target.value)})} />
              <input required type="number" placeholder="$$$" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                value={formData.ingreso_generado} onChange={e => setFormData({...formData, ingreso_generado: Number(e.target.value)})} />
            </div>

            <select className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
              value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})}>
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completado">Completado</option>
            </select>

            <button type="submit" disabled={loading} className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-none text-[11px] uppercase tracking-widest transition-colors active:scale-95">Guardar Trabajo</button>
          </form>
        </div>
      </div>
    </div>
  );
}