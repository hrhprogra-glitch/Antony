import { useState, useEffect } from 'react';
import { supabase } from '../../../db/supabase';

interface Props { isOpen: boolean; onClose: () => void; onSuccess: () => void; repuestoEdit?: any; }

export function RepuestosFormModal({ isOpen, onClose, onSuccess, repuestoEdit }: Props) {
  const [loading, setLoading] = useState(false);
  // Iniciamos todos los numéricos vacíos ('')
  const [formData, setFormData] = useState<any>({
    codigo: '', nombre: '', categoria: 'Filtros', precio: '', stock: '', stock_minimo: '',
  });

  useEffect(() => {
    if (repuestoEdit) setFormData(repuestoEdit);
    else setFormData({ codigo: '', nombre: '', categoria: 'Filtros', precio: '', stock: '', stock_minimo: '' });
  }, [repuestoEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    let error;
    if (repuestoEdit) {
      const { error: err } = await supabase.from('repuestos').update(formData).eq('id', repuestoEdit.id);
      error = err;
    } else {
      const { error: err } = await supabase.from('repuestos').insert([formData]);
      error = err;
    }
    
    setLoading(false);
    if (error) alert('Error: ' + error.message);
    else onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-(--bg-card) border-2 border-black w-full max-w-md rounded-none">
        <div className="flex justify-between items-center p-6 border-b border-(--border-color)">
          <h2 className="text-xl font-bold text-(--text-main)">{repuestoEdit ? 'Editar Repuesto' : 'Nuevo Repuesto'}</h2>
          <button onClick={onClose} className="text-(--text-muted) hover:text-red-500">✖</button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-(--text-main)">
            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="Código" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                value={formData.codigo} onChange={e => setFormData({...formData, codigo: e.target.value})} />
              <input required type="text" placeholder="Categoría" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})} />
            </div>
            <input required type="text" placeholder="Nombre" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
              value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />

            <div className="grid grid-cols-3 gap-4">
              {/* Solución del Cero implementada en todos los campos */}
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400">Precio ($)</label>
                <input required type="number" step="0.01" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.precio} 
                  onChange={e => setFormData({...formData, precio: e.target.value === '' ? '' : Number(e.target.value)})} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400">Stock</label>
                <input required type="number" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.stock} 
                  onChange={e => setFormData({...formData, stock: e.target.value === '' ? '' : Number(e.target.value)})} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400">Mínimo</label>
                <input required type="number" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.stock_minimo} 
                  onChange={e => setFormData({...formData, stock_minimo: e.target.value === '' ? '' : Number(e.target.value)})} />
              </div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-black text-white font-bold py-3 uppercase text-[11px] tracking-widest hover:bg-neutral-800 active:scale-95 transition-colors">
              {loading ? 'Guardando...' : (repuestoEdit ? 'Actualizar' : 'Registrar')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}