import { useState, useEffect } from 'react';
import { supabase } from '../../../db/supabase';

interface Props { isOpen: boolean; onClose: () => void; onSuccess: () => void; registroEdit?: any; }

export function TrabajosFormModal({ isOpen, onClose, onSuccess, registroEdit }: Props) {
  const [loading, setLoading] = useState(false);
  const [maquinas, setMaquinas] = useState<{id: string, codigo: string}[]>([]);
  
  // SOLUCIÓN: Agregamos fecha_fin y quitamos los ceros iniciales
  const [formData, setFormData] = useState<any>({
    cliente: '', tipo_trabajo: '', maquina_id: '',
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_fin: '',
    horas_trabajadas: '', 
    ingreso_generado: '', 
    estado: 'Pendiente'
  });

  useEffect(() => {
    if (isOpen) {
      supabase.from('maquinas').select('id, codigo').then(({ data }) => {
        if (data) { 
          setMaquinas(data); 
          if (data.length > 0 && !registroEdit) setFormData((p: any) => ({ ...p, maquina_id: data[0].id })); 
        }
      });

      if (registroEdit) {
        setFormData({
          ...registroEdit,
          fecha_fin: registroEdit.fecha_fin || '' // Manejamos null
        });
      } else {
        setFormData((p: any) => ({
          cliente: '', tipo_trabajo: '', maquina_id: p.maquina_id,
          fecha_inicio: new Date().toISOString().split('T')[0],
          fecha_fin: '',
          horas_trabajadas: '', ingreso_generado: '', estado: 'Pendiente'
        }));
      }
    }
  }, [isOpen, registroEdit]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Preparar data limpia
    const dataToSave = {
      cliente: formData.cliente,
      tipo_trabajo: formData.tipo_trabajo,
      maquina_id: formData.maquina_id,
      fecha_inicio: formData.fecha_inicio,
      fecha_fin: formData.fecha_fin === '' ? null : formData.fecha_fin,
      horas_trabajadas: formData.horas_trabajadas === '' ? 0 : Number(formData.horas_trabajadas),
      ingreso_generado: formData.ingreso_generado === '' ? 0 : Number(formData.ingreso_generado),
      estado: formData.estado
    };

    let error;
    if (registroEdit) {
      const { error: err } = await supabase.from('trabajos').update(dataToSave).eq('id', registroEdit.id);
      error = err;
    } else {
      const { error: err } = await supabase.from('trabajos').insert([dataToSave]);
      error = err;
    }

    setLoading(false);
    if (error) alert('Error: ' + error.message); else onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-(--bg-card) border-2 border-black w-full max-w-2xl rounded-none shadow-none flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-(--border-color)">
          <h2 className="text-xl font-bold text-(--text-main)">{registroEdit ? 'Editar Trabajo' : 'Nuevo Trabajo'}</h2>
          <button onClick={onClose} className="text-(--text-muted) hover:text-red-500">✖</button>
        </div>
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4 text-(--text-main)">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Cliente</label>
                <input required type="text" placeholder="Nombre o Empresa" className="w-full px-4 py-2 border rounded-none bg-(--bg-app)"
                  value={formData.cliente} onChange={e => setFormData({...formData, cliente: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Servicio</label>
                <input required type="text" placeholder="Ej. Movimiento de tierras" className="w-full px-4 py-2 border rounded-none bg-(--bg-app)"
                  value={formData.tipo_trabajo} onChange={e => setFormData({...formData, tipo_trabajo: e.target.value})} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Máquina</label>
                <select className="w-full px-4 py-2 border rounded-none bg-(--bg-app)"
                  value={formData.maquina_id} onChange={e => setFormData({...formData, maquina_id: e.target.value})}>
                  {maquinas.map(m => <option key={m.id} value={m.id}>{m.codigo}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Estado</label>
                <select className="w-full px-4 py-2 border rounded-none bg-(--bg-app)"
                  value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})}>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Progreso">En Progreso</option>
                  <option value="Completado">Completado</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Fecha Inicio</label>
                <input required type="date" className="w-full px-4 py-2 border rounded-none bg-(--bg-app)"
                  value={formData.fecha_inicio} onChange={e => setFormData({...formData, fecha_inicio: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Fecha Fin (Opcional)</label>
                <input type="date" className="w-full px-4 py-2 border rounded-none bg-(--bg-app)"
                  value={formData.fecha_fin} onChange={e => setFormData({...formData, fecha_fin: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Horas Trabajadas</label>
                <input required type="number" step="0.5" className="w-full px-4 py-2 border rounded-none bg-(--bg-app)"
                  value={formData.horas_trabajadas} onChange={e => setFormData({...formData, horas_trabajadas: e.target.value === '' ? '' : Number(e.target.value)})} />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Ingreso Generado ($)</label>
                <input required type="number" step="0.01" className="w-full px-4 py-2 border rounded-none bg-(--bg-app)"
                  value={formData.ingreso_generado} onChange={e => setFormData({...formData, ingreso_generado: e.target.value === '' ? '' : Number(e.target.value)})} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-4 px-4 rounded-none text-[11px] uppercase tracking-widest transition-colors active:scale-95 mt-4">
              {loading ? 'Guardando...' : (registroEdit ? 'Actualizar Trabajo' : 'Guardar Trabajo')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}