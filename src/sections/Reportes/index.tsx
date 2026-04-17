import { ReportesHeader } from './components/ReportesHeader';
import { KpiCards } from './components/KpiCards';
import { RentabilidadTable } from './components/RentabilidadTable';

export default function ReportesSection() {
  // TODO: En el futuro, estos datos vendrán de hacer cruces en tu base de datos (Supabase/PostgreSQL)
  // sumando la tabla Trabajos vs la tabla Gastos/Mantenimientos.
  const kpis = {
    ingresos: 12500.00,
    gastos: 4350.50,
    maquinasActivas: 5,
    alertasStock: 2
  };

  const rendimientoMaquinas = [
    { codigo: 'EXC-001', ingresos: 8500.00, gastos: 1200.00 },
    { codigo: 'CAR-002', ingresos: 4000.00, gastos: 2800.50 },
    { codigo: 'VOL-003', ingresos: 0.00, gastos: 350.00 }, // Máquina inactiva pero generando gastos
  ];

  return (
    <div className="space-y-2">
      <ReportesHeader />
      <KpiCards {...kpis} />
      <RentabilidadTable datos={rendimientoMaquinas} />
    </div>
  );
}