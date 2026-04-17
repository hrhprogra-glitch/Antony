// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './layout/Sidebar';
import { Topbar } from './layout/Topbar';
import MaquinariaSection from './sections/Maquinaria';
import RepuestosSection from './sections/Repuestos';
import MantenimientoSection from './sections/Mantenimiento';
import CombustibleSection from './sections/Combustible';
import TrabajosSection from './sections/Trabajos';
import FinanzasSection from './sections/Finanzas';
import ReportesSection from './sections/Reportes';
import ConfiguracionSection from './sections/Configuracion';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-full bg-(--bg-app) text-(--text-main) font-sans overflow-hidden transition-colors duration-300">
        
        {/* 1. Menú lateral */}
        <Sidebar />
        
        {/* 2. Contenedor principal */}
        <div className="flex flex-col flex-1 w-full h-full relative">
          
          {/* 3. Barra superior */}
          <Topbar />
          
          {/* 4. Área de renderizado dinámico (Aquí ocurre la magia) */}
          <main className="flex-1 p-6 overflow-y-auto w-full">
            <Routes>
              {/* Ruta por defecto redirige a maquinaria */}
              <Route path="/" element={<Navigate to="/maquinaria" replace />} />

              {/* Módulos completados */}
              <Route path="/maquinaria" element={<MaquinariaSection />} />
              <Route path="/repuestos" element={<RepuestosSection />} />

              {/* Módulos en construcción */}
              <Route path="/mantenimiento" element={<MantenimientoSection />} />
              <Route path="/mantenimiento" element={<CombustibleSection />} />
              <Route path="/trabajos" element={<TrabajosSection />} />
              <Route path="/finanzas" element={<FinanzasSection />} />
              <Route path="/reportes" element={<ReportesSection />} />
              <Route path="/configuracion" element={<ConfiguracionSection />} />
            </Routes>
          </main>
          
        </div>
      </div>
    </BrowserRouter>
  );
}