import { useState, useEffect } from 'react';
import { supabase } from '../../../db/supabase';

interface Props { isOpen: boolean; onClose: () => void; onSuccess: () => void; registroEdit?: any; }

export function MantenimientoFormModal({ isOpen, onClose, onSuccess, registroEdit }: Props) {
  const [loading, setLoading] = useState(false);
  const [maquinas, setMaquinas] = useState<{id: string, codigo: string}[]>([]);
  const [repuestosDb, setRepuestosDb] = useState<any[]>([]);
  
  // Solución del 0: Inicializamos costo_mano_obra como string vacío ('')
  const [formData, setFormData] = useState<any>({
    maquina_id: '', tipo: 'Preventivo', fecha: new Date().toISOString().split('T')[0],
    descripcion: '', costo_mano_obra: '', responsable: '',
  });

  const [repuestosUsados, setRepuestosUsados] = useState<{repuesto_id: string, nombre: string, cantidad: number, costo_unitario: number}[]>([]);
  const [repuestoSeleccionado, setRepuestoSeleccionado] = useState('');
  
  // 🔥 SOLUCIÓN DEL CERO EN CANTIDAD: Permitimos que sea un string vacío
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState<number | string>(1);

  useEffect(() => {
    if (isOpen) {
      supabase.from('maquinas').select('id, codigo').then(({ data }) => {
        if (data) {
          setMaquinas(data);
          // Pre-seleccionar máquina solo si NO estamos editando
          if (data.length > 0 && !registroEdit) setFormData((prev: any) => ({ ...prev, maquina_id: data[0].id }));
        }
      });
      supabase.from('repuestos').select('*').gt('stock', 0).then(({ data }) => {
        if (data) {
          setRepuestosDb(data);
          if (data.length > 0) setRepuestoSeleccionado(data[0].id);
        }
      });

      if (registroEdit) {
        // MODO EDICIÓN: Rellenamos con los datos existentes
        setFormData({
          maquina_id: registroEdit.maquina_id,
          tipo: registroEdit.tipo,
          fecha: registroEdit.fecha,
          descripcion: registroEdit.descripcion,
          costo_mano_obra: registroEdit.costo, // En edición, el costo incluye el total
          responsable: registroEdit.responsable,
        });
        setRepuestosUsados([]);
      } else {
        // MODO CREACIÓN
        setFormData({ maquina_id: '', tipo: 'Preventivo', fecha: new Date().toISOString().split('T')[0], descripcion: '', costo_mano_obra: '', responsable: '' });
        setRepuestosUsados([]);
        setCantidadSeleccionada(1); // Resetear la cantidad al abrir nuevo
      }
    }
  }, [isOpen, registroEdit]);

  if (!isOpen) return null;

  const agregarRepuesto = () => {
    const rep = repuestosDb.find(r => r.id === repuestoSeleccionado);
    if (!rep) return;
    
    // Asegurarnos de que sea un número válido antes de agregar
    const cant = Number(cantidadSeleccionada);
    if (cant <= 0) {
      alert('Por favor, ingresa una cantidad válida mayor a 0.');
      return;
    }

    if (cant > rep.stock) {
      alert(`Solo tienes ${rep.stock} unidades de ${rep.nombre} en stock.`);
      return;
    }
    
    setRepuestosUsados([...repuestosUsados, { repuesto_id: rep.id, nombre: rep.nombre, cantidad: cant, costo_unitario: rep.precio }]);
    setCantidadSeleccionada(1); // Devolvemos el input a 1 para el siguiente repuesto
  };

  const quitarRepuesto = (index: number) => setRepuestosUsados(prev => prev.filter((_, i) => i !== index));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (registroEdit) {
      // 1. LÓGICA DE EDICIÓN (Actualizamos solo textos y costo total)
      const { error } = await supabase.from('mantenimientos').update({
        maquina_id: formData.maquina_id, tipo: formData.tipo, fecha: formData.fecha,
        descripcion: formData.descripcion, responsable: formData.responsable, 
        costo: formData.costo_mano_obra === '' ? 0 : Number(formData.costo_mano_obra)
      }).eq('id', registroEdit.id);
      
      if (error) alert('Error: ' + error.message);
      else onSuccess();
    } else {
      // 2. LÓGICA DE CREACIÓN (Calcula repuestos y descuenta stock)
      const costoRepuestos = repuestosUsados.reduce((total, r) => total + (r.cantidad * r.costo_unitario), 0);
      const manoDeObraNum = formData.costo_mano_obra === '' ? 0 : Number(formData.costo_mano_obra);
      const costoTotalMantenimiento = manoDeObraNum + costoRepuestos;

      const { data: mantData, error: mantError } = await supabase.from('mantenimientos').insert([{ 
        maquina_id: formData.maquina_id, tipo: formData.tipo, fecha: formData.fecha,
        descripcion: formData.descripcion, responsable: formData.responsable, costo: costoTotalMantenimiento 
      }]).select().single();

      if (mantError) { alert('Error: ' + mantError.message); setLoading(false); return; }

      if (repuestosUsados.length > 0 && mantData) {
        const detalles = repuestosUsados.map(r => ({
          mantenimiento_id: mantData.id, repuesto_id: r.repuesto_id, cantidad: r.cantidad, costo_unitario: r.costo_unitario
        }));
        await supabase.from('mantenimiento_detalles').insert(detalles);

        for (const r of repuestosUsados) {
          const repOriginal = repuestosDb.find(db => db.id === r.repuesto_id);
          if (repOriginal) {
            await supabase.from('repuestos').update({ stock: repOriginal.stock - r.cantidad }).eq('id', r.repuesto_id);
          }
        }
      }
      onSuccess();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-(--bg-card) border-2 border-black w-full max-w-2xl rounded-none shadow-none flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-6 border-b border-(--border-color) shrink-0">
          <h2 className="text-xl font-bold text-(--text-main)">
            {registroEdit ? 'Editar Mantenimiento' : 'Registrar Mantenimiento'}
          </h2>
          <button onClick={onClose} className="text-(--text-muted) hover:text-red-500">✖</button>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6 text-(--text-main)">
            <div className="space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-widest text-neutral-500 border-b pb-2">1. Datos del Trabajo</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Máquina</label>
                  <select className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                    value={formData.maquina_id} onChange={e => setFormData({...formData, maquina_id: e.target.value})}>
                    {maquinas.map(m => <option key={m.id} value={m.id}>{m.codigo}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Tipo</label>
                  <select className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                    value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                    <option value="Preventivo">Preventivo</option>
                    <option value="Correctivo">Correctivo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Fecha</label>
                  <input required type="date" className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                    value={formData.fecha} onChange={e => setFormData({...formData, fecha: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1 uppercase tracking-wider">
                    {registroEdit ? 'Costo Total ($)' : 'Mano de Obra ($)'}
                  </label>
                  <input required type="number" step="0.01" className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                    value={formData.costo_mano_obra} 
                    onChange={e => setFormData({...formData, costo_mano_obra: e.target.value === '' ? '' : Number(e.target.value)})} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Mecánico Responsable</label>
                  <input required type="text" className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                    value={formData.responsable} onChange={e => setFormData({...formData, responsable: e.target.value})} />
                </div>
                <div className="col-span-1">
                  <label className="block text-xs font-bold mb-1 uppercase tracking-wider">Descripción Breve</label>
                  <input required type="text" className="w-full px-4 py-2 border border-neutral-300 rounded-none bg-(--bg-app)"
                    value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} />
                </div>
              </div>
            </div>

            {!registroEdit && (
              <div className="space-y-4 bg-neutral-50 dark:bg-neutral-900 p-4 border border-neutral-200">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-neutral-500 border-b pb-2">2. Repuestos Utilizados (Opcional)</h3>
                
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Seleccionar Pieza</label>
                    <select className="w-full px-3 py-2 border rounded-none bg-white text-black"
                      value={repuestoSeleccionado} onChange={e => setRepuestoSeleccionado(e.target.value)}>
                      {repuestosDb.map(r => <option key={r.id} value={r.id}>{r.nombre} (Stock: {r.stock} | ${r.precio})</option>)}
                    </select>
                  </div>
                  <div className="w-24">
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-1">Cant.</label>
                    {/* 🔥 AQUÍ ESTÁ EL ARREGLO DE CANTIDAD 🔥 */}
                    <input type="number" min="1" className="w-full px-3 py-2 border rounded-none bg-white text-black text-center"
                      value={cantidadSeleccionada} 
                      onChange={e => setCantidadSeleccionada(e.target.value === '' ? '' : Number(e.target.value))} />
                  </div>
                  <button type="button" onClick={agregarRepuesto} className="bg-blue-600 text-white font-bold px-4 py-2 rounded-none text-sm hover:bg-blue-700 uppercase tracking-widest">
                    +
                  </button>
                </div>

                {repuestosUsados.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {repuestosUsados.map((rep, idx) => (
                      <li key={idx} className="flex justify-between items-center bg-white p-2 border border-neutral-300 text-sm text-black font-medium">
                        <span><b className="text-blue-600 mr-2">{rep.cantidad}x</b>{rep.nombre}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-mono font-bold text-neutral-500">${(rep.cantidad * rep.costo_unitario).toFixed(2)}</span>
                          <button type="button" onClick={() => quitarRepuesto(idx)} className="text-red-500 hover:text-red-700 font-bold px-2">✖</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-4 px-4 rounded-none text-[11px] uppercase tracking-widest transition-colors active:scale-95">
              {loading ? 'Procesando...' : (registroEdit ? 'Actualizar Mantenimiento' : 'Guardar Mantenimiento')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}