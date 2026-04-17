import { createClient } from '@supabase/supabase-js';

// Usamos el import.meta.env porque estamos en Vite.
// IMPORTANTE: Asegúrate de tener un archivo .env en la raíz de tu proyecto con estas dos variables.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase. Revisa tu archivo .env');
}

// Exportamos la instancia única del cliente para usarla en toda la app
export const supabase = createClient(supabaseUrl, supabaseAnonKey);