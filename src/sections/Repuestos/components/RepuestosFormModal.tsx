import { useState } from 'react';
import { supabase } from '../../../db/supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function RepuestosFormModal({ isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    codigo: '',
    nombre: '',
    categoria: 'Filtros',
    precio: 0,
    stock: 0,
    stock_minimo: 5,
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from('repuestos').insert([formData]);
    
    setLoading(false);
    if (error) {
      alert('Error: ' + error.message);
    } else {
      onSuccess(); // Recarga la tabla
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-(--bg-card) border border-(--border-color) w-full max-w-md rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-(--border-color)">
          <h2 className="text-xl font-bold text-(--text-main)">Nuevo Repuesto</h2>
          <button onClick={onClose} className="text-(--text-muted) hover:text-red-500">✖</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4 text-(--text-main)">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Código</label>
                <input required type="text" placeholder="FIL-002" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.codigo} onChange={e => setFormData({...formData, codigo: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Categoría</label>
                <input required type="text" placeholder="Filtros" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">Nombre del Repuesto</label>
              <input required type="text" placeholder="Filtro de Aire CAT" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Precio ($)</label>
                <input required type="number" step="0.01" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.precio} onChange={e => setFormData({...formData, precio: Number(e.target.value)})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Stock</label>
                <input required type="number" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Min. Alerta</label>
                <input required type="number" className="w-full px-4 py-2 border rounded-lg bg-(--bg-app)"
                  value={formData.stock_minimo} onChange={e => setFormData({...formData, stock_minimo: Number(e.target.value)})} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl mt-4">
              {loading ? 'Guardando...' : 'Registrar Repuesto'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}