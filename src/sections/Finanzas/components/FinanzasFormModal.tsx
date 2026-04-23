import { useState, useEffect } from 'react';
import { supabase } from '../../../db/supabase';

interface Props { isOpen: boolean; onClose: () => void; onSuccess: () => void; tipoDefault?: 'Ingreso' | 'Egreso'; registroEdit?: any; }

export function FinanzasFormModal({ isOpen, onClose, onSuccess, tipoDefault = 'Ingreso', registroEdit }: Props) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    fecha: new Date().toISOString().split('T')[0],
    descripcion: '', categoria: 'Otros', tipo: tipoDefault, monto: ''
  });

  useEffect(() => {
    if (registroEdit) {
      setFormData(registroEdit);
    } else {
      setFormData({
        fecha: new Date().toISOString().split('T')[0],
        descripcion: '', categoria: 'Otros', tipo: tipoDefault, monto: ''
      });
    }
  }, [registroEdit, isOpen, tipoDefault]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataToSave = {
      ...formData,
      monto: formData.monto === '' ? 0 : Number(formData.monto)
    };

    let error;
    if (registroEdit) {
      const { error: err } = await supabase.from('finanzas').update(dataToSave).eq('id', registroEdit.id);
      error = err;
    } else {
      const { error: err } = await supabase.from('finanzas').insert([dataToSave]);
      error = err;
    }

    setLoading(false);
    if (error) alert('Error: ' + error.message); else onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-(--bg-card) border-2 border-black w-full max-w-md rounded-none shadow-none flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-(--border-color)">
          <h2 className="text-xl font-bold text-(--text-main)">
            {registroEdit ? 'Editar Transacción' : `Nueva Transacción (${formData.tipo})`}
          </h2>
          <button onClick={onClose} className="text-(--text-muted) hover:text-red-500">✖</button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4 text-(--text-main)">
            <div className="grid grid-cols-2 gap-4">
              <input required type="date" className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                value={formData.fecha} onChange={e => setFormData({...formData, fecha: e.target.value})} />
              
              {/* SOLUCIÓN DEL CERO */}
              <input required type="number" step="0.01" placeholder="Monto $" className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                value={formData.monto} onChange={e => setFormData({...formData, monto: e.target.value === '' ? '' : Number(e.target.value)})} />
            </div>

            <input required type="text" placeholder="Descripción (Ej. Cobro cliente)" className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
              value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />

            <div className="grid grid-cols-2 gap-4">
              <select className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                value={formData.categoria} onChange={e => setFormData({...formData, categoria: e.target.value})}>
                <option value="Trabajo">Trabajo</option>
                <option value="Repuestos">Repuestos</option>
                <option value="Combustible">Combustible</option>
                <option value="Mantenimiento">Mantenimiento</option>
                <option value="Otros">Otros</option>
              </select>
              <select className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                <option value="Ingreso">Ingreso</option>
                <option value="Egreso">Egreso</option>
              </select>
            </div>

            <button type="submit" disabled={loading} className={`w-full text-white font-bold py-4 px-4 rounded-none text-[11px] uppercase tracking-widest transition-colors border-2 border-black active:scale-95 mt-4 ${formData.tipo === 'Ingreso' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-500 hover:bg-red-600'}`}>
              {loading ? 'Guardando...' : (registroEdit ? 'Actualizar Transacción' : 'Guardar Transacción')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}