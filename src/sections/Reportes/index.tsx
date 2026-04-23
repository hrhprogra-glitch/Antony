import { useEffect, useState } from 'react';
import { supabase } from '../../db/supabase';
import { ReportesHeader } from './components/ReportesHeader';
import { KpiCards } from './components/KpiCards';
import { RentabilidadTable } from './components/RentabilidadTable';
import type { KpiMetrics, RendimientoMaquina } from './types';

export default function ReportesSection() {
  const [kpis, setKpis] = useState<KpiMetrics>({
    ingresos: 0, gastos: 0, maquinasActivas: 0, alertasStock: 0
  });
  const [rendimientoMaquinas, setRendimientoMaquinas] = useState<RendimientoMaquina[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReportes() {
      setLoading(true);
      
      // 1. Obtener datos crudos de Supabase
      const { data: trabajos } = await supabase.from('trabajos').select('maquinas(codigo), ingreso_generado');
      const { data: mantenimientos } = await supabase.from('mantenimientos').select('maquinas(codigo), costo');
      const { data: combustibles } = await supabase.from('combustibles').select('maquinas(codigo), costo_total');
      const { data: repuestos } = await supabase.from('repuestos').select('stock, stock_minimo');
      const { count: maquinasActivas } = await supabase.from('maquinas').select('*', { count: 'exact', head: true }).eq('estado', 'operativa');

      // 2. Procesar KPIs globales
      const totalIngresos = trabajos?.reduce((acc, curr) => acc + (curr.ingreso_generado || 0), 0) || 0;
      const totalMantenimiento = mantenimientos?.reduce((acc, curr) => acc + (curr.costo || 0), 0) || 0;
      const totalCombustible = combustibles?.reduce((acc, curr) => acc + (curr.costo_total || 0), 0) || 0;
      const totalGastos = totalMantenimiento + totalCombustible;
      
      const alertas = repuestos?.filter(r => r.stock <= r.stock_minimo).length || 0;

      setKpis({
        ingresos: totalIngresos,
        gastos: totalGastos,
        maquinasActivas: maquinasActivas || 0,
        alertasStock: alertas
      });

      // 3. Procesar Rentabilidad por Máquina
      const maquinaStats: Record<string, RendimientoMaquina> = {};

      // Función auxiliar para esquivar el error de TypeScript y extraer el código seguro
      const getCodigo = (maquinaRef: any) => {
        if (!maquinaRef) return null;
        // Si TypeScript/Supabase lo manda como Array, tomamos el primero. Si es objeto, lo leemos directo.
        return Array.isArray(maquinaRef) ? maquinaRef[0]?.codigo : maquinaRef.codigo;
      };

      // Sumar ingresos por máquina
      trabajos?.forEach(t => {
        const cod = getCodigo(t.maquinas);
        if (!cod) return;
        if (!maquinaStats[cod]) maquinaStats[cod] = { codigo: cod, ingresos: 0, gastos: 0 };
        maquinaStats[cod].ingresos += (t.ingreso_generado || 0);
      });

      // Sumar gastos por máquina (Mantenimiento)
      mantenimientos?.forEach(m => {
        const cod = getCodigo(m.maquinas);
        if (!cod) return;
        if (!maquinaStats[cod]) maquinaStats[cod] = { codigo: cod, ingresos: 0, gastos: 0 };
        maquinaStats[cod].gastos += (m.costo || 0);
      });

      // Sumar gastos por máquina (Combustible)
      combustibles?.forEach(c => {
        const cod = getCodigo(c.maquinas);
        if (!cod) return;
        if (!maquinaStats[cod]) maquinaStats[cod] = { codigo: cod, ingresos: 0, gastos: 0 };
        maquinaStats[cod].gastos += (c.costo_total || 0);
      });

      setRendimientoMaquinas(Object.values(maquinaStats));
      setLoading(false);
    }

    fetchReportes();
  }, []);

  if (loading) {
    return <div className="p-8 font-bold text-center">Calculando métricas...</div>;
  }

  return (
    <div className="space-y-2">
      <ReportesHeader />
      <KpiCards {...kpis} />
      <RentabilidadTable datos={rendimientoMaquinas} />
    </div>
  );
}