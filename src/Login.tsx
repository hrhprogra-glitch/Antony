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
      <div className="w-full max-w-md bg-(--bg-card) border border-(--border-color) rounded-2xl shadow-xl p-8 transition-colors duration-300">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-(--brand-primary) text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl shadow-lg">
            🚜
          </div>
          <h1 className="text-3xl font-extrabold text-(--text-main) tracking-tight mb-2">
            HeavyTrack
          </h1>
          <p className="text-(--text-muted)">Inicia sesión para acceder al sistema</p>
        </div>

        {/* Alerta de Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-(--text-main) mb-2">
              Correo Electrónico
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-(--border-color) bg-(--bg-app) text-(--text-main) focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="admin@heavytrack.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-(--text-main) mb-2">
              Contraseña
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-(--border-color) bg-(--bg-app) text-(--text-main) focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors disabled:opacity-70 mt-4"
          >
            {loading ? 'Verificando credenciales...' : 'Ingresar al Sistema'}
          </button>
        </form>
        
      </div>
    </div>
  );
}