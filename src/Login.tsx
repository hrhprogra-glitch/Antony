import { useState } from 'react';
import { supabase } from './db/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Llamada oficial a Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('Correo o contraseña incorrectos.');
    }
    setLoading(false);
  };

  return (
    <div className="flex h-screen w-full bg-(--bg-app) items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-(--bg-card) border-2 border-black rounded-none shadow-none p-8 transition-colors duration-300">
        
        <div className="text-center mb-8">
          {/* Logo Cuadrado y Plano */}
          <div className="w-16 h-16 bg-black text-white border-2 border-black rounded-none flex items-center justify-center mx-auto mb-4 text-3xl shadow-none">
            🚜
          </div>
          <h1 className="text-3xl font-black text-(--text-main) tracking-tighter mb-2 uppercase">
            HeavyTrack
          </h1>
          <p className="text-[11px] text-neutral-500 font-bold uppercase tracking-widest">
            Inicia sesión para acceder al sistema
          </p>
        </div>

        {/* Alerta de Error con estilo técnico */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-2 border-red-600 text-red-700 rounded-none text-[11px] font-bold uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-(--text-main) uppercase tracking-widest mb-2">
              Correo Electrónico
            </label>
            {/* Inputs planos y limpios */}
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-none border-2 border-black bg-(--bg-app) text-(--text-main) focus:bg-white outline-none transition-colors"
              placeholder="admin@heavytrack.com"
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-(--text-main) uppercase tracking-widest mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-none border-2 border-black bg-(--bg-app) text-(--text-main) focus:bg-white outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>
          
          {/* Botón de acción principal */}
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 px-4 bg-black hover:bg-neutral-800 text-white font-bold rounded-none border-2 border-black text-[11px] uppercase tracking-widest transition-colors disabled:opacity-70 active:scale-95 mt-6"
          >
            {loading ? 'Verificando...' : 'Ingresar al Sistema'}
          </button>
        </form>
        
      </div>
    </div>
  );
} 