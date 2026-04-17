import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './db/supabase';
import type { Session } from '@supabase/supabase-js';

// Importamos el nuevo Login
import Login from './Login';

// Layouts y Secciones
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
  const [session, setSession] = useState<Session | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // 1. Al cargar la app, verificamos si ya hay una sesión guardada en el navegador
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsInitializing(false);
    });

    // 2. Nos suscribimos a cualquier cambio (login o logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Pantalla de carga mientras Supabase verifica el token
  if (isInitializing) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-(--bg-app) text-(--text-main)">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // 🛑 GUARDIA DE SEGURIDAD: Si no hay sesión activa, expulsar al Login
  if (!session) {
    return <Login />;
  }

  // ✅ ACCESO CONCEDIDO: Mostrar el sistema
  return (
    <BrowserRouter>
      <div className="flex h-screen w-full bg-(--bg-app) text-(--text-main) font-sans overflow-hidden transition-colors duration-300">
        <Sidebar />
        <div className="flex flex-col flex-1 w-full h-full relative">
          <Topbar />
          <main className="flex-1 p-6 overflow-y-auto w-full">
            <Routes>
              <Route path="/" element={<Navigate to="/maquinaria" replace />} />
              <Route path="/maquinaria" element={<MaquinariaSection />} />
              <Route path="/repuestos" element={<RepuestosSection />} />
              <Route path="/mantenimiento" element={<MantenimientoSection />} />
              <Route path="/combustible" element={<CombustibleSection />} />
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