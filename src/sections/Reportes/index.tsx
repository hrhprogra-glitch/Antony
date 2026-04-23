import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import { ReportesHeader } from './components/ReportesHeader';
import { KpiCards } from './components/KpiCards';
import { RentabilidadTable } from './components/RentabilidadTable';
import type { KpiMetrics, RendimientoMaquina, RepuestoTop } from './types';

export default function ReportesSection() {
  const [kpis, setKpis] = useState<KpiMetrics>({
    ingresos: 0, gastos: 0, maquinasActivas: 0, alertasStock: 0, totalGalones: 0
  });
  const [rendimientoMaquinas, setRendimientoMaquinas] = useState<RendimientoMaquina[]>([]);
  const [topRepuestos, setTopRepuestos] = useState<RepuestoTop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReportes() {
      setLoading(true);
      
      // 1. Obtener datos crudos
      const { data: trabajos } = await supabase.from('trabajos').select('maquinas(codigo), ingreso_generado');
      const { data: mantenimientos } = await supabase.from('mantenimientos').select('maquinas(codigo), costo');
      const { data: combustibles } = await supabase.from('combustibles').select('maquinas(codigo), costo_total, galones');
      const { data: repuestos } = await supabase.from('repuestos').select('stock, stock_minimo');
      const { data: detallesRepuestos } = await supabase.from('mantenimiento_detalles').select('cantidad, repuestos(nombre)');
      const { count: maquinasActivas } = await supabase.from('maquinas').select('*', { count: 'exact', head: true }).eq('estado', 'operativa');

      // 2. Procesar KPIs globales
      const totalIngresos = trabajos?.reduce((acc, curr) => acc + (curr.ingreso_generado || 0), 0) || 0;
      const totalMantenimiento = mantenimientos?.reduce((acc, curr) => acc + (curr.costo || 0), 0) || 0;
      const totalCombustible = combustibles?.reduce((acc, curr) => acc + (curr.costo_total || 0), 0) || 0;
      const totalGastos = totalMantenimiento + totalCombustible;
      const totalGalones = combustibles?.reduce((acc, curr) => acc + (curr.galones || 0), 0) || 0;
      const alertas = repuestos?.filter(r => r.stock <= r.stock_minimo).length || 0;

      setKpis({ ingresos: totalIngresos, gastos: totalGastos, maquinasActivas: maquinasActivas || 0, alertasStock: alertas, totalGalones });

      // 3. Ranking de Repuestos más usados (Algoritmo de agrupación)
      const repuestosCount: Record<string, number> = {};
      detallesRepuestos?.forEach(d => {
        const nombre = (d.repuestos as any)?.nombre || 'Desconocido';
        repuestosCount[nombre] = (repuestosCount[nombre] || 0) + (d.cantidad || 0);
      });
      
      const ranking = Object.entries(repuestosCount)
        .map(([nombre, cantidad]) => ({ nombre, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad)
        .slice(0, 5); // Top 5
      setTopRepuestos(ranking);

      // 4. Procesar Rentabilidad por Máquina
      const maquinaStats: Record<string, RendimientoMaquina> = {};
      const getCodigo = (maquinaRef: any) => {
        if (!maquinaRef) return null;
        return Array.isArray(maquinaRef) ? maquinaRef[0]?.codigo : maquinaRef.codigo;
      };

      trabajos?.forEach(t => {
        const cod = getCodigo(t.maquinas);
        if (!cod) return;
        if (!maquinaStats[cod]) maquinaStats[cod] = { codigo: cod, ingresos: 0, gastos: 0 };
        maquinaStats[cod].ingresos += (t.ingreso_generado || 0);
      });

      mantenimientos?.forEach(m => {
        const cod = getCodigo(m.maquinas);
        if (!cod) return;
        if (!maquinaStats[cod]) maquinaStats[cod] = { codigo: cod, ingresos: 0, gastos: 0 };
        maquinaStats[cod].gastos += (m.costo || 0);
      });

      combustibles?.forEach(c => {
        const cod = getCodigo(c.maquinas);
        if (!cod) return;
        if (!maquinaStats[cod]) maquinaStats[cod] = { codigo: cod, ingresos: 0, gastos: 0 };
        maquinaStats[cod].gastos += (c.costo_total || 0);
      });

      // Ordenar por rentabilidad (Los más rentables primero)
      const statsArray = Object.values(maquinaStats).sort((a, b) => (b.ingresos - b.gastos) - (a.ingresos - a.gastos));
      setRendimientoMaquinas(statsArray);
      setLoading(false);
    }

    fetchReportes();
  }, []);

  if (loading) return <div className="p-8 font-bold text-center">Calculando métricas en tiempo real...</div>;

  return (
    <div className="space-y-6">
      <ReportesHeader />
      <KpiCards {...kpis} />
      
      {/* Layout a dos columnas para mostrar las tablas exigidas por el cliente */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tabla principal (Ocupa 2/3) */}
        <div className="lg:col-span-2">
          <RentabilidadTable datos={rendimientoMaquinas} />
        </div>

        {/* Nueva tabla de Repuestos (Ocupa 1/3) */}
        <div className="lg:col-span-1 bg-(--bg-card) border-2 border-black rounded-none shadow-none h-fit">
          <div className="p-6 border-b-2 border-black bg-neutral-100 dark:bg-neutral-900">
            <h3 className="font-extrabold text-[13px] text-(--text-main) uppercase tracking-widest">Top 5 Repuestos Usados</h3>
          </div>
          <div className="p-4">
            {topRepuestos.length === 0 ? (
              <p className="text-sm text-neutral-500 font-bold italic text-center py-4">No hay consumo registrado.</p>
            ) : (
              <ul className="space-y-3">
                {topRepuestos.map((rep, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b border-neutral-200 pb-2 last:border-0">
                    <span className="text-sm font-bold text-(--text-main) truncate pr-4">{rep.nombre}</span>
                    <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                      {rep.cantidad} und
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}